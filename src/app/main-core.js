let $mainInput;
let $mainBtn;
let $mainAlert;
let $mainSnake;
const $usedWords = ['sosna'];

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
        case 1:
            $mainAlert.innerText = 'Podaj jakieś słowo 😊';
            break;
        case 'clear':
            $mainAlert.innerText = '';
            break;
        case 'found':
            $mainAlert.innerText = 'Użyłeś/aś już tego słowa 😃';
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
    }
};

const clearInput = () => $mainInput.value = '';

const checkInput = () => {
    if($mainInput.value!=='') {
        checkWord();
        clearInput();
    } else {
        alertService(1);
    };
};