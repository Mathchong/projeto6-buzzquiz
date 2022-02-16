const BUZZ_QUIZZ_API = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

function stringSize(string,min,max){
    if(string===null)return false;
    if(string.length < min || string.length > max) return false;
    return true;
}

function numberRange(number, min, max){
    let regex = /^\d{1,}$/
    if(!regex.test(min) || !regex.test(max)) return console.error("Invalid Parameter on numberRange Function")
    if(!regex.test(number)) return false;
    number = parseInt(number)
    if (number < min || number > max) return false;
    return true;
}