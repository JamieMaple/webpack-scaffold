import './other'

;(function() {
  console.log('Hello world')
})()

if (module.hot) {
  module.hot.accept()
}