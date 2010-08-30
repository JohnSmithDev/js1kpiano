/* see /proj/test/python/maketone.py for the underlying concepts behind this
*/

var MONO = 1;
var SAMPLE_RATE = 8000; /* 1f40, hex 40=@ */

/* var NUM_SAMPLES = 5000; /* 13 88 */
var NUM_SAMPLES = 80000; /* 00 01 38 80, hex 38= 8 */




function wav_header(num_samples) {
    /* FF doesn't like space in data URI, but
       Safari and Opera are OK with it */
    return "RIFF%a48%01%00WAVEfmt%20" +
	"%10%00%00%00%01%00%01%00" +
	"@%1f%00%00" +
	"@%1f%00%00" +
	"%01%00%08%00" +
	"data%808%01%00";
}

function make_wav(freq) {
    var angle_factor =  1273.2395447351628 / freq;
    var decay = 1;
    var note_number = 0;

    var retval = wav_header(NUM_SAMPLES);

    /* 9 = octave range C...C */
    var step = Math.floor(NUM_SAMPLES / 9);
    for (var i=0; i<NUM_SAMPLES; i++) {
	var angle = i / angle_factor;
	decay *= 0.9995;
	var level = Math.sin(angle) * decay;
	var normalized = parseInt(level * 127) + 128;
	/* print(i + " %" + (normalized<16?"0":"") + normalized.toString(16)); */
	retval += "%" + (normalized<16?"0":"") + normalized.toString(16);

	if (i % step ==-1) {
	    note_number++;
	    freq *= 1.059463;
	    if ((note_number % 12)==1 ||
		(note_number % 12)==3 ||
		(note_number % 12)==6 ||
		(note_number % 12)==8 ||
		(note_number % 12)==10) {
		note_number++;
		freq *= 1.059463;
	    }
	    angle_factor = 1273.2395447351628 / freq;
	    decay=1;
	}
    }
    return retval;
}

/*make_wav(261.64, 80000);*/

var myaudio = document.createElement("audio");
myaudio.id = "myaudio";
myaudio.src="data:audio/wave,"+ make_wav(261.64);
myaudio.controls = true ;
document.body.appendChild(myaudio);
/* myaudio.play(); */

