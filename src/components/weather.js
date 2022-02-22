const displayWeatherSection = document.querySelector('.weather-section')

window.addEventListener('load', () => {
  displayWeatherSection.style.display = 'none'

  let lat
  let lng

  // gets the users current geolocation position
  // grabs the lat/lng to make a request to the weatherbit API
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lng = position.coords.longitude
      lat = position.coords.latitude

      const url = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${lng}&lat=${lat}`

      getWeatherData(url)
    })
  }
})

// await the response from the API
// if the promise is succesful - await the JSON response, else throw an error

const getWeatherData = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
        'x-rapidapi-key': '3d2577eabfmsh7d2a057ee521bf6p1f2c4ajsn2b884c0c0f45',
      },
    })
    if (response.ok) {
      const jsonResponse = await response.json()
      displayWeather(jsonResponse)
    } else {
      throw new Error('request failed')
    }
  } catch (err) {
    console.error('ERROR', err)
  }
}

// display weather data to the DOM

function displayWeather(response) {
  const displayTimezone = document.querySelector('.timezone')
  const displayCity = document.querySelector('.city')
  const displayTemp = document.querySelector('.temp')
  const weatherSummary = document.querySelector('.summary')
  const displaySunrise = document.querySelector('.sunrise')
  const displaySunset = document.querySelector('.sunset')
  const displayWindSpeed = document.querySelector('.wind-speed')
  const displayVisibility = document.querySelector('.visibility')

  // displays the weather section only when we have a succesful response from the API
  displayWeatherSection.style.display = 'block'

  // pull out the data we need from the API response
  const { timezone, city_name, sunrise, sunset, vis, weather, temp, wind_spd } =
    response.data[0]
  const { description } = weather

  // set the text content of each DOM element
  displayTimezone.textContent = timezone
  displayCity.textContent = city_name
  displayTemp.textContent = `${temp}°`
  weatherSummary.textContent = description
  displaySunset.textContent = `Sunset: ${sunset}`
  displaySunrise.textContent = `Sunrise: ${sunrise}`
  displayWindSpeed.textContent = `Wind speed: ${wind_spd} m/s`
  displayVisibility.textContent = `Visibility: ${vis} KM`
}
