const lyricsArea = document.querySelector('#kashi_area');
const songInfo = document.querySelector('.song-infoboard');

function getFormattedLyrics() {
  const lyrics = lyricsArea.innerHTML;
  return formatLyrics(lyrics);
}

function formatLyrics(lyrics) {
  const formattedLyrics = lyrics.replaceAll('<br>', '\n');
  return formattedLyrics;
}

function showAndHidePopover(target) {
  const popover = document.createElement('span');
  popover.classList.add('ext-popover');
  popover.textContent = 'Copied!';
  target.append(popover);
  setTimeout(() => popover.remove(), 1000);
}

function clickHandler(e) {
  const lyrics = getFormattedLyrics();
  const songName = songInfo.querySelector('h2')?.textContent;
  const artistName = songInfo.querySelector('h3 [itemprop="byArtist name"]')?.textContent;
  const lyricist = songInfo.querySelector('[itemprop="lyricist"]')?.textContent;
  const composer = songInfo.querySelector('[itemprop="composer"]')?.textContent;
  const arranger = songInfo.querySelector('[itemprop="arranger"]')?.textContent;

  // Build the string
  const stringToCopy = `
  Song: ${songName} 
  Artist: ${artistName}
  -------------------
  Lyricist: ${lyricist || '--'}
  Composer: ${composer || '--'}
  Arranger: ${arranger || '--'}
  -------------------
  
  ${lyrics}
  `;

  // Copy the string
  navigator.clipboard.writeText(stringToCopy);

  // Show popover (if it's attached already, remove and re-add for more responsive UX)
  document.querySelector('.ext-popover')?.remove();
  showAndHidePopover(e.target);
}

function main() {
  const lyricsAreaContainer = lyricsArea.parentElement;
  const button = document.createElement('button');
  button.classList.add('copy-lyrics');
  button.innerHTML = 'Copy lyrics';
  button.addEventListener('click', clickHandler);
  lyricsAreaContainer.insertBefore(button, lyricsArea);
}

if (lyricsArea) main();
