let $mainInput;
let $mainBtn;
let $mainAlert;
let $mainSnake;

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
};

const alertService = evn => {
    switch(evn){
        case 1:
            $mainAlert.innerText = 'Podaj jakieś słowo 😊';
            break;
        case 'clear':
            $mainAlert.innerText = '';
            break;
        default:
            $mainAlert.innerText = 'Nieznany błąd 😿';
    }
};

const checkIfRepeat = word => {
    console.log(word); //temporarily ;)
};

const checkWord = () => {
    if(checkIfRepeat($mainInput.value)){
        console.log('nie znalezioo');
        $mainInput.value = '';
    } else {
        
    }
};

const checkInput = () => {
    if($mainInput.value!=='') {
        checkWord();
        alertService('clear');
    } else {
        alertService(1);
    };
};