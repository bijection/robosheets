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
        password = 'uSh{ei3aiV'
        key = PBKDF2(password, salt, dkLen=32, count=5000)
        self.response.write(base64.b64encode(key))


class EmailHandler(webapp2.RequestHandler):
	def get(self):
	   mail.send_mail(sender="noreply@robosheets.appspotmail.com",
                   to="Wayne Price <admin@robosheets.com>",
                   subject="Your account has been approved",
                   body="""Dear Wayne:

Your example.com account has been approved.  You can now visit
http://www.example.com/ and sign in using your Google Account to
access new features.

Please let us know if you have any questions.

The example.com Team
""")
	   self.response.write('chek yo inbox')


class Account(ndb.Model):
    email = ndb.StringProperty(indexed=True)
    customerId = ndb.StringProperty(indexed=False)
    password = ndb.StringProperty(indexed=False)
    date = ndb.DateTimeProperty(auto_now_add=True)


# - POST /signup
#    creates an accountid and sends a link to setup the account to the email (edited)
#    params
#        email
#        token
class SignupHandler(webapp2.RequestHandler):
	def post(self):
		email = self.request.get('email')
		token = self.request.get('token')
		self.response.write('signup')

		customer = stripe.Customer.create(email=email, source=token)
		account = Account(email = email, customerId = customer.id)
		account.put()

		mail.send_mail(sender="noreply@robosheets.appspotmail.com",
                   to=email,
                   subject="You signed up or something",
                   body="""Whup dawg:

        

""")



# - POST /setup
#    sets password if none has been specified
#    params
#        accountid
#        password
class SetupHandler(webapp2.RequestHandler):
	def post(self):
		account = self.request.get('account')
		password = self.request.get('password')
		self.response.write('setup')


# - POST /login
#    replies with a jwt containing email
#    params
#        email
#        pass
class LoginHandler(webapp2.RequestHandler):
	def post(self):
		email = self.request.get('email')
		password = self.request.get('password')
		self.response.write('login')

# - POST /subscription
#    responds with a permission level
#    params
#        jwt
class SubscriptionHandler(webapp2.RequestHandler):
	def post(self):
		jwt = self.request.get('jwt')
		self.response.write('subscription')

# - POST /upgrade
#    params
#        jwt
#        new permission level

class UpgradeHandler(webapp2.RequestHandler):
	def post(self):
		jwt = self.request.get('jwt')
		level = self.request.get('level')
		self.response.write('upgrade')

# - POST /unsubscribe
#    params
#        jwt
class UnsubscribeHandler(webapp2.RequestHandler):
	def post(self):
		jwt = self.request.get('jwt')
		self.response.write('unsubscribe')


app = webapp2.WSGIApplication([
	('/', HomeHandler),
	('/email', EmailHandler),
	('/signup', SignupHandler),
	('/setup', SetupHandler),
	('/login', LoginHandler),
	('/subscription', SubscriptionHandler),
	('/upgrade', UpgradeHandler),
	('/unsubscribe', UnsubscribeHandler)
], debug=True)



