"""Generic content library
   Copyright Menboku Ltd 2010 www.menboku.co.uk
   Licenced under GPL v2"""

import re, logging

class BrowserDetails:
  def __init__(self, user_agent_string):
    self.user_agent = user_agent_string
    if user_agent_string.find("Chrome") >= 0:
        self.browser_name = "Chrome"
        self.browser_family = "Chrome"
        self.browser_engine = "Webkit"
    elif user_agent_string.find("Chromium") >= 0:
        self.browser_name = "Chromium"
        self.browser_family = "Chrome"
        self.browser_engine = "Webkit"
    elif user_agent_string.find("Iron") >= 0:
        self.browser_name = "Iron"
        self.browser_family = "Chrome"
        self.browser_engine = "Webkit"
    elif user_agent_string.find("Camino") >=0 :
        self.browser_name = "Camino"
        self.browser_engine = "Gecko"
    elif user_agent_string.find("Firefox") >=0 :
        self.browser_name = "Firefox"
        self.browser_engine = "Gecko"
    elif user_agent_string.find("Safari") >= 0:
        self.browser_name = "Safari"
        self.browser_engine = "Webkit"
    elif user_agent_string.find("Opera") >= 0:
        self.browser_name = "Opera"
        self.browser_engine = "Presto"
    elif user_agent_string.find("Internet Explorer") >= 0:
        self.browser_name = "Chrome"
        self.browser_engine = "Webkit"
    else:
        self.browser_name = "Unknown"
        self.browser_engine = "Unknown"

    if user_agent_string.find("Linux")>=0:
        self.os_name = "Linux"
    elif user_agent_string.find("iPhone OS") >= 0:
        self.os_name = "iOS"
    elif user_agent_string.find("Mac") >= 0:
        self.os_name = "Mac OS"
    elif user_agent_string.find("Windows") >= 0:
        self.os_name = "Windows"
    else:
        self.os_name = "Unknown"

  def is_compatible(self):
    if self.browser_name in ["Firefox", "Safari", "Opera"]:
      if self.os_name == "iOS":
        return False
      else:
        return True
    else:
      return False


def get_referrer(rh):
  if "Referer" in rh.request.headers:
    ref = rh.request.headers["Referer"]
    if len(ref)>0:
      return ref
  if "Referrer" in rh.request.headers:
    ref = rh.request.headers["Referrer"]
    if len(ref)>0:
      return ref
  return "[No referrer specified]"

def get_user_agent(rh):
  if "User-Agent" in rh.request.headers:
    ua=rh.request.headers['User-Agent']
    if len(ua)>0:
      return ua
    else:
      return "[Empty User-Agent]"
  else:
    return "[No browser User-Agent passed]"

def dict_for_django_template(rh):
  ua = get_user_agent(rh)
  browser = BrowserDetails(ua)
  logging.debug("%s / %s / %s <= %s" %
                (browser.browser_name, browser.browser_engine,
                 browser.os_name,
                 ua))
                 
  return {
    "browser": browser,
    "isCompatible": browser.is_compatible(),
    "userAgent": ua,
    "foo":"bar"
    }

