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


# encoded = jwt.encode({'some': 'payload'}, 'secret', algorithm='HS256')
# 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lIjoicGF5bG9hZCJ9.4twFt5NiznN84AWoo1d7KO1T_yoc0Z6XOpOVswacPZg'

# jwt.decode(encoded, 'secret', algorithms=['HS256'])
# {'some': 'payload'}

# https://pyjwt.readthedocs.io/en/latest/



salt = "I am Kanye, king of kings look on my works yeezy mighty and dispair"


class HomeHandler(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'

        self.response.write('hi wayne')

from datetime import timedelta, datetime


import string
import random

class PasswordResetHandler(webapp2.RequestHandler):
    def get(self):
        email = self.request.get('email')
        user = Account.lookup(email)
        if user is None:
            self.response.write('no account exists with this email')
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
        self.response.write('chek yo inbox')


class Account(ndb.Model):
    email = ndb.StringProperty(indexed=True)
    customerId = ndb.StringProperty(indexed=False)
    password = ndb.StringProperty(indexed=False)
    date = ndb.DateTimeProperty(auto_now_add=True)
    plan = ndb.StringProperty(indexed=False)
    
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
        

def randstr():
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(14))

# - POST /signup
#    creates an accountid and sends a link to setup the account to the email (edited)
#    params
#        email
#        token
#        plan
class SignupHandler(webapp2.RequestHandler):
    def post(self):
        email = self.request.get('email')
        token = self.request.get('token')
        plan = self.request.get('plan')

        customer = stripe.Customer.create(email=email, source=token)
        user = Account(
            email = email, 
            customerId = customer.id, 
            plan = plan,
            reset_token = randstr(),
            reset_expire = datetime.now() + timedelta(days=365)
        )
        user.put()
        mail.send_mail(sender="noreply@robosheets.appspotmail.com",
                   to=email,
                   subject="You signed up or something",
                   body="""Whup dawg:

You signed up for {plan}. 

Continue your setup thingy here


https://robosheets.appspot.com/auth/setup?token={reset}

""".format(plan=plan, reset=user.reset_token))


        self.response.write('chek yo mail dawg')



# - POST /setup
#    sets password if none has been specified
#    params
#        reset
#        password
class PasswordSetupHandler(webapp2.RequestHandler):
    def post(self):

        reset = self.request.get('reset')
        if len(reset) < 2:
            self.response.write('reset token is required')
            return
        user = Account.lookup_reset(reset)
        if user is None:
            self.response.write('invalid reset token')
            return

        if user.reset_expire < datetime.now():
            self.response.write('password reset token has already expired')
            return

        password = self.request.get('password').strip()
        if len(password) < 3:
            self.response.write('password must be at least 3 letters')
            return

        key = base64.b64encode(PBKDF2(password, salt, dkLen=32, count=5000))

        user.reset_expire = datetime.now()
        user.password = key
        user.put()

        self.response.write('changed password')

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
class LoginHandler(webapp2.RequestHandler):
    def post(self):
        email = self.request.get('email')
        user = Account.lookup(email)
        if user is None:
            self.response.write('could not find user account')
            return
        password = self.request.get('password')

        key = base64.b64encode(PBKDF2(password, salt, dkLen=32, count=5000))

        if user.password != key:
            self.response.write('wrong password')
            return

        payload = {
            'email': user.email
        }
        token = jwt.encode(payload, salt, algorithm='HS256')
        self.response.write(token)
    
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
class SubscriptionHandler(webapp2.RequestHandler):
    def get(self):
        user = Account.jwt(self.request.get('jwt'))
        if user is None:
            self.response.write('user not found')
            return

        self.response.write(user.plan)
            

    def post(self):
        plan = self.request.get('plan')
        user = Account.jwt(self.request.get('jwt'))
        if user is None:
            self.response.write('user not found')
            return

        user.plan = plan
        user.put()
        
        self.response.write('updated subscription')




app = webapp2.WSGIApplication([
    ('/', HomeHandler),
    
    ('/auth/signup', SignupHandler),
    ('/auth/setup', PasswordSetupHandler),
    ('/auth/reset_password', PasswordResetHandler),
    ('/auth/login', LoginHandler),

    # ('/user/update_password', PasswordUpdateHandler),
    ('/user/subscription', SubscriptionHandler),
], debug=True)



