export const formatTimeElapsed = (sec: number) => {
  let minutes = Math.floor(sec / 60);
  let seconds = sec - minutes * 60;

  let secString = `${seconds < 10 ? '0' + seconds : seconds}`;
  let minString = `${minutes < 10 ? '0' + minutes : minutes}`;

  return `${minString}:${secString}`;
};
