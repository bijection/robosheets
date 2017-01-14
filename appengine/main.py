import os
import time
import webapp2
from google.appengine.ext import vendor
vendor.add('lib')

import stripe
stripe.api_key = "sk_test_WC3PTBnTi6hoFUJGiySjCcKg"
# Live Secret Key: sk_live_OVLc65HvNWnGohkQwqNnXNCa

from google.appengine.api import mail



class RequestIdHandler(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write('hi wayne')


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


app = webapp2.WSGIApplication([
	('/', RequestIdHandler),
	('/email', EmailHandler)
], debug=True)