var b=8,d=0,e=261.64,f=Array(13),g=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C"];function h(a){var c=document.getElementById("debug");if(c)c.innerHTML="<p>Playing "+g[a]+"</p>";document.getElementById("myaudio"+a+"_"+d%b).play();d++}
for(var i=0;i<13;i++){for(var j=0;j<b;j++){f[i]=document.createElement("audio");f[i].id="myaudio"+i+"_"+j;for(var k=1273.2395447351628/e,l=1,m="RIFF%ac%13%00%00WAVEfmt%20%10%00%00%00%01%00%01%00@%1f%00%00@%1f%00%00%01%00%08%00data%88%13%00%00",n=0;n<5E3;n++){var o=n/k;l*=0.9995;var p=parseInt(Math.sin(o)*l*127)+128;m+="%"+(p<16?"0":"")+p.toString(16)}f[i].src="data:audio/wave,"+m;f[i].controls=true;document.body.appendChild(f[i])}e*=1.059463}var q=[220,65,90,83,88,67,70,86,71,66,72,78,77];
document.onkeydown=function(a){a=a.keyCode?a.keyCode:a.charCode;for(var c=0;c<q.length;c++)if(a==q[c]){h(c);break}};h(0);