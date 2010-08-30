"""Generic content library
   Copyright Menboku Ltd 2010 www.menboku.co.uk
   Licenced under GPL v2"""

import re

class BrowserDetails:
  def __init__(self, user_agent_string):
    self.user_agent = user_agent_string
    if user_agent_string.find("Firefox") >=0 :
        self.browser_name = "Firefox"
        self.browser_engine = "Gecko"
    elif user_agent_string.find("Safari") >= 0:
        self.browser_name = "Safari"
        self.browser_engine = "Webkit"
    elif user_agent_string.find("Chrome") >= 0:
        self.browser_name = "Chrome"
        self.browser_engine = "Webkit"
    elif user_agent_string.find("Iron") >= 0:
        self.browser_name = "Iron"
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
    elif user_agent_string.find("Mac") >= 0:
        self.os_name = "Mac OS"
    elif user_agent_string.find("Windows") >= 0:
        self.os_name = "Windows"
    else:
        self.os_name = "Unknown"



def dict_for_django_template():
    return {
        "foo":"bar"
        }

