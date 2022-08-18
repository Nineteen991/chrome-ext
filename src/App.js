import { useEffect } from 'react'
import styled from 'styled-components'

import GlobalStyle from './styles/GlobalStyle'
import defaultBg from './images/Calm-Desktop-Wallpaper.jpg'
import CryptoData from './components/CryptoData'

const Container = styled.div`
  height: 100vh;
  background: url(${defaultBg}) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  color: white;
  text-shadow: 1px 1px 2rem #aaa;
  font-size: 1.6rem;
  
  display: flex;
  flex-direction: column;
`

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default function App() {
  // don't use my unsplash access key; I only get so many api calls / hour
  const accessKey = "ITbWLmIlf-GE-svaxX4EHLdbAyQV1YsWcp3uyNYSGO8"
  const photosUrl = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=${accessKey}`

  // to prevent rate limiting with the unsplash api
  // const photosUrl = 'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
  
  const containerBg = document.getElementById('container')

  // get backgrounds from unsplash api
  useEffect(() => {
    fetch(photosUrl)
      .then(res => {
        console.log(res)
        if (!res.ok) {
          throw Error("Unsplash api fetch failed")
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
        containerBg.style.backgroundImage = `url("${data.urls.raw}")`
      })
      .catch(err => {
        console.log(err) 
      })
  }, [])

  return (
    <>
      <GlobalStyle />
      <Container id="container">
        <TopRow>
          <CryptoData />
        </TopRow>
      </Container>
    </>
  )
}