const BUZZ_QUIZZ_API = 'https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes'

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
  console.log(QuizzTitle)
  console.log(QuizzImageCoverURL)
  console.log(QuizzQuestionQtd)
  console.log(QuizzLevelsQtd)

  if (!stringSize(QuizzTitle, 20, 65))
    return alert('Por favor preencha as informações corretamente')
  if (!isImage(QuizzImageCoverURL))
    return alert('Por favor preencha as informações corretamente')
  if (!numberRange(QuizzQuestionQtd, 3, null))
    return alert('Por favor preencha as informações corretamente')
  if (!numberRange(QuizzLevelsQtd, 2, null))
    return alert('Por favor preencha as informações corretamente')
  console.log('Deu certoooo')
  return true
}

function renderQuizzCreationScreen() {
  document.querySelector('.screen-1-desktop').classList.add('hidden')
  document.querySelector('.screen-3_1').classList.remove('hidden')
}
