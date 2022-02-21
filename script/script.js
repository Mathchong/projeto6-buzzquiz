let arrayListaQuizzes = []
let arrayDeQuizzes = []
verifyIfExistDataStorage()
let quantidadeDePerguntas
let quizzEmQuestao
let quantidadeDeNiveis
let quizzCriado = {
  title: '',
  image: '',
  questions: [],
  levels: []
}

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

function renderQuizzCreationScreen() {
  document.querySelector('.screen-1-desktop').classList.add('hidden')
  document.querySelector('.quizz-creation').classList.remove('hidden')
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

