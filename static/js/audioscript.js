var myimg = document.createElement("img");
/* JS doesn't like multiline strings, you can't end a line with backslash
   to indicate a continuation */
myimg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9YGARc5KB0XV+IAAAAddEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIFRoZSBHSU1Q72QlbgAAAF1JREFUGNO9zL0NglAAxPEfdLTs4BZM4DIO4C7OwQg2JoQ9LE1exdlYvBBeZ7jqch9//q1uH4TLzw4d6+ErXMMcXuHWxId3KOETnnXXV6MJpcq2MLaI97CER3N0vr4MkhoXe0rZigAAAABJRU5ErkJggg==";

document.body.appendChild(myimg);

/* http://www.position-absolute.com/articles/introduction-to-the-html5-audio-tag-javascript-manipulation/ */
var myaudio = document.createElement("audio");
myaudio.id = "myaudio";
myaudio.src="sounds/KDE_Beep_Door.wav";
myaudio.controls = true ;
document.body.appendChild(myaudio);
/* myaudio.play(); */

function doSomething() {
    document.getElementById("myaudio").play();
    /* the playing happens async, so the alert() below
       would appear before the start of the sound (there
       is some silence at the start of that file */
    alert("sound should have played");
}

var mydiv = document.createElement("div");
mydiv.id="mydiv";
mydiv.style.backgroundColor="#f00";
mydiv.save_colour=mydiv.style.backgroundColor;
mydiv.style.width="100px";
mydiv.style.height="40px";
mydiv.style.position="absolute";
mydiv.style.left="0px";
mydiv.style.top="100px";
mydiv.onclick = doSomething;
document.body.appendChild(mydiv);






