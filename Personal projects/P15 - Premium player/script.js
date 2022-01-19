const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play-btn");
const nextBtn = document.getElementById("next");
const icon = document.querySelectorAll(".player-controls .fas");
const playerContainer = document.querySelector(".player-container");
const theme = document.querySelector(".theme");
const defaultTheme = document.querySelector(".default");
const picoPink = document.querySelector(".pico-pink");
const mintyGreen = document.querySelector(".minty-green");
const blueHorizon = document.querySelector(".blue-horizon");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Pause");
  music.pause();
}

// Play Event
playBtn.addEventListener("click", function () {
  isPlaying ? pauseSong() : playSong();
  checkPlayPause();
});

// Current song
let songIndex = 0;

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
  if (!playBtn.classList.contains("active")) {
    playBtn.classList.add("active");
  }
}

// Previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
  if (!playBtn.classList.contains("active")) {
    playBtn.classList.add("active");
  }
}

// Update DOM
function loadSong(song) {
  artist.textContent = song.artist;
  title.textContent = song.displayName;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Update progress bar & time
function updateProgressBar() {
  if (isPlaying) {
    progress.style.width = `${(music.currentTime / music.duration) * 100}%`;
  }
  let durationMins = Math.floor(music.duration / 60);
  let durationSeconds = Math.floor(music.duration % 60);

  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }

  // Delay switching duration to avoid NAN
  if (durationSeconds) {
    durationEl.textContent = `${durationMins}:${durationSeconds}`;
  }
  let currentMins = Math.floor(music.currentTime / 60);
  let currentSeconds = Math.floor(music.currentTime % 60);

  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }

  // Delay switching current to avoid NAN
  if (currentSeconds) {
    currentTimeEl.textContent = `${currentMins}:${currentSeconds}`;
  }
}

// Loads first song
loadSong(songs[songIndex]);

// Set progress bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
  playSong();
}

// Event listeners
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
defaultTheme.addEventListener("click", function () {
  [...theme.children].forEach((el) => {
    el.classList.remove("active");
  });
  playerContainer.style.backgroundColor = "#b7a9fc";
  icon.forEach((i) => {
    i.style.color = "#f56d5e";
  });
  playBtn.style.backgroundColor = "#f56d5e";
  [...playBtn.children].forEach((s) => {
    s.style.backgroundColor = "#000";
  });
  this.classList.add("active");
});
picoPink.addEventListener("click", function () {
  [...theme.children].forEach((el) => {
    el.classList.remove("active");
  });
  playerContainer.style.backgroundColor = "#ff9ff3";
  icon.forEach((i) => {
    i.style.color = "#4b6584";
  });
  playBtn.style.backgroundColor = "#4b6584";
  [...playBtn.children].forEach((s) => {
    s.style.backgroundColor = "#fff";
  });
  this.classList.add("active");
});
mintyGreen.addEventListener("click", function () {
  [...theme.children].forEach((el) => {
    el.classList.remove("active");
  });
  playerContainer.style.backgroundColor = "#26de81";
  icon.forEach((i) => {
    i.style.color = "#000";
  });
  playBtn.style.backgroundColor = "#000";
  [...playBtn.children].forEach((s) => {
    s.style.backgroundColor = "#fff";
  });
  this.classList.add("active");
});
blueHorizon.addEventListener("click", function () {
  [...theme.children].forEach((el) => {
    el.classList.remove("active");
  });
  playerContainer.style.backgroundColor = "#4b6584";
  icon.forEach((i) => {
    i.style.color = "#f56d5e";
  });
  playBtn.style.backgroundColor = "#f56d5e";
  [...playBtn.children].forEach((s) => {
    s.style.backgroundColor = "#000";
  });
  this.classList.add("active");
});
// document.querySelector('body').addEventListener('click', '.btn', function(e){
// 	e.preventDefault();
// 	if ( document.querySelector(this).classList.contains('play') ) {
// 		document.querySelector(this).removeClass('play');
// 		document.querySelector(this).classList.add('pause');
// 	} else {
// 		document.querySelector(this).removeClass('pause');
// 		document.querySelector(this).classList.add('play');
// 	}
// });

function checkPlayPause() {
  if (playBtn.classList.contains("active")) {
    playBtn.classList.remove("active");
  } else {
    playBtn.classList.add("active");
  }
}
