import './other'

const bar = () => {
  console.log('hello world')
}

bar()

if (module.hot) {
  module.hot.accept()
}