let $mainInput;
let $mainBtn;
let $mainAlert;
let $mainSnake;

const $usedWords = [];
const $regToMatch = /[a-zA-Z]/g;
const $regToAvoid = /[0-9~@#$^*()_+=[{}|,.?: -*$)(?!.*<>'"/;`%\u005D\u005C]/gu;
let $snake;

export const main = () => {
    prepareElements();
    prepareEvents();
};

const prepareElements = () => {
    $mainInput = document.querySelector('.input-area__input');
    $mainBtn = document.querySelector('.input-area__btn');
    $mainAlert = document.querySelector('.input-area__alert');
    $mainSnake = document.querySelector('.results__snake');
};

const prepareEvents = () => {
    $mainBtn.addEventListener('click', checkInput);
    $mainInput.addEventListener('keyup', () => alertService('clear'));
    $mainInput.addEventListener('keyup', checkKey);
};

const checkKey = e => {
    if(e.code==='Enter'){
        checkInput();
    }
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

const extendSnake = word => {
    $snake = $mainSnake.innerText.toLowerCase();
    let firstLetter = word.substring(0, 1)
    let lastLetter = $snake.substring($snake.length - 1);

    if(firstLetter===lastLetter){
        if(word.length>=2){
            $usedWords.push(word);
            console.log($usedWords);
            $mainSnake.innerHTML += word.substring(1, word.length-1) + `<span>${word.substring(word.length-1)}</span>`;
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