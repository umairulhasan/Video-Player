/* Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// build functions  for

function togglePlay() {
  // video property comes from html video tag   remember in if statement
  // we always use propert for condition remember
  //   if (video.paused) {
  //     // this is property
  //     video.play(); // this is method not property
  //   } else {
  //     video.pause();
  //   }

  // another way to write this code

  const method = video.paused ? "play" : "pause";
  video[method]();

  // because method name is string hear
  // video[video.paused ? 'pause' : 'play'](call the it)
  // method value is 'play' or 'pause' [method] we use due to 'play' or 'pause' are in string
}



function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';  // this gives video
    toggle.textContent= icon; //toggle is button by default its ► 

}

// for skip buttons
function skip(){

   console.log(this.dataset.skip); // data set gives u value what u set in html file .skip is access value in data set (object)
video.currentTime += parseFloat(this.dataset.skip)   //parseFloat convert string to number
}

// handle speed and volume

function handleRangeUpdate(){
// [this.name]    when we select vloume its return .voloume  and when we select playbackRange its give .playbackRange optimize the code 
    video[this.name] = this.value;
}


// handle video big line UI is change when flex-basis is changed
function handleProgress(){

const percentage = (video.currentTime / video.duration) * 100;
//progressBar is access from top
progressBar.style.flexBasis = `${percentage}%`; // this will change the flex-basis value UI also change when movie time change    
}

//for clicking and change video time where we want
// when click (Click event fire Note this one)
function scrub(e){
console.log(e) //Click event fire Note this one
//e.offsetX  mouse offset value where mouse click
// progress.offsetWidth total width of line 
const scrub = (e.offsetX / progress.offsetWidth) * video.duration ;
video.currentTime = scrub; // this will update the current time through scrub


}




// hook up the evevt listner
// when click button change
video.addEventListener("click", togglePlay);
//for play
video.addEventListener('play', updateButton);
// when pause 
video.addEventListener('pause', updateButton);
// this will change UI when video time change
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener("click", togglePlay);
// for skip button now foreach is apply on button for skiping
skipButtons.forEach(button => button.addEventListener("click",skip))
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate))  // do both same thing but work when mouse button up
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate))// do both same thing but work when mouse button move
//for clicking and change video time where we want
progress.addEventListener('click' ,scrub);


let mousedown = false;
progress.addEventListener('click' ,scrub);
// scrub(e) we pass due to upper function require e thats why we pass
progress.addEventListener('mousemove' , (e)=> mousedown && scrub(e) );  //if mousedown is true then run surub(e)  if now return false and do nothing
progress.addEventListener('mousedown' , ()=> mousedown = true );
progress.addEventListener('mouseup' , ()=> mousedown = false );

