let $mainInput;
let $mainBtn;
let $mainAlert;
let $mainSnake;
let $infoScreen;
let $cheatBtn;
let $resultLengthBox;
let $resultAmontOfWordsBox;
let $resultTheLongestWord;
let $timerEl;
let $time;
let $counter;

const $usedWords = [];
const $starterWords = ['ala', 'bonifacy', 'cymbał', 'drużba', 'ewa', 'francuz', 'grymas', 'hipopotam', 'irys', 'jacek', 'kiwi', 'limonka', 'minionek', 'nazwa', 'omlet', 'prostownica', 'rysy', 'zegarek'];
const $regToMatch = /[a-zA-Z]/g;
const $regToAvoid = /[0-9~@#$^*()_+=[{}|,.?: -*$)(?!.*<>'"/;`%\u005D\u005C]/gu;
let $snake;

export const main = () => {
    prepareElements();
    prepareEvents();
    getRandomStarterWord();
    infoScreenService('start');
};

const prepareElements = () => {
    $mainInput = document.querySelector('.input-area__input');
    $mainBtn = document.querySelector('.input-area__btn');
    $mainAlert = document.querySelector('.input-area__alert');
    $mainSnake = document.querySelector('.results__snake');
    $infoScreen = document.querySelector('.popup.info-screen');
    $cheatBtn = document.querySelector('.btn.egg');
    $resultLengthBox = document.querySelector('.results__length');
    $resultAmontOfWordsBox = document.querySelector('.results__words');
    $resultTheLongestWord = document.querySelector('.results__the-longest-word');
    $timerEl = document.querySelector('.timer__box');
};

const prepareEvents = () => {
    $mainBtn.addEventListener('click', checkInput);
    $mainInput.addEventListener('keyup', () => alertService('clear'));
    $mainInput.addEventListener('keyup', checkKey);
    $cheatBtn.addEventListener('click', openMsg);
};

const count = () => {
    $timerEl.innerText = $time;
    console.log($time);
    $time--;
    if($time<0){
        clearInterval($counter);
        endGame();
    }
};

const startGame = time => {
    $mainInput.value = '';
    $time = time;
    $infoScreen.classList.add('hidden');
    $counter = setInterval(count, 1000);
};

const endGame = () => {
    $infoScreen.classList.remove('hidden');
    infoScreenService('end');
};

const checkKey = e => {
    if(e.code==='Enter'){
        checkInput();
    }
};

const infoScreenService = choice => {
    switch(choice){
        case 'start':
            $infoScreen.innerHTML = `
            <h3>Wybierz czas, aby rozpocząć grę:</h3>
            <div>
                <button class="popup__btn special btn popup__btn--30">30sek</button>
                <button class="popup__btn special btn popup__btn--60">60sek</button>
            </div>
            `;
            const timerBtn30 = document.querySelector('.popup__btn--30');
            const timerBtn60 = document.querySelector('.popup__btn--60');
            timerBtn30.addEventListener('click', () => startGame(30))
            timerBtn60.addEventListener('click', () => startGame(60))
            break;
        case 'end':
            $infoScreen.innerHTML = `
            <h3>Czas minął 😄 Koniec gry</h3>
            <p>Twój wynik: ${$resultLengthBox.innerText}</p>
            <button class="popup__btn special btn reload">Ponów grę</button>
            `;
            const timerBtnReload = document.querySelector('.btn.reload');
            timerBtnReload.focus();
            timerBtnReload.addEventListener('click', ()=> window.location.reload());
            break;
        default:
            console.error('infoScreenService function error');
    };
};

const alertService = evn => {
    switch(evn){
        case 'empty':
            $mainAlert.innerText = 'Podaj jakieś słowo 😊';
            break;
        case 'clear':
            $mainAlert.innerText = '';
            break;
        case 'found':
            $mainAlert.innerText = 'Użyłeś/aś już tego słowa 😃';
            break;
        case 'invalid':    
            $mainAlert.innerText = 'Słowo nie może zawierać spacji, numerów ani znaków specjalnych 😉';
            break;
        case 'notmatch':
            $mainAlert.innerText = 'Wymyśl inne słowo 😉';
            break;
        case 'tiny':
            $mainAlert.innerText = 'Za krótkie słowo 🙂';    
            break;
        default:
            $mainAlert.innerText = 'Nieznany błąd 😿';
    }
};

const getRandomStarterWord = () => {
    const min = 0;
    const max = $starterWords.length-1;
    const randomWord = $starterWords[Math.floor(Math.random()*(max-min+1) + min)];

    $mainSnake.innerHTML = `<span>${randomWord.substring(0,1)}</span>${randomWord.substring(1,randomWord.length-1)}<span>${randomWord.substring(randomWord.length-1)}</span>`;
    $usedWords.push(randomWord);
    updateStats();
};

const extendSnake = word => {
    $snake = $mainSnake.innerText.toLowerCase();
    let firstLetter = word.substring(0, 1)
    let lastLetter = $snake.substring($snake.length - 1);

    if(firstLetter===lastLetter){
        if(word.length>=2){
            $usedWords.push(word);
            $mainSnake.innerHTML += word.substring(1, word.length-1) + `<span>${word.substring(word.length-1)}</span>`;
            updateStats();
        } else {
            alertService('tiny');
        };
    } else {
        alertService('notmatch');
    };
};

const checkIfRepeat = word => $usedWords.find(el => el===word);

const checkWord = () => {
    const currentWord = $mainInput.value.toLowerCase();

    if(checkIfRepeat(currentWord)){
        alertService('found');
    } else {
        clearInput();

        if(currentWord.match($regToMatch) && currentWord.includes(' ')===false && !currentWord.match($regToAvoid)){
            extendSnake(currentWord);
        } else {
            alertService('invalid');
        };
    }
};

const clearInput = () => $mainInput.value = '';

const checkInput = () => {
    if($mainInput.value!=='') {
        checkWord();
        clearInput();
    } else {
        alertService('empty');
    };
};

const openMsg = () => {
    const msg = document.createElement('div');
    const closeBtn = document.createElement('button');
    closeBtn.innerText = 'zamknij';
    closeBtn.className = 'special btn close';
    closeBtn.addEventListener('click', () => msg.remove());

    msg.innerHTML = '<p>Mam nadzieję, że nie będziesz oszukiwał 😄😉</p>';
    msg.appendChild(closeBtn);
    msg.classList.add('box-msg');
    document.body.appendChild(msg);

    setTimeout(() => msg.remove(), 3000);
};

const updateStats = () => {
    $resultLengthBox.innerText = $mainSnake.innerText.split('').length;
    $resultAmontOfWordsBox.innerText = $usedWords.length;
    const sortedWordsArr = $usedWords.sort((a,b) => a.length - b.length);
    $resultTheLongestWord.innerText = sortedWordsArr[sortedWordsArr.length-1];
};