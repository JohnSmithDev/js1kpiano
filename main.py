"""UI wrapper for js1kpiano
   Copyright Menboku Ltd 2010
   www.menboku.co.uk
   Licenced under GPL v2"""

import logging, os

from google.appengine.ext import webapp
from google.appengine.api import datastore
from google.appengine.ext.webapp import template


# from google.appengine.ext.webapp.util import run_wsgi_app
import wsgiref.handlers

from models import *

import content
import offline

class MainPage(webapp.RequestHandler):
  def get(self):
    template_file=os.path.join("templates", "index.html")
    self.response.out.write(template.render(template_file,
                           content.dict_for_django_template(self)))
    offline.enqueue_log_task(self, "main")
    

class InfoPage(webapp.RequestHandler):
  def get(self):
    template_file=os.path.join("templates", "more_info.html")
    self.response.out.write(template.render(template_file,
                           content.dict_for_django_template(self)))
    offline.enqueue_log_task(self, "info")

class PianoPage(webapp.RequestHandler):
  def get(self):
    template_file=os.path.join("templates", "piano.html")
    self.response.out.write(template.render(template_file,
                             content.dict_for_django_template(self)))
    offline.enqueue_log_task(self, "piano")


def main():
  logging.getLogger().setLevel(logging.DEBUG)
  application=webapp.WSGIApplication(
      [('/piano.*', PianoPage),
      ('/more_info', InfoPage),
      ('.*', MainPage)],
      debug=True)
  # run_wsgi_app(application)
  wsgiref.handlers.CGIHandler().run(application)

if __name__ == '__main__':
  main()

