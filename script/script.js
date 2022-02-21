let arrayListaQuizzes = []
let arrayDeQuizzes = []
//verifyIfExistDataStorage()
let quantidadeDePerguntas
let quizzEmQuestao
let quantidadeDeNiveis
let quizzCriado = {
  title: '',
  image: '',
  questions: [],
  levels: []
}

let questionHTML = `<div class="question-info-container">
<div class="area">
  <div class="question-number">
    <h2>Pergunta QuestionNumber</h2>
    <ion-icon name="create-outline"></ion-icon>
  </div>
  <div class="question-form">
    <input class="input1" type="text" placeholder="Texto da Pergunta" name="Pergunta" id="#questionText">
    <input class="input-url" type="text" placeholder="Cor de Fundo da Pergunta" name="Pergunta" id="#questionColor">
    <h2>Resposta Correta</h2>
    <input class="input1" type="text" placeholder="Resposta Correta" name="Pergunta" id="#correctAnswer">
    <input class="input-url" type="text" placeholder="URL da Imagem" name="Pergunta" id="#answerImageURL">
    <h2>Respostas Incorretas</h2>
    <input class="input1" type="text" placeholder="Resposta Incorreta1" name="Pergunta" id="#wrongAnswer1">
    <input class="input-url" type="text" placeholder="URL da Imagem1" name="Pergunta" id="#answerImageURL">
    <input class="input1" type="text" placeholder="Resposta Incorreta2" name="Pergunta" id="wrongAnswer2-3">
    <input class="input-url" type="text" placeholder="URL da Imagem2" name="Pergunta" id="#answerImageURL">
    <input class="input1" type="text" placeholder="Resposta Incorreta3" name="Pergunta" id="wrongAnswer2-3">
    <input class="input-url" type="text" placeholder="URL da Imagem3" name="Pergunta" id="#answerImageURL">
  </div>
</div>
</div>`

function verificarSeExisteDataStorage() {
  if (
    JSON.parse(window.localStorage.getItem('User Quizzes')) === null ||
    JSON.parse(window.localStorage.getItem('User Quizzes')).length === 0
  ) {
    window.localStorage.setItem('User Quizzes', JSON.stringify(arrayDeQuizzes))
  } else {
    arrayDeQuizzes = JSON.parse(window.localStorage.getItem('User Quizzes'))
    document.querySelector('.create-quizz').classList.add('hidden')
    document.querySelector('.user-quizzes').classList.remove('hidden')
  }
}

//const BUZZ_QUIZZ_API = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes'

function stringSize(string, min, max) {
  if (string === null) return false
  if (string.length < min || string.length > max) return false
  return true
}

function numberRange(number, min, max) {
  let regex = /^\d{1,}$/
  if (min === null && max === null)
    return console.error('Invalid Parameter on numberRange Function')
  if (!regex.test(number)) return false
  number = parseInt(number)
  if (min === null || max === null) {
    if (min === null) if (number > max) return false
    if (max === null) if (number < min) return false
  } else if (number < min || number > max) return false
  return true
}

function isImage(ImageURL) {
  let regex = /apng|avif|gif|jpeg|jpg|png|svg|webp|bmp|ico|tiff/
  if (regex.test(ImageURL)) return true
  return false
}

function getBaseQuizzInfo() {
  let QuizzTitle = document.querySelector('#QuizzTitleInput').value
  let QuizzImageCoverURL = document.querySelector(
    '#QuizzImageCoverURLInput'
  ).value
  let QuizzQuestionQtd = document.querySelector('#QuizzQuestionQtdInput').value
  let QuizzLevelsQtd = document.querySelector('#QuizzLevelsQtdInput').value

  if (!stringSize(QuizzTitle, 20, 65))
    return alert('Por favor preencha as informações corretamente')
  if (!isImage(QuizzImageCoverURL))
    return alert('Por favor preencha as informações corretamente')
  if (!numberRange(QuizzQuestionQtd, 3, null))
    return alert('Por favor preencha as informações corretamente')
  if (!numberRange(QuizzLevelsQtd, 2, null))
    return alert('Por favor preencha as informações corretamente')
  return true
}

function renderQuestionCreation(QuizzQuestionQtd) {
  QuizzQuestionQtd = parseInt(QuizzQuestionQtd)
  let questionPlace = document.querySelector('.all-question-container')
  questionPlace.innerHTML = ''
  let aux = ''
  for (let i = 1; i <= QuizzQuestionQtd; i++) {
    aux = questionHTML
    aux = aux.replace('QuestionNumber', i.toString())
    questionPlace.innerHTML += aux
  }
}

function createLevels() {
  let questionText = document.querySelectorAll('#questionText')
  let questionColor = document.querySelectorAll('#questionColor')
  let correctAnswer = document.querySelectorAll('#correctAnswer')
  let answerImageURL = document.querySelectorAll('#answerImageURL')
}

function renderQuizzCreationScreen() {
  document.querySelector('.screen-1-desktop').classList.add('hidden')
  document.querySelector('.screen-3_1').classList.remove('hidden')
}
// Request de Quizzes
requestQuizzes()

function requestQuizzes() {
  document.querySelector('.loading-geral').classList.remove('hidden')
  document.querySelector('.screen-1-desktop').classList.add('hidden')
  let requestQuizz = axios.get(
    'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes'
  )
  requestQuizz.then(renderQuizzes)
}

function renderQuizzes(answerWithQuizzesList) {
  document.querySelector('.loading-geral').classList.add('hidden')
  document.querySelector('.screen-1-desktop').classList.remove('hidden')
  arrayListaQuizzes = answerWithQuizzesList
  let listQuizzes = document.querySelector('.all-the-quizzes .quizzes-list')
  listQuizzes.innerHTML = ''
  let imprimir = true
  for (let i = 0; i < answerWithQuizzesList.data.length; i++) {
    for (let j = 0; j < arrayDeQuizzes.length; j++) {
      if (answerWithQuizzesList.data[i].id == arrayDeQuizzes[j].data.id) {
        imprimir = false
      }
    }
    if (imprimir === true) {
      listQuizzes.innerHTML += `
              <li class="quizz" onclick="requestSelectedQuizz('${answerWithQuizzesList.data[i].id}')">
                  <img src="${answerWithQuizzesList.data[i].image}" alt="">
                  <div class="gradient"></div>
                  <h2>${answerWithQuizzesList.data[i].title}</h2>
              </li>
          `
    }
    imprimir = true
  }
  renderUserQuizzes(answerWithQuizzesList, arrayDeQuizzes)
}

function renderUserQuizzes(answerWithQuizzesList, arrayDeQuizzes) {
  let listaQuizzes = document.querySelector('.user-quizzes .quizzes-list')
  listaQuizzes.innerHTML = ''
  for (let i = 0; i < arrayListaQuizzes.data.length; i++) {
    for (let j = 0; j < arrayDeQuizzes.length; j++) {
      if (arrayDeQuizzes[j].data.id === answerWithQuizzesList.data[i].id) {
        listaQuizzes.innerHTML += `
              <li class="quizz my-quizz">
                  <img src="${answerWithQuizzesList.data[i].image}" alt="">
                  <div class="gradient" onclick="requestSelectedQuizz('${answerWithQuizzesList.data[i].id}')"></div>
                  <h2 onclick="requestSelectedQuizz('${answerWithQuizzesList.data[i].id}')">${answerWithQuizzesList.data[i].title}</h2>
              </li>
              `
      }
    }
  }
}

function requestSelectedQuizz(id) {
  const ocultar = document.querySelector('.screen-1-desktop')
  ocultar.classList.add('hidden')
  document.querySelector('.loading-geral').classList.remove('')
  const solicitacao = axios.get(
    'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/ID_DO_QUIZZ'
  )
  solicitacao.then(renderSelectedQuizz)
}

function renderSelectedQuizz(respostaComQuizz) {
  quizzSelecionado = respostaComQuizz.data
  quizzAtual = respostaComQuizz.id
  acertos = 0
  questaoAtual = 0
  document.querySelector('.loading-geral').classList.add('hidden')
  const renderizar = document.querySelector('.screen-2-quizzes')
  renderizar.classList.remove('hidden')
  renderizar.innerHTML = ''
  renderQuizzTitle()
  renderQuestions()
  setTimeout(scrollToNextQuestion, 1000)
}
//Criar o render quitzz title, questions e scroll//
