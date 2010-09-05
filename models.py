"""Datastore models for js1kpiano wrapper interface.
   Copyright Menboku Ltd 2010
   Licenced under GPL v2
"""

from google.appengine.ext import db

class Visitor(db.Model):
  date_created = db.DateTimeProperty(auto_now_add = True)
  date_modified = db.DateTimeProperty(auto_now = True)
  count = db.IntegerProperty(default = 1)
  user_agent = db.TextProperty()
  browser_name = db.StringProperty()
  browser_version = db.StringProperty()
  browser_engine = db.StringProperty()
  os_name = db.StringProperty()
  os_version = db.StringProperty()
  ip = db.StringProperty()
  referrer = db.StringProperty()
  page = db.StringProperty()


