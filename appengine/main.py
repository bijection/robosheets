import os
import time
import webapp2
import base64
from google.appengine.ext import vendor
vendor.add('lib')

import jwt
import stripe
from Crypto.Protocol.KDF import PBKDF2
stripe.api_key = "sk_test_WC3PTBnTi6hoFUJGiySjCcKg"
# Live Secret Key: sk_live_OVLc65HvNWnGohkQwqNnXNCa
import time

from google.appengine.api import mail
from google.appengine.ext import ndb

import json

salt = "I am Kanye, king of kings look on my works yeezy mighty and dispair"


class Account(ndb.Model):
    email = ndb.StringProperty(indexed=True)
    customerId = ndb.StringProperty(indexed=False)
    password = ndb.StringProperty(indexed=False)
    date = ndb.DateTimeProperty(auto_now_add=True)
    subId = ndb.StringProperty(indexed=False)
    
    reset_token = ndb.StringProperty(indexed=True)
    reset_expire = ndb.DateTimeProperty(auto_now_add=False)

    @classmethod
    def lookup(cls, email):
        return cls.query(cls.email == email).get()

    @classmethod
    def lookup_reset(cls, reset):
        return cls.query(cls.reset_token == reset).get()

    @classmethod
    def jwt(cls, token):
        try:
            payload = jwt.decode(token, salt, algorithms=['HS256'])
        except: 
            return None
        email = payload['email']
        return cls.lookup(email)

class Endpoint(webapp2.RequestHandler):
    def dispatch(self):
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        super(Endpoint, self).dispatch()

    def succeed(self, message):
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps({
            'success': True,
            'message': message
        }))

    def fail(self, message):
        self.response.headers['Content-Type'] = 'application/json'
        # self.response.set_status(400)  
        self.response.write(json.dumps({
            'success': False,
            'message': message
        }))


class HomeHandler(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'

        self.response.write('hi wayne')

from datetime import timedelta, datetime


import string
import random



def randstr():
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(14))

# - POST /signup
#    creates an accountid and sends a link to setup the account to the email (edited)
#    params
#        email
#        token
#        plan
class SignupHandler(Endpoint):
    def post(self):
        email = self.request.get('email')
        token = self.request.get('token')
        plan = self.request.get('plan')
        host = self.request.get('host')

        user = Account.lookup(email)

        # Overwrite users with same email. Should not be released like this.
        # if user is not None:
        #     self.fail('email is already in use')
        #     return
        if user is None:
            user = Account(email = email)


        customer = stripe.Customer.create(email=email, source=token)
        subscription = stripe.Subscription.create(
            customer=customer.id,
            plan=plan,
        )

        user.customerId = customer.id
        user.subId = subscription.id
        user.reset_token = randstr()
        user.reset_expire = datetime.now() + timedelta(days=365)

        user.put()

        mail.send_mail(sender="noreply@robosheets.appspotmail.com",
                   to=email,
                   subject="You signed up or something",
                   body="""Whup dawg:

You signed up for {plan}. 

Continue your setup thingy here

This is just some sample form stuff for debugging.

{host}/?action=setup&token={reset}&email={email}

""".format(plan=plan, reset=user.reset_token, email=email, host=host))

        self.succeed('check yo email')

    def get(self):
        self.response.write("""
            <form method="POST">
                <label>Email: <input name="email" type="email"></label>
                <label>Stripe Token: <input name="token" type="text"></label>
                <label>Plan: <select name="plan">
                    <option value="eliza">eliza</option>
                    <option value="tamagotchi">tamagotchi</option>
                    <option value="cleverbot">cleverbot</option>
                </select></label>
                <input type="submit">
            </form>
        """)



# - POST /setup
#    sets password if none has been specified
#    params
#        reset
#        password
class PasswordSetupHandler(Endpoint):
    def post(self):

        reset = self.request.get('reset')
        if len(reset) < 2:
            self.fail('reset token is required')
            return

        user = Account.lookup_reset(reset)
        if user is None:
            self.fail('invalid reset token')
            return

        if user.reset_expire < datetime.now():
            self.fail('password reset token has already expired')
            return

        password = self.request.get('password').strip()
        if len(password) < 3:
            self.fail('password must be at least 3 letters')
            return

        key = base64.b64encode(PBKDF2(password, salt, dkLen=32, count=5000))

        user.reset_expire = datetime.now()
        user.password = key
        user.put()

        payload = {
            'email': user.email
        }
        token = jwt.encode(payload, salt, algorithm='HS256')
        self.succeed(token)

    def get(self):
        self.response.write("""
            <form method="POST">
                <input name="reset" type="hidden" value="{token}">
                <label>New Password: <input name="password" type="password"></label>
                <input type="submit">
            </form>
        """.format(token = self.request.get('token')))

# - POST /login
#    replies with a jwt containing email
#    params
#        email
#        pass
class LoginHandler(Endpoint):
    def post(self):
        email = self.request.get('email')
        user = Account.lookup(email)
        if user is None:
            self.fail('could not find user account')
            return
        password = self.request.get('password')

        key = base64.b64encode(PBKDF2(password, salt, dkLen=32, count=5000))

        if user.password != key:
            self.fail('wrong password')
            return

        payload = {
            'email': user.email
        }
        token = jwt.encode(payload, salt, algorithm='HS256')
        self.succeed(token)
    
    def get(self):
        self.response.write("""
            <form method="POST">
                <label>Email: <input name="email" type="email"></label>
                <label>Password: <input name="password" type="password"></label>
                <input type="submit">
            </form>
        """)

# - POST /subscription
#    params
#        jwt
#        plan

# - GET /subscription
#    responds with a permission level
#    params
#        jwt
class SubscriptionHandler(Endpoint):
    def get(self):
        user = Account.jwt(self.request.get('jwt'))
        if user is None:
            self.fail('user not found: ' + str(user) + ' ' + self.request.get('jwt'))
            return

        subscription = stripe.Subscription.retrieve(user.subId)
        self.succeed(subscription.plan.id)
            

    def post(self):
        plan = self.request.get('plan')
        user = Account.jwt(self.request.get('jwt'))
        if user is None:
            self.fail('user not found')
            return

        subscription = stripe.Subscription.retrieve(user.subId)
        subscription.plan = plan
        subscription.save()
        
        self.succeed('updated subscription')



class PasswordResetHandler(Endpoint):
    def get(self):
        email = self.request.get('email')
        user = Account.lookup(email)
        if user is None:
            self.fail('no account exists with this email')
            return
        
        user.reset = randstr()
        user.reset_expire = datetime.now() + timedelta(hours=24)
        user.put()

        mail.send_mail(sender="noreply@robosheets.appspotmail.com",
                   to=email,
                   subject="Reset Robosheets Rassword",
                   body="""
Here's your password reset token or something {reset}

""".format(reset=user.reset))
        self.succeed('chek yo inbox')


app = webapp2.WSGIApplication([
    ('/', HomeHandler),
    
    ('/auth/signup', SignupHandler),
    ('/auth/setup', PasswordSetupHandler),
    ('/auth/reset_password', PasswordResetHandler),
    ('/auth/login', LoginHandler),

    # ('/user/update_password', PasswordUpdateHandler),
    ('/user/subscription', SubscriptionHandler),
], debug=True)


