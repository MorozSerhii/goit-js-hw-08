import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');

const player = new Player(iframe);
const wrightCurentTime = throttle(iframe => {
  localStorage.setItem('videoplayer-current-time', `${iframe.seconds}`);
}, 1000);

player.on('timeupdate', wrightCurentTime);

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));
