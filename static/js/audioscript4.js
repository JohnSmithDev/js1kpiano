/* (c) Menboku Ltd 2010.  Licenced under GPL v2 */

/* Closure compiler usage:
  java -jar compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS
    --js sourcefile.js --js_output_file compiledfile.js
*/

/* see /proj/test/python/maketone.py for the underlying concepts behind this
*/

var q = 16;

/* These vars are for illustrative/documentation purposes */



var MONO = 1;
var STEREO = 2;
var CHANNEL_COUNT = STEREO;

var BYTES_PER_SAMPLE = 2 * CHANNEL_COUNT;
var BITS_PER_SAMPLE = 16;

// var SAMPLE_RATE = 8000; /* 1f40, hex 40=@ */
// var NUM_SAMPLES = 5000; /* 13 88 - too short for Firefox 3.6.8 on Windows */

var SAMPLE_RATE = 44100 /* 0x0000ac44, hex 44=D */
/* 44100 * 4 = 176,400 => 0x00 02 b1 10 */ 
var NUM_SAMPLES = 30000; /* 0x00007530 hex 75=u, hex 30=0 */

var SAMPLE_SIZE = NUM_SAMPLES * BYTES_PER_SAMPLE;
/* that's 480,000 = 0x00075300 */
/* REALLY? 30000 * 4 = 120,000 = 0x0001b4a0 surely? */

/* var NUM_SAMPLES = 80000; /* 00 01 38 80, hex 38= 8 */

/* we can't play the same player more than once, so create duplicate players
   for each note */
var DUPE_NOTES = 9;
var note_count = 0;


/*var press_count=0;*/

function wav_header(num_samples) {
    /* FF doesn't like space in data URI, but
       Safari and Opera are OK with it */
    return "RIFF%c4%b4%01%00" + /* SAMPLE_SIZE + x24 */ /* TODO ASCIIfy*/
	"WAVEfmt%20" + 
	"%10%00%00%00" + /* length of this subchunk - never changes */
        "%01%00" +  /* 1 => uncompressed */
	"%02%00" + /* CHANNEL_COUNT */
	"D%ac%00%00" + /* SAMPLE_RATE */
	"%10%b1%02%00" + /* SAMPLE_RATE * BYTES_PER_SAMPLE*/
	"%04%00" + /* BYTES_SAMPLE */
	"%10%00" + /* BITS_PER_SAMPLE */
	"data%a0%38%01%00"; /* SAMPLE_SIZE - TODO ASCIIfy */
}

function make_wav(freq) {
    // var angle_factor =  1273.2395447351628 / freq; /* 8000hz */
    var angle_factor = 7018.733 / freq; /* 441.khz, actually .732990 */
    var decay = 1;
    var retval = wav_header(NUM_SAMPLES);

    for (var i=0; i<NUM_SAMPLES; i++) {
	var angle = i / angle_factor;
	// decay *= 0.9995; /* 8000hz */
	/*
	if (i<100) {
	    decay=0;
	} else if (i>100 && i<1000) {
	    decay=(i-100)/900;
	} else {
	    decay *= 0.9995;
	}
	*/
	decay *= 0.9999; /* 441.khz */
	var level = Math.sin(angle) * decay;
	/* 8 bit code 
	var normalized = parseInt(level * 127) + 128;
	retval += "%" + (normalized<16?"0":"") + normalized.toString(16);
	*/
	/* 16 bit code */
	var normalized = parseInt(level * 32767);
	if (normalized<0) {
	    normalized=65536+normalized;
	}
	var high_byte = normalized >> 8;
	var low_byte = normalized & 255;
	for (var channel_loop=0; channel_loop<2; channel_loop++) {
	    /* twice for stereo */
	    retval += "%" + (low_byte<q?"0":"") + low_byte.toString(q) +
		"%" + (high_byte<q?"0":"") + high_byte.toString(q);
	}

    }
    return retval;
}

/*make_wav(261.64, 80000);*/

var freq = 261.64; /* middle C */
/*var freq = 130.82 /* an octave down */

/*var melody="02457975420";*/

var notes=new Array(q); /* 13 really, but maybe can save bytes? */
/*var keys=new Array(13);*/

/*
var note_names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "Ab", "A", "A#", "B","C"];
*/

var note_offsets=[0,0,1,1,2,3,3,4,5,5,5,6,7];
var s="\u266f"; 
var note_accents=["", s, /* C */
		  "", s,  /* D */
		  "", /* E */
		  "", s,  /* F */
		  "", /* G */
		  "\u266d", "", s,  /* A */
		  "", /* B */
		  "" /* C */
		 ];


function init_canvas() {
	cv.height=99;
	c.font = "50px sans"; /* need a font name it seems */
	
	note_count=0;

}		  

function play_note(note_number) {
    
/*
    var log_el = document.getElementById("debug");
    if (log_el) {
	log_el.innerHTML = "<p>Playing " + note_names[note_number] +
	    " (press_count=" + press_count + "</p>";
	press_count++;
    }
*/  
  
    var note_id = /* "myaudio" + */ note_number + "_" + (note_count % DUPE_NOTES);
    document.getElementById(note_id).play();
    var x="\u2669"+note_accents[note_number];

    if (note_count>=q) {
	init_canvas();
    }
    c.fillText(x, 5 + (note_count*50), 99-(note_offsets[note_number]*5));

    note_count++;
}

/*
function play_note_from_key() {
    var key_number = this.id.substr(3);
    /*alert("pressed " + key_number);* /
    play_note(key_number)
}
*/

/*
function play_note_in_melody(seq_number) {
    play_note(melody[seq_number]);
    if (seq_number < melody.length) {
	setTimeout(play_note_in_melody(note_number+1), 1000);
    } else {
	alert("All notes in melody played!");
    }
}
*/

/*var xpos=0;*/
/* max is really 13 rather than 16 aka q, but trying to save bytes */
for (var note_number=0; note_number<q; note_number++) {
    /*
    var white_note = true;
    if ((note_number % 12)==1 ||
	(note_number % 12)==3 ||
	(note_number % 12)==6 ||
	(note_number % 12)==8 ||
	(note_number % 12)==10) {
	white_note = false;
    } 
    */
    freqstr=make_wav(freq); /* space inefficient but quicker */
    for (var i=0; i<DUPE_NOTES; i++) {

	notes[note_number] = document.createElement("audio");
	notes[note_number].src="data:audio/wave,"+ freqstr;
	/*notes[note_number].autobuffer = true;*/
	notes[note_number].preload = "auto";

	/* More efficient but causes Opera to crash 
	notes[note_number] = Audio("data:audio/wave,"+ make_wav(freq));
	*/
	notes[note_number].id = /*"myaudio" + */ note_number  + "_" + i;

	/*notes[note_number].controls = true ;*/
	document.body.appendChild(notes[note_number]);
    }

    /*
    keys[note_number] = document.createElement("div");
    keys[note_number].id="key" + note_number;
    keys[note_number].style.position="absolute";
    keys[note_number].style.borderColor = "#000";
    keys[note_number].style.borderWidth= "2px";
    keys[note_number].style.borderStyle= "solid";

    if (white_note) {
        keys[note_number].style.backgroundColor="#fff";
        keys[note_number].style.width="96px";
        keys[note_number].style.height="400px";
        keys[note_number].style.left=xpos + "px";
        keys[note_number].style.top="250px";
        keys[note_number].style.zIndex=1;
	xpos+=100;
    } else {
        keys[note_number].style.backgroundColor="#000";
        keys[note_number].style.width="94px";
        keys[note_number].style.height="250px";
        keys[note_number].style.left=(xpos - 52 ) + "px";
        keys[note_number].style.top="250px";
        keys[note_number].style.zIndex=100;
    }
    keys[note_number].save_colour=keys[note_number].style.backgroundColor;
    keys[note_number].onclick = play_note_from_key;
    document.body.appendChild(keys[note_number]);
    */

    freq *= 1.059463;
}

/*
var key_mappings = [
    220, // backslash  - 0 C 
    65, // A           - 1 C#
    90, // Z           - 2 D
    83, // S           - 3 D#
    88, // X           - 4 E
    // skip black note
    67, // C           - 5 F
    70, // F           - 6 F#
    86, // V           - 7 G
    71, // G           - 8 G#
    66, // B           - 9 A
    72, // H           - 10 A#
    78, // N           - 11 B
    // skip black note
    77// M           - 12 C
];
*/  
var key_mappings = [
    81, // Q - 00 - C
    50, // 2 - 01 - C#
    87, // W - 02 - D
    51, // 3 - 03 - D#
    69, // E - 04 - E
    // skip black note
    82, // R - 05 - F
    53, // 5 - 06 - F#
    84, // T - 07 - G
    54, // 6 - 08 - G#
    89, // Y - 09 - A
    55, // 7 - 10 - A#
    85, // U - 11 - B
    // skip black note
    73  // I - 12 - C
];
    
  
function play_from_keyboard(e) {
    /*var key_id = e.keyCode ? e.keyCode : e.charCode;*/
    var key_id = e.keyCode;
    for (var i=0; i<key_mappings.length; i++) {
	if (key_id == key_mappings[i]) {
	    play_note(i);
	    /* break; /* not strictly necessary */
	}
    }
    /*
    if (key_id == 219) {
	octave--;
    } else if (key_id == 220) {
	octave++;
    }
    */
}

var cv = document.getElementById("c");
var c= cv.getContext("2d");
cv.width=999;
init_canvas();

/* these were just for seeing how much space I had in the canvas
  they aren't needed for proper use
c.fillStyle="#ff8";
c.fillRect(0,0,cv.width,cv.height);
c.fillStyle="#000";
*/

/*
cv.height=99;
c.font = "20px sans"; 
*/
/*c.font = "bold 20px sans-serif";*/
/* c.font="20px"; /* fails to parse */
/*c.fontSize="20px"; /* doesn't seem to have any effect */


document.onkeydown = play_from_keyboard;

/*play_note(0); /* just to indicate ready */




