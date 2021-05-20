let $mainInput;
let $mainBtn;
let $mainAlert;
let $mainSnake;

const $usedWords = [];
const $regToMatch = /[a-zA-Z]/g;

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
        default:
            $mainAlert.innerText = 'Nieznany błąd 😿';
    }
};

const checkIfRepeat = word => $usedWords.find(el => el===word);

const checkWord = () => {
    const currentWord = $mainInput.value.toLowerCase();

    if(checkIfRepeat(currentWord)){
        alertService('found');
    } else {
        $usedWords.push(currentWord);
        clearInput();

        if(currentWord.match($regToMatch)){
            console.log(true);
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