const weatherSectionContainer = document.querySelector('.row-2')

window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const url = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}`

      getWeatherData(url)
    })
  }
})

const getWeatherData = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': process.env.RAPIDAPIHOST,
        'x-rapidapi-key': process.env.RAPIDAPIKEY,
      },
    })

    if (!response.ok) throw new Error(response.statusText)

    const jsonResponse = await response.json()
    displayWeather(jsonResponse)
  } catch (err) {
    // creates an API error message container and prepends it to ".row-2" DOM node
    const container = document.createElement('div')
    container.classList.add('error-loading-weather')

    const errorMessage = document.createElement('h1')
    errorMessage.innerText = 'Unable to fetch weather...'
    errorMessage.style = 'font-size: 30px'

    const errorMessageFromAPI = document.createElement('h2')
    errorMessageFromAPI.style = 'font-size: 20px'
    errorMessageFromAPI.innerText = err.toString()

    container.appendChild(errorMessage)
    container.appendChild(errorMessageFromAPI)
    weatherSectionContainer.prepend(container)
  }
}

function displayWeather(response) {
  const displayWeatherSection = document.querySelector('.weather-section')
  const displayTimezone = document.querySelector('.timezone')
  const displayCity = document.querySelector('.city')
  const displayTemp = document.querySelector('.temp')
  const weatherSummary = document.querySelector('.summary')
  const displaySunrise = document.querySelector('.sunrise')
  const displaySunset = document.querySelector('.sunset')
  const displayWindSpeed = document.querySelector('.wind-speed')
  const displayVisibility = document.querySelector('.visibility')

  displayWeatherSection.style.display = 'flex'

  const { timezone, city_name, sunrise, sunset, vis, weather, temp, wind_spd } =
    response.data[0]
  const { description } = weather

  displayTimezone.textContent = timezone
  displayCity.textContent = city_name
  displayTemp.textContent = `${temp}°`
  weatherSummary.textContent = description
  displaySunset.textContent = `Sunset: ${sunset}`
  displaySunrise.textContent = `Sunrise: ${sunrise}`
  displayWindSpeed.textContent = `Wind speed: ${wind_spd} m/s`
  displayVisibility.textContent = `Visibility: ${vis} KM`
}
