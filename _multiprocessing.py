""" Kludge file to cover problems with Python 2.6,
something to do with how path searching has been
changed since 2.5.x

See App Engine issue 1504 for details, this kludge
is detailed in comments 7 thru 10 from Oct 2009.

Should have zero impact on 2.5.x as used on live
servers; this is just a convenience for developers
not have to worry about their local Python version.
"""

import multiprocessing

