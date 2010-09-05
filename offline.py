"""UI wrapper for js1kpiano
   Copyright Menboku Ltd 2010
   www.menboku.co.uk
   Licenced under GPL v2"""

import logging, os

from google.appengine.ext import webapp
from google.appengine.api import datastore
from google.appengine.api.labs import taskqueue


# from google.appengine.ext.webapp.util import run_wsgi_app
import wsgiref.handlers

from models import *

import content

TASK_URL = "/offline/logVisitor"

def enqueue_log_task(rh, pagename=None):
  try:
    my_task = taskqueue.Task(url = TASK_URL,
                             params={
        "ip": rh.request.remote_addr,
        "useragent": content.get_user_agent(rh),
        "referrer": content.get_referrer(rh),
        "page": pagename
        })
    my_task.add(queue_name="default")
    logging.debug("Queued request log OK")
    return True
  except Exception, e:
    logging.error("Failed to queue log task [%s/%s]" %
                  (type(e), e))
    return False

class LogVisitor(webapp.RequestHandler):
  def get(self):
    logging.error("LogVisitor.GET called - THIS SHOULD NEVER HAPPEN")
    self.error(400)
  def post(self):
    ip = self.request.get("ip")
    ua = self.request.get("useragent")
    ref = self.request.get("referrer")
    page = self.request.get("page")
    browser = content.BrowserDetails(ua)
    v=Visitor(ip = ip,
              user_agent = ua,
              browser_name = browser.browser_name,
              browser_engine = browser.browser_engine,
              os_name = browser.os_name,
              page = page,
              referrer = ref)
    try:
      v.put()
    except Exception, e:
      logging.error("Failed to put entity into datastore [%s/%s]" %
                    (type(e), e))
      self.error(500)


def main():
  logging.getLogger().setLevel(logging.DEBUG)
  application=webapp.WSGIApplication(
    [
      (TASK_URL, LogVisitor),
      ],
    debug=True)
  # run_wsgi_app(application)
  wsgiref.handlers.CGIHandler().run(application)

if __name__ == '__main__':
  main()

