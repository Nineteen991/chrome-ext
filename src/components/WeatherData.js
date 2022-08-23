import { useState, useEffect } from 'react'
import styled from 'styled-components'

const WeatherDiv = styled.div`
  margin: 1rem;
  color: white;
  text-shadow: 1px 1px black;
  font-size: 2rem;
`

const Toprow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const WeatherIcon = styled.img`
  height: 4rem;
  width: 4rem;
`

const WeatherType = styled.div`
  text-align: center;
  padding: 0 1rem;
`

export default function WeatherData() {
  const [weatherData, setWeatherData] = useState('')
  
  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude
      const long = position.coords.longitude
      const api = "04748b295efc1ca76fef00f5772ae845"
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${api}`)
        .then(res => {
          if (!res.ok) {
            throw Error('Failed to fetch weather data')
          }
          return res.json()
        })
        .then(data => {
          // get the different weather icons
          const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          setWeatherData(() => (
            <WeatherDiv>
              <Toprow>
                <WeatherIcon src={iconUrl} alt={data.weather[0].description} />
                <span>{Math.round(data.main.temp)}°F</span>
              </Toprow>
              <WeatherType>{data.name}</WeatherType>
            </WeatherDiv>
          ))
        })
    })
  }, [])

  return (
    <>
      {weatherData}
    </>
  )
}