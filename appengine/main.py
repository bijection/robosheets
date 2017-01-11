import os
import time
import webapp2
from google.appengine.ext import vendor
vendor.add('lib')

import stripe

class RequestIdHandler(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write('hi wayne')


app = webapp2.WSGIApplication([
	('/', RequestIdHandler)
], debug=True)