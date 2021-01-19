const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const rwd = document.getElementById('brw');
const fwd = document.getElementById('frw');
const range = document.getElementById('range');
const timeStamp = document.getElementById('timestamp');

function updateProgress() {
  range.value = (video.currentTime / video.duration) * 100;

  let min = Math.floor(+video.currentTime / 60);
  let sec = Math.floor(+video.currentTime % 60);

  if (min < 10 && sec < 10) {
    timeStamp.textContent = `0${min}:0${sec}`;
  } else if (min >= 10 && sec < 10) {
    timeStamp.textContent = `${min}:0${sec}`;
  } else if (min < 10 && sec >= 10) {
    timeStamp.textContent = `0${min}:${sec}`;
  } else {
    timeStamp.textContent = `${min}:${sec}`;
  }
}
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  if (fwd.classList.contains('active') || rwd.classList.contains('active')) {
    fwd.classList.remove();
    rwd.classList.remove();
    clearInterval(intervalFwd);
    clearInterval(intervalRwd);
  }
  // if (video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
}

function updateIcon() {
  if (video.paused) {
    play.innerHTML = `<i class="fa fa-play fa-2x"></i>`;
  } else {
    play.innerHTML = `<i class="fa fa-pause fa-2x"></i>`;
  }
}

function stopVideo() {
  video.pause();
  range.value = 0;
  video.currentTime = 0;
}

function updateRange() {
  video.currentTime = (range.value * video.duration) / 100;
}

let intervalFwd;
let intervalRwd;

function mediaBackward() {
  clearInterval(intervalFwd);
  fwd.classList.remove('active');

  if (rwd.classList.contains('active')) {
    rwd.classList.remove('active');
    clearInterval(intervalRwd);
    video.play();
  } else {
    rwd.classList.add('active');
    video.pause();
    intervalRwd = setInterval(windBackward, 200);
  }
}

function mediaForward() {
  clearInterval(intervalRwd);
  rwd.classList.remove('active');

  if (fwd.classList.contains('active')) {
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    video.play();
  } else {
    fwd.classList.add('active');
    video.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}

function windBackward() {
  if (video.currentTime <= 3) {
    rwd.classList.remove('active');
    clearInterval(intervalRwd);
    stopMedia();
  } else {
    video.currentTime -= 3;
  }
}

function windForward() {
  if (video.currentTime >= video.duration - 3) {
    fwd.classList.remove('active');
    clearInterval(intervalFwd);
    stopMedia();
  } else {
    video.currentTime += 3;
  }
}
function stopMedia() {
  video.currentTime = 0;
  video.play();
  updateIcon();
}

function moveVideo(e) {
  if (e.keyCode === 37) {
    mediaBackward();
  } else if (e.keyCode === 39) {
    mediaForward();
  } else if (e.keyCode === 32) {
    togglePlay();
  }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateIcon);
video.addEventListener('pause', updateIcon);
video.addEventListener('timeupdate', updateProgress);
play.addEventListener('click', togglePlay);

stop.addEventListener('click', stopVideo);
range.addEventListener('change', updateRange);
document.addEventListener('keydown', moveVideo);

rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);
