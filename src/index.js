import './components/todolist.js'
import './components/date.js'
import './components/water-tracker.js'
import './components/weather.js'
import '../src/style.css'

const toggleButton = document.getElementById('toggle')
toggleButton.addEventListener('click', function () {
  document.body.classList.toggle('light-mode')
})
