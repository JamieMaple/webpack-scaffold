import classNames from './welcome.scss'
import data from './data.json'

const div = document.createElement('div')
div.classList.add(classNames.wrapper)

div.innerHTML = `
  <h1>Welcome</h1>
  <h2>© webpack-cli made by ${data.contributor}</h2>
  <h3 class="repo"><a target="_blank" href="${data.repo}">repo link</a></h3>
  <h3 class="blog"><a target="_blank" href="${data.blog}">Maple's blog</a></h3>
`

export default div
