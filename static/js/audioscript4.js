/* (c) Menboku Ltd 2010.  Licenced under GPL v2 */

/* Closure compiler usage:
  java -jar compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS
    --js sourcefile.js --js_output_file compiledfile.js
*/

/* see /proj/test/python/maketone.py for the underlying concepts behind this
*/

/* These vars are for illustrative/documentation purposes */

var MONO = 1;
var STEREO = 2;
var CHANNEL_COUNT = STEREO;

var BYTES_PER_SAMPLE = 2 * CHANNEL_COUNT;
var BITS_PER_SAMPLE = 16;

// var SAMPLE_RATE = 8000; /* 1f40, hex 40=@ */
// var NUM_SAMPLES = 5000; /* 13 88 - too short for Firefox 3.6.8 on Windows */

var SAMPLE_RATE = 44100 /* 0x0000ac44, hex 44=D */
var NUM_SAMPLES = 30000; /* 0x00007530 hex 75=u, hex 30=0 */

var SAMPLE_SIZE = NUM_SAMPLES * BYTES_PER_SAMPLE;


/* var NUM_SAMPLES = 80000; /* 00 01 38 80, hex 38= 8 */

/* we can't play the same player more than once, so create duplicate players
   for each note */
var DUPE_NOTES = 5;
var note_count = 0;

var press_count=0;

function wav_header(num_samples) {
    /* FF doesn't like space in data URI, but
       Safari and Opera are OK with it */
    return "RIFF%ac%13%00%00WAVEfmt%20" + /* NUM_SAMPLES + x24 */
	"%10%00%00%00%01%00%01%00" +
	"d%ac%00%00" + /* SAMPLE_RATE */
	"d%ac%00%00" + /* SAMPLE_RATE */
	"%01%00%08%00" +
	"data0u%00%00"; /* NUM_SAMPLES */
}

function make_wav(freq) {
    // var angle_factor =  1273.2395447351628 / freq; /* 8000hz */
    var angle_factor = 7018.733 / freq; /* 441.khz, actually .732990 */
    var decay = 1;
    var retval = wav_header(NUM_SAMPLES);

    for (var i=0; i<NUM_SAMPLES; i++) {
	var angle = i / angle_factor;
	// decay *= 0.9995; /* 8000hz */
	decay *= 0.9999; /* 441.khz */
	var level = Math.sin(angle) * decay;
	var normalized = parseInt(level * 127) + 128;
	/* print(i + " %" + (normalized<16?"0":"") + normalized.toString(16)); */
	retval += "%" + (normalized<16?"0":"") + normalized.toString(16);
    }
    return retval;
}

/*make_wav(261.64, 80000);*/

/* var freq = 261.64; /* middle C */
var freq = 130.82 /* an octave down */

/*var melody="02457975420";*/

var notes=new Array(13);
var keys=new Array(13);

var note_names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B","C"];

function play_note(note_number) {
    
    var log_el = document.getElementById("debug");
    if (log_el) {
	log_el.innerHTML = "<p>Playing " + note_names[note_number] +
	    " (press_count=" + press_count + "</p>";
	press_count++;
    }
    
    var note_id = "myaudio" + note_number + "_" + (note_count % DUPE_NOTES);
    document.getElementById(note_id).play();
    note_count++;
}

function play_note_from_key() {
    var key_number = this.id.substr(3);
    /*alert("pressed " + key_number);*/
    play_note(key_number)

}

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

var xpos=0;
for (var note_number=0; note_number<13; note_number++) {
    var white_note = true;
    if ((note_number % 12)==1 ||
	(note_number % 12)==3 ||
	(note_number % 12)==6 ||
	(note_number % 12)==8 ||
	(note_number % 12)==10) {
	white_note = false;
    } 
    for (var i=0; i<DUPE_NOTES; i++) {
	notes[note_number] = document.createElement("audio");
	notes[note_number].id = "myaudio" + note_number + "_" + i;
	notes[note_number].src="data:audio/wave,"+ make_wav(freq);
	notes[note_number].controls = true ;
	notes[note_number].autobuffer = true;
	notes[note_number].preload = "auto";
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
    if (key_id == 219) {
	octave--;
    } else if (key_id == 220) {
	octave++;
    }

}
document.onkeydown = play_from_keyboard;

play_note(0);



