//{{{variable declarations
"use strict";
let bgX;
let scaleX, scaleY;

let clickedVid;
let osdTimeout = 3000;
let osdTimer;
let vidOSD;
let playRate = 1;
let isVidInitiated=false;

;//}}}variable declarations

//{{{event listeners
window.onload = initWin();
window.addEventListener("keydown", evalKeyDown, false); //capture keypress on bubbling (false) phase
function evalKeyDown(evnt) {
    let keyPressed = evnt.keyCode;
    let rateIncValue = 0.2;
    //console.log ("keyUp: ",keyPressed);
    switch (keyPressed) {
        case 32 :  evnt.preventDefault();
                   if (clickedVid.paused) {clickedVid.play(); clickedVid.setAttribute("controls","controls") ;}
                   else {clickedVid.pause();clickedVid.removeAttribute("controls");};
                   break; //spaebar
        case 219 : evnt.preventDefault();
                   playRate -= rateIncValue;
                   if (playRate < 0.1) playRate = 0.1;
                   playRate = parseFloat(playRate.toFixed(2));
                   clickedVid.playbackRate = playRate;
                   if (osdTimeout > 0) showOSD(clickedVid.playbackRate);
                   break; //'['
        case 221 : evnt.preventDefault();
                   playRate += rateIncValue;
                   if (playRate > 16) playRate = 16;
                   playRate = parseFloat(playRate.toFixed(2));
                   clickedVid.playbackRate = playRate;
                   if (osdTimeout > 0) showOSD(clickedVid.playbackRate);
                   break; // ']'
        case 190 : evnt.preventDefault();
                   clickedVid.currentTime+=5;
                   break; // '<period>'
        case 188 : evnt.preventDefault();
                   clickedVid.currentTime-=5;
                   break; // '<comma>'
        case 70 :  if(event.ctrlKey) { evnt.preventDefault();
                    clickedVid.currentTime-=5;
                    if (clickedVid.requestFullscreen) { clickedVid.requestFullscreen(); }
                        else if (clickedVid.mozRequestFullScreen) { clickedVid.mozRequestFullScreen(); }
                        else if (clickedVid.webkitRequestFullScreen) { clickedVid.webkitRequestFullScreen(); }
                   }; //if (event.ctrlKey)
                   break; // 'f'
        case 27 : parent.focus(); break; //key: Escape --This gives control back to reveal.js when in an iframe 
        default : return;
    } //switch (keyPressed)
} //evalKey(event)
//}}}event listeners

//{{{initializations
//make sure elements are loaded before proceeding

function initWin() {
    //Get a reference to the canvas
    bgX = document.getElementById('backgroundX');
    clickedVid = document.getElementById("vidPicked");

    scaleX = bgX.clientWidth/bgX.naturalWidth;
    scaleY = bgX.clientHeight/bgX.naturalHeight;

    document.getElementById("filePicker").focus();

} //function init()

//}}}window init

//{{{handler functions
function switchVid(callID,callID2) {   // txt == content of form input
    let filePicked = document.getElementById(callID).value;
    let directory = document.getElementById(callID2).innerHTML;
    let fullPath=directory+filePicked;
    //console.log("FileLocation: " + directory+filePicked);
    console.log("FileLocation: " + fullPath);
    clickedVid.setAttribute ('src',fullPath);

}//function switchVid

function initVidPlayer(clicked_id) {
    isVidInitiated = true;
    clickedVid = document.getElementById(clicked_id);
    //clickedVid.setAttribute("controls","controls") ; 
    window.addEventListener("keydown", evalCtrlKey, false);
    clickedVid.onended = function() {clickedVid.removeAttribute("controls");};
} //function initVidPlayer(id)

function closeVidPlayer() { 
    if (isVidInitiated) {
        clickedVid.removeAttribute("controls");
        window.removeEventListener("keydown", evalCtrlKey);
        playRate = 1;
        clickedVid.playbackRate = playRate;
    } //if (isVidInitiated)
} //function closeVidPlayer()

function evalCtrlKey(evnt) {
       let keyPressed = evnt.keyCode;

} //function evalCtrlKey()

//}}}handler functions

//{{{helper functions
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    } //this.play = function(){
    this.stop = function(){
        this.sound.pause();
    }//this.stop = function(){    
}//function sound(src)

function insertCss( code ) {
    var style = document.createElement('style');
    style.innerHTML = code;

    document.getElementsByTagName("head")[0].appendChild( style );
} //function insertCss( code)

function showOSD(rate) {
    if (vidOSD) {
        vidOSD.textContent = rate + "X";
    } else {
        vidOSD = document.createElement("DIV");
        vidOSD.style.cssText = "position:fixed;z-index:999999999;right:5px;bottom:5px;margin:0;padding:5px;width:auto;height:auto;font:bold 10pt/normal monospace;background:#444;color:#fff";
        vidOSD.textContent = rate + "X";
        document.body.appendChild(vidOSD);
    } // if (vidOSD)
    clearTimeout(osdTimer);
    osdTimer = setTimeout(function() {
        vidOSD.remove();
        vidOSD = null;
    }, osdTimeout);
} // function showOSD(rate)

//}}}helper functions
