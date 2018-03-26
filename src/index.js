import img from './components/img'
import welcome from './components/welcome'
import classNames from './style.scss'

// ts

const app = document.getElementById('app')
app.classList.add(classNames.app)

app.appendChild(img)
app.appendChild(welcome)

if (module.hot) {
  module.hot.accept()
}
