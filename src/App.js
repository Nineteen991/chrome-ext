import { useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export default function App() {
  // don't use my unsplash access key
  const accessKey = "ITbWLmIlf-GE-svaxX4EHLdbAyQV1YsWcp3uyNYSGO8"
  const photosUrl = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=${accessKey}`
  // get backgrounds from unsplash api
  useEffect(() => {
    fetch(photosUrl)
      .then(res => {
        if (!res.ok) {
          throw Error("Unsplash api fetch failed")
        }
        return res.json()
      })
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }, [])

  return (
    <Container></Container>
  )
}