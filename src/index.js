import './style.css';

const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const form = document.querySelector('#form');
const userName = document.querySelector('#user_name');
const userScore = document.querySelector('#user_score');
const scoresList = document.querySelector('#list');
const refresh = document.querySelector('#refresh');

const addScoreAndUser = async () => {
  await fetch(`${api}games/Zl4d7IVkemOTTVg2fUdz/scores/`, {
    method: 'POST',
    body: JSON.stringify({
      user: userName.value,
      score: userScore.value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addScoreAndUser();
  form.reset();
});

// render data to display
const renderData = (items) => {
  scoresList.innerHTML = '';
  items.forEach((item) => {
    scoresList.innerHTML += `<li>${item.user}:${item.score}</li>`;
  });
};

// get list of score from API
const getScoresList = async () => {
  const getScrores = await fetch(`${api}games/Zl4d7IVkemOTTVg2fUdz/scores/`);
  const reponse = await getScrores.json();
  const data = JSON.parse(JSON.stringify(reponse));
  renderData(data.result);
};

// refresh the page
refresh.addEventListener('click', () => {
  window.location.reload();
  return false;
});

// load the data
document.addEventListener('loadContent', getScoresList());