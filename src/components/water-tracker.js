document.querySelectorAll('.bottle').forEach((bottle) => {
  const bottleCount = document.querySelector('.bottle-count')

  // toggle the class 'empty' when the bottle is clicked
  bottle.addEventListener('click', function () {
    bottle.classList.toggle('empty')

    // grab the empty bottles length and display it
    const emptyBottles = document.getElementsByClassName('empty').length
    bottleCount.innerText = `${emptyBottles} / 8 Bottles of Water Drank Today!`
  })
})
