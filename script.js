let CurrentMusic = 0;

const music = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const SongName = document.querySelector('.music-name');
const ArtistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const masterPlay = document.querySelector('#masterPlay');
const forwardButton = document.querySelector('#forwardbtn');
const backwardButton = document.querySelector('#backwardbtn');

masterPlay.addEventListener('click',()=>{
    if(masterPlay.className.includes('play')){
        music.play();
    }
    else{
        music.pause();
    }
    masterPlay.classList.toggle('fa-pause');
    masterPlay.classList.toggle('fa-play');
        
        
       
})
const setMusic = (i)=>{
    seekBar.value = 0;
    let song = songs[i];
    CurrentMusic = i;
    music.src = song.path;
    SongName.innerText = song.name;
    ArtistName.innerText = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;
    currentTime.innerText = '00.00';


    setTimeout(() =>{
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);

    },300);
}

setMusic(0);
const formatTime = (time) =>{
    let min = Math.floor(time/60);
    if(min < 10){
        min = `0${min}`;
    }
    let sec = Math.floor(time%60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        forwardButton.click();
    }
}, 1000);

seekBar.addEventListener('change' , ()=>{
    music.currentTime = seekBar.value;
})

const PlayMusic =  ()=>{
    music.play();
    masterPlay.classList.remove('pause');
    disk.classList.add('play');
}

forwardButton.addEventListener('click', ()=>{
    if(CurrentMusic>= songs.length -1){
        CurrentMusic = 0;
    }
    else{
        CurrentMusic++;
    }
    setMusic(CurrentMusic);
    PlayMusic();
}
)
backwardButton.addEventListener('click', ()=>{
    if(CurrentMusic<=0){
        CurrentMusic = songs.length-1;
    }
    else{
        CurrentMusic--;
    }
    setMusic(CurrentMusic);
    PlayMusic();
}
)

