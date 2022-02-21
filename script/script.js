const BUZZ_QUIZZ_API =
  'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/'

let existeQuizzesCriados = false
let quizzSelecionado = null
let count = 0
let acertos = 0
let niveis = []
let qtdDePerguntas = null
let editandoQuizz = ""
requestQuizzes()

function requestQuizzes() {
  renderLoadingScreen()

  const promessa = axios.get(BUZZ_QUIZZ_API)

  promessa.then(resposta => {
    disableLoadingScreen()

    const quizzes = document.querySelector('.quizzes')
    const quizzes__criados = document.querySelector('.quizzes-created')
    quizzes.innerHTML = ''
    quizzes__criados.innerHTML = ''

    if (localStorage.length > 0) {
      document.querySelector('.create-quizzes').classList.add('hidden')
      document.querySelector('.created-quizzes').classList.remove('hidden')
      existeQuizzesCriados = true
    } else {
      document.querySelector('.create-quizzes').classList.remove('hidden')
      document.querySelector('.created-quizzes').classList.add('hidden')
      existeQuizzesCriados = false
    }

    resposta.data.forEach(quizz => {
      quizzes.innerHTML += `
            <article data-identifier="quizz-card" id="${quizz.id}" onclick="renderScreen2(this)" class="quizz">
            <div class="gradient"></div>
            <img src="${quizz.image}" alt="quizz">
            <p>${quizz.title}</p>
            </article>
            `

      if (existeQuizzesCriados) {
        for (let i = 0; i < 100; i++) {
          if (localStorage.getItem(`objeto${i}`) !== null) {
            let localQuizzString = localStorage.getItem(`objeto${i}`)
            let localQuizz = JSON.parse(localQuizzString)
            if (quizz.id === localQuizz.id) {
              quizzes__criados.innerHTML += `
                            <article data-identifier="quizz-card" id="${quizz.id}" class="quizz">
                            <div class="gradient" onclick="renderScreen2(this.parentNode)"></div>
                            <img src="${quizz.image}" alt="quizz">
                            <div class="edit-delete">
                            <ion-icon name="create-outline" onclick="editQuizz(this)"></ion-icon>
                            <ion-icon name="trash-outline" onclick="deleteQuizz(this)"></ion-icon>
                            </div>
                            <p>${quizz.title}</p>
                            </article>
                            `
            }
          }
        }
      }
    })
  })

  promessa.catch(erro => {
    console.log(erro)
    alert('Alguma coisa deu ruim!')
  })
}

function renderScreen2(quizz) {
  renderLoadingScreen()

  const screen1 = document.querySelector('.screen_1_Desktop')
  const screen2 = document.querySelector('.screen_2')
  const screen3 = document.querySelector('.screen-3_1')
  screen1.classList.add('hidden')
  screen2.classList.remove('hidden')
  screen3.classList.add('hidden')

  quizzSelecionado = quizz

  const promessa = axios.get(BUZZ_QUIZZ_API + `${quizz.id}`)

  promessa.then(resposta => {
    disableLoadingScreen()

    const banner = document.querySelector('.banner')
    banner.classList.remove('hidden')
    let perguntas = resposta.data.questions

    banner.innerHTML += `
            <div class="gradient"></div>
            <img src="${resposta.data.image}" alt="banner">
            <p>${resposta.data.title}</p>
            `

    renderQuestions(perguntas)

    niveis = resposta.data.levels
    qtdDePerguntas = perguntas.length
  })

  promessa.catch(erro => {
    console.log(erro)
    alert('Ops! Não foi possível abrir o quizz.')
  })
}

function renderQuestions(perguntas) {
  const screen2 = document.querySelector('.screen_2')
  let indiceDaPergunta = 1

  perguntas.forEach(pergunta => {
    let respostas = pergunta.answers

    screen2.innerHTML += `
        <div data-identifier="question" id="question_${indiceDaPergunta}" class="question">
        <div class="question-title" style="background-color: ${pergunta.color};">${pergunta.title}</div>
        </div>
        `

    const perguntaGerada = document.getElementById(
      `question_${indiceDaPergunta}`
    )

    respostas = shufflerArray(respostas)

    renderAnswers(respostas, perguntaGerada)

    indiceDaPergunta++
  })
}

function renderAnswers(respostas, perguntaGerada) {
  respostas.forEach(resposta => {
    let isRespostaCorreta = ''

    if (resposta.isCorrectAnswer) {
      isRespostaCorreta = 'correta'
    } else {
      isRespostaCorreta = 'errada'
    }

    perguntaGerada.innerHTML += `
        <div data-identifier="answer" class="question-answer ${isRespostaCorreta}" onclick="selectAnswer(this)">
        <img src=${resposta.image} alt="">
        <p>${resposta.text}</p>
        </div>
        `
  })
}

function selectAnswer(respostaEscolhida) {
  count++
  const pergunta = respostaEscolhida.parentNode
  const respostas = pergunta.querySelectorAll('.question-answer')

  showAnswers(respostas, respostaEscolhida)

  contRights(respostaEscolhida)

  setTimeout(() => {
    const proximaPergunta = pergunta.nextElementSibling

    if (count !== qtdDePerguntas) {
      proximaPergunta.scrollIntoView()
    } else {
    }
  }, 2000)

  const screen2 = document.querySelector('.screen_2')

  let porcentagemDeAcertos = (acertos / qtdDePerguntas) * 100
  porcentagemDeAcertos = Math.round(porcentagemDeAcertos)

  if (count === qtdDePerguntas) {
    showResult(screen2, porcentagemDeAcertos)
  } else {
  }
}

function showAnswers(respostas, respostaEscolhida) {
  respostas.forEach(resposta => {
    resposta.classList.add('answers')
    resposta.onclick = null
    if (resposta !== respostaEscolhida) {
      resposta.classList.add('make-opacity')
    } else {
    }
  })
}

function contRights(respostaEscolhida) {
  if (respostaEscolhida.classList.contains('correta')) {
    acertos++
  } else {
  }
}

function showResult(screen2, porcentagemDeAcertos) {
  let indiceNivel = null
  let valoresNiveis = []
  let valorNivelAtingido = null

  niveis.forEach(nivel => {
    valoresNiveis.push(parseInt(nivel.minValue))
  })

  valoresNiveis.sort(function (a, b) {
    return a - b
  })

  valoresNiveis.forEach(valor => {
    if (porcentagemDeAcertos >= valor) {
      valorNivelAtingido = valor
    } else {
    }
  })

  niveis.forEach(nivel => {
    if (nivel.minValue === valorNivelAtingido) {
      indiceNivel = niveis.indexOf(nivel)
    } else {
    }
  })

  screen2.innerHTML += `
    <div data-identifier="quizz-result" class="quizz-result">
    <div class="quizz-resulttitle">${niveis[indiceNivel].title}</div>
    <img src="${niveis[indiceNivel].image}" alt="">
    <p>${niveis[indiceNivel].text}</p>
    </div>
    
    <button class="reset-quizz" onclick="resetQuizz()">Reiniciar Quizz</button>
    <button class="home" onclick="toHome()">Voltar para a página inciial</button>
    `
  const resultadoQuizz = document.querySelector('.quizz-result')
  setTimeout(() => {
    resultadoQuizz.scrollIntoView()
  }, 2000)
}

function resetQuizz() {
  resetLevelVariables()

  const screen2 = document.querySelector('.screen_2')
  screen2.innerHTML = ''

  renderScreen2(quizzSelecionado)
}

function toHome() {
  resetLevelVariables()

  const tela1 = document.querySelector('.screen_1_Desktop')
  const tela2 = document.querySelector('.screen_2')
  const banner = document.querySelector('.banner')
  const main = document.querySelector('main')

  tela2.innerHTML = ''
  banner.innerHTML = ''

  tela1.classList.remove('hidden')
  tela2.classList.add('hidden')
  document.querySelector('.banner').classList.add('hidden')

  main.scrollIntoView(true)
  windowReaload()
}

function resetLevelVariables() {
  count = 0
  acertos = 0
  niveis = []
  qtdDePerguntas = null
}

function renderLoadingScreen() {
  const carregando = document.querySelector('.loading')
  carregando.classList.remove('hidden')
}

function disableLoadingScreen() {
  const carregando = document.querySelector('.loading')
  carregando.classList.add('hidden')
}

function shufflerArray(minhaArray) {
  minhaArray.sort(comparador)

  function comparador() {
    return Math.random() - 0.5
  }

  return minhaArray
}

function renderScreen3() {
  const tela1 = document.querySelector('.screen_1_Desktop')
  const tela3 = document.querySelector('.screen-3_1')
  tela1.classList.add('hidden')
  tela3.classList.remove('hidden')

  if (editandoQuizz) {
    document.getElementById('QuizzTitleInput').value = editandoQuizzObj.title
    document.getElementById('QuizzImageCoverURLInput').value =
      editandoQuizzObj.image
    document.getElementById('QuizzQuestionQtdInput').value =
      editandoQuizzObj.questions.length
    document.getElementById('QuizzLevelsQtdInput').value =
      editandoQuizzObj.levels.length
  }
}

function windowReaload() {
  window.location.reload()
}

function voltarTelaInicial() {
  document.querySelector('.tela-1').classList.remove('escondido')
  document.querySelector('.tela-2').classList.add('escondido')
  document.querySelector('.tela-3').classList.add('escondido')
  window.location.reload()
}

function deleteQuizz(element) {
  renderLoadingScreen()

  if (window.confirm('Você realmente quer deletar esse quizz?')) {
    let quizz = element.parentNode.parentNode
    let key = null
    let storageNumber = null
    for (let i = 0; i < 100; i++) {
      if (localStorage.getItem(`objeto${i}`) !== null) {
        let quizzAPI = JSON.parse(localStorage.getItem(`objeto${i}`))
        if (parseInt(quizz.id) === quizzAPI.id) {
          key = quizzAPI.key
          storageNumber = i
        }
      }
    }
    const promessa = axios.delete(BUZZ_QUIZZ_API + `${quizz.id}`, {
      headers: { 'Secret-Key': key }
    })
    promessa.then(() => {
      disableLoadingScreen()

      localStorage.removeItem(`objeto${storageNumber}`)
      window.location.reload()
    })
    promessa.catch(() => {
      alert('algo de errado')
    })
  }
}

function editQuizz(element) {
  renderLoadingScreen()

  let quizz = element.parentNode.parentNode
  let quizzObj = null
  const promessa = axios.get(BUZZ_QUIZZ_API)
  promessa.then(resposta => {
    disableLoadingScreen()

    for (let i = 0; i < resposta.data.length; i++) {
      if (resposta.data[i].id === parseInt(quizz.id)) {
        quizzObj = resposta.data[i]
      }
    }
    editandoQuizz = true
    editandoQuizzObj = quizzObj
    renderScreen3()
  })
}
