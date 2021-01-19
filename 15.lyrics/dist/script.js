const form = document.querySelector('.form'),
  searchEl = document.querySelector('.search'),
  result = document.querySelector('.result'),
  navigation = document.querySelector('.navigation'),
  resultTitle = document.querySelector('.result-title');

const baseUrl = 'https://api.lyrics.ovh';

async function getData(term) {
  const res = await fetch(`${baseUrl}/suggest/${term}`);
  const data = await res.json();

  addToDom(data);
}

function createResultHead(term) {
  resultTitle.innerHTML = '';
  const h2 = document.createElement('h2');
  h2.innerText = `Result for: "${term}"`;
  resultTitle.appendChild(h2);
}

function addToDom(data) {
  result.innerHTML = `
   
      <ul class ="song">
        ${data.data
          .map(
            (song) => `
              
            <li>
              <span><strong>${song.artist.name}</strong> - ${song.title} </span>
              <button class="btn btn-getlyric" data-artist="${song.artist.name}" data-song="${song.title}">Get Lyrics</button>
            </li>
          `
          )
          .join('')}
      </ul>
    `;
  if (data.total > 15) {
    navigation.innerHTML = `
    ${
      data.prev
        ? `<button class="btn btn-nav prev" onclick="getMore('${data.prev}')">prev</button>`
        : ''
    }
      ${
        data.next
          ? `<button class="btn btn-nav next" onclick="getMore('${data.next}')">Next</button>`
          : ''
      }
    `;
  }
}

async function getMore(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  addToDom(data);
}

async function getLyrics(song, artist) {
  const res = await fetch(`${baseUrl}/v1/${artist}/${song}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/\n\r|\n|\r/g, '<br>');

  result.innerHTML = `
    <h2><strong>${artist}</strong> - ${song}</h2>
    <p>${lyrics}</p>
  `;

  navigation.innerHTML = '';
  resultTitle.innerHTML = '';
}

// Events

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const term = searchEl.value.trim();
  if (term) {
    getData(term);
    createResultHead(term);
  } else {
    alert('Please fill the field');
  }
});
result.addEventListener('click', (e) => {
  const clickedEl = e.target;
  if (clickedEl.classList.contains('btn-getlyric')) {
    const song = e.target.getAttribute('data-song');
    const artist = e.target.getAttribute('data-artist');
    getLyrics(song, artist);
  }
});
