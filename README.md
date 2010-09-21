# SUMMARY

This was my entry into the 2010 JS1k competition. It also includes the
unminified JavaScript source, and a simple App Engine app to wrap it in.

This app has been deployed at [http://js1kpiano.appspot.com](http://js1kpiano.appspot.com)

The competition entry link is  [http://js1k.com/demos#id689](http://js1k.com/demos#id689)

# CODE OVERVIEW

The compressed JavaScript file is /static/js/compiled.js  (I notice
js1k.com reports a slightly different size, not sure if that's down to
cut-and-paste issues, or if the copy here is marginally different.)

The uncompressed JavaScript is /static/js/audioscript4.js - I used
Closure Compiler to bring it down to less than 1k.

The rest of the code is a very basic App Engine wrapper to provide
some perfunctory docs, and also to do some fairly worthless access logging.
(I could have used Google Analytics, but given that I run the Ghostery
add-on for Firefox, it would be hypocritical of me to expect others not to
;-)

# MORE DOCUMENTATION

The HTML 'brochureware' in /templates/ has more info; the unminified
JavaScript also has a lot of stuff, buried in amongst a fair amount
of abandoned code.

