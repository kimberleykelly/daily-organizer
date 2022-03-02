const bottleNodes = document.querySelectorAll('.bottle')

bottleNodes.forEach((bottle) => {
  // toggle the class 'empty' when the bottle is clicked
  bottle.addEventListener('click', () => {
    const bottleCount = document.querySelector('.bottle-count')
    const isPressed = bottle.classList.contains('empty')

    if (!isPressed) bottle.classList.add('empty')
    else bottle.classList.remove('empty')

    // since this is a non-traditional toggle button, we should update the aria pressed
    // attribute to notify the user that it has changed
    bottle.setAttribute('aria-pressed', isPressed)

    // grab the empty bottles length and display it
    const emptyBottles = document.getElementsByClassName('empty').length
    bottleCount.innerText = `${emptyBottles} / 8 Bottles of Water Drank Today!`
  })
})
