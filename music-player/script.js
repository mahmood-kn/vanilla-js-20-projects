const musicContainer = document.getElementById('music-container'),
  musicCover = document.getElementById('music-cover'),
  musicName = document.getElementById('music-name'),
  progress = document.getElementById('progress'),
  progressContainer = document.getElementById('progress-container'),
  audio = document.getElementById('audio'),
  prev = document.getElementById('prev-btn'),
  next = document.getElementById('next-btn'),
  play = document.getElementById('play-btn');

const musics = ['hey', 'summer', 'ukulele'];
let selectedIndex = 1;

function getSong(currMusic) {
  audio.src = `./music/${currMusic}.mp3`;
  musicCover.src = `./images/${currMusic}.jpg`;
  musicName.innerText = currMusic;
}

getSong(musics[selectedIndex]);

function playSong() {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    musicContainer.classList.remove('play');
    play.children[0].classList.add('fa-play');
    play.children[0].classList.remove('fa-pause');

    audio.pause();
  } else {
    musicContainer.classList.add('play');
    play.children[0].classList.remove('fa-play');
    play.children[0].classList.add('fa-pause');

    audio.play();
  }
}

function prevSong() {
  selectedIndex--;
  if (selectedIndex < 0) {
    selectedIndex = musics.length - 1;
  }

  getSong(musics[selectedIndex]);
  audio.play();
}

function nextSong() {
  selectedIndex++;
  if (selectedIndex > musics.length - 1) {
    selectedIndex = 0;
  }

  getSong(musics[selectedIndex]);
  audio.play();
}

function updateProgress(e) {
  console.log(e);
  let [duration, currentTime] = [audio.duration, audio.currentTime];
  progress.style.width = `${(currentTime / duration) * 100}%`;
}

function setProgress(e) {
  const curr = e.offsetX;
  const width = this.clientWidth;
  const duration = audio.duration;
  audio.currentTime = (curr / width) * duration;
}

play.addEventListener('click', playSong);
prev.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);
