let questionNumber = 0
let questionHTML = `<div class="question-info-container">
<div class="area">
  <div class="question-number">
    <h2>Pergunta QuestionNumber</h2>
    <ion-icon name="create-outline"></ion-icon>
  </div>
  <div class="question-form">
    <input class="input1" type="text" placeholder="Texto da Pergunta" name="Pergunta" id="questionText">
    <input class="input-url" type="text" placeholder="Cor de Fundo da Pergunta" name="Pergunta" id="questionColor">
    <h2>Resposta Correta</h2>
    <input class="input1" type="text" placeholder="Resposta Correta" name="Pergunta" id="correctAnswer">
    <input class="input-url" type="text" placeholder="URL da Imagem" name="Pergunta" id="answerImageURL">
    <h2>Respostas Incorretas</h2>
    <input class="input1" type="text" placeholder="Resposta Incorreta1" name="Pergunta" id="wrongAnswer1">
    <input class="input-url" type="text" placeholder="URL da Imagem1" name="Pergunta" id="answerImageURL">
    <input class="input1" type="text" placeholder="Resposta Incorreta2" name="Pergunta" id="wrongAnswer2-3">
    <input class="input-url" type="text" placeholder="URL da Imagem2" name="Pergunta" id="answerImageURL">
    <input class="input1" type="text" placeholder="Resposta Incorreta3" name="Pergunta" id="wrongAnswer2-3">
    <input class="input-url" type="text" placeholder="URL da Imagem3" name="Pergunta" id="answerImageURL">
  </div>
</div>
</div>`

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
  
  questionNumber = QuizzQuestionQtd
  renderQuestionCreation(QuizzQuestionQtd)

  let quizzCreationScreen = document.querySelector('.quizz-creation')
  let questionCreation = document.querySelector('.question-creation')

  quizzCreationScreen.classList.add('hidden')
  questionCreation.classList.remove('hidden')

  return true;
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

function verifyLevelsInfo() {
  let questionText = document.querySelectorAll('#questionText')
  let questionColor = document.querySelectorAll("#questionColor")
  let correctAnswer = document.querySelectorAll("#correctAnswer")
  let wrongAnswer1 = document.querySelectorAll("#wrongAnswer1")
  let wrongAnswer2 = document.querySelectorAll("#wrongAnswer2-3")
  let answerImageURL = document.querySelectorAll("#answerImageURL")

  console.log(questionText);
  console.log(questionColor);
  console.log(correctAnswer);
  console.log(wrongAnswer1);
  console.log(wrongAnswer2);
  console.log(answerImageURL);

  let indexWrongAnswer = 0;
  let indexUrl = 0;

  for (let i = 0; i < questionNumber; i++) {

    if (!stringSize(questionText[i].value,20,100)) return alert('Por favor preencha as informações corretamente')
    if (!isHexColor(questionColor[i].value)) return alert('Por favor preencha as informações corretamente')
    if (correctAnswer[i].value === null || correctAnswer[i] === "") return alert('Por favor preencha as informações corretamente')
    if (!isImage(answerImageURL[indexUrl].value)) return alert('Por favor preencha as informações corretamente')
    indexUrl += 1
    if (wrongAnswer1[i].value === null || wrongAnswer1[i].value === "") return alert('Por favor preencha as informações corretamente')
    if (!isImage(answerImageURL[indexUrl].value)) return alert('Por favor preencha as informações corretamente')
    indexUrl += 1
    if (wrongAnswer2[indexWrongAnswer].value == null || wrongAnswer2[indexWrongAnswer].value == "") { }
    else if (!isImage(answerImageURL[indexUrl].value)) return alert('Por favor preencha as informações corretamente')
    indexUrl += 1
    indexWrongAnswer += 1
    if (wrongAnswer2[indexWrongAnswer].value == null || wrongAnswer2[indexWrongAnswer].value == "") { }
    else if (!isImage(answerImageURL[indexUrl].value)) return alert('Por favor preencha as informações corretamente')
    indexWrongAnswer += 1
    indexUrl += 1
  }

  let levelCrationScreen = document.querySelector(".level-creation")
  levelCrationScreen.classList.remove("hidden")
  let questionCreation = document.querySelector('.question-creation')
  questionCreation.classList.add('hidden')
}
