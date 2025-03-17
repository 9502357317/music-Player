// Music Player Logic
let currentTrack = 0;
let isPlaying = false;
let isRandom = false;
let isRepeat = false;
let audio = new Audio();

// List of tracks with local file paths
const tracks = [
  {
    name: "Butta Bomma",
    artist: "Armaan Malik",
    path: "songs/Buttabomma - SenSongsMp3.Co.mp3", // Local file path
    image: "images/song1.jpg",
  },
  {
    name: "Samajavaragamana",
    artist: "Sid Sriram",
    path: "songs/Samajavaragamana - SenSongsMp3.Co.mp3", // Local file path
    image: "images/song2.jpg",
  },
  {
    name: "Ninnila",
    artist: "Arman Malik",
    path: "songs/Ninnila - SenSongsMp3.Co.mp3", // Local file path
    image: "images/song3.jpg",
  },
  {
    name: "Hey Manasendukila",
    artist: "Arman Malik",
    path: "songs/Hey Manasendukila - SenSongsMp3.Com.mp3", // Local file path
    image: "images/song4.jpg",
  },
  {
    name: "sirivennala",
    artist: "Arman Malik",
    path: "songs/Sirivennala.mp3", // Local file path
    image: "images/song3.jpg",
  },

  // Add more tracks here
];

// Load a track
function loadTrack(index) {
  audio.src = tracks[index].path;
  document.querySelector(".track-name").textContent = tracks[index].name;
  document.querySelector(".track-artist").textContent = tracks[index].artist;
  document.querySelector(".track-art").style.backgroundImage = `url('${tracks[index].image}')`;

  if (isPlaying) {
    audio.play();
  }
}

// Play or pause the track
function playPauseTrack() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;
  document.querySelector(".playpause-track i").className = isPlaying
    ? "fa fa-pause-circle fa-5x"
    : "fa fa-play-circle fa-5x";
}

// Play the next track
function nextTrack() {
  if (isRandom) {
    currentTrack = Math.floor(Math.random() * tracks.length);
  } else {
    currentTrack = (currentTrack + 1) % tracks.length;
  }
  loadTrack(currentTrack);
  if (isPlaying) audio.play();
}

// Play the previous track
function prevTrack() {
  if (isRandom) {
    currentTrack = Math.floor(Math.random() * tracks.length);
  } else {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  }
  loadTrack(currentTrack);
  if (isPlaying) audio.play();
}

// Toggle random playback
function randomTrack() {
  isRandom = !isRandom;
  document.querySelector(".random-track i").style.color = isRandom ? "#ffde59" : "#fff";
}

// Toggle repeat playback
function repeatTrack() {
  isRepeat = !isRepeat;
  audio.loop = isRepeat;
  document.querySelector(".repeat-track i").style.color = isRepeat ? "#ffde59" : "#fff";
}

// Seek to a specific time in the track
function seekTo() {
  const seekSlider = document.querySelector(".seek_slider");
  const seekTo = (audio.duration / 100) * seekSlider.value;
  audio.currentTime = seekTo;
}

// Set the volume
function setVolume() {
  const volumeSlider = document.querySelector(".volume_slider");
  audio.volume = volumeSlider.value / 100;
}

// Update the seek slider as the track plays
audio.addEventListener("timeupdate", () => {
  const seekSlider = document.querySelector(".seek_slider");
  const currentTime = document.querySelector(".current-time");
  const duration = document.querySelector(".total-duration");

  // Update seek slider value
  seekSlider.value = (audio.currentTime / audio.duration) * 100;

  // Update current time display
  const currentMinutes = Math.floor(audio.currentTime / 60);
  const currentSeconds = Math.floor(audio.currentTime % 60);
  currentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? "0" : ""}${currentSeconds}`;

  // Update total duration display
  const durationMinutes = Math.floor(audio.duration / 60);
  const durationSeconds = Math.floor(audio.duration % 60);
  duration.textContent = `${durationMinutes}:${durationSeconds < 10 ? "0" : ""}${durationSeconds}`;
});

// Automatically play the next track when the current one ends
audio.addEventListener("ended", () => {
  if (isRepeat) {
    audio.currentTime = 0;
    audio.play();
  } else {
    nextTrack();
  }
});

// Load the first track when the page loads
window.addEventListener("load", () => {
  loadTrack(currentTrack);
});