import { useState, useEffect } from 'react'
import styled from 'styled-components'

const BoredDiv = styled.div`
  align-self: flex-end;
  padding: 3rem;
  text-shadow: 1px 1px black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media(max-width: 60rem) {
    align-self: center;
  }
`

const BoredActivity = styled.h4`
  margin: 1rem 0;
`

const BoredBtn = styled.button`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: red;
  border: 1px solid darkred;
  cursor: pointer;

  :active {
    box-shadow: .3rem .3rem black;
  }
`

export default function BoredBot() {
  const [goFetch, setGoFetch] = useState(false)
  const [message, setMessage] = useState(
    <>
      <h1>🤖 BoredBot 🤖</h1>
      <BoredActivity>Find something to do</BoredActivity>
    </>
  )

  useEffect(() => {
    if (goFetch) {
      fetch("http://www.boredapi.com/api/activity")
      .then(res => {
        if(!res.ok) {
          throw Error('Bored Bot Broken')
        }
        return res.json()
      })
      .then(data => {
        setMessage(
          <>
            <h1>🤖 Not so BoredBot 🤖</h1>
            <BoredActivity>{data.activity}</BoredActivity>
          </>
        )
        setGoFetch(false)
      })
    }
  }, [goFetch])

  return (
    <BoredDiv>
      { message }
      <BoredBtn onClick={() => setGoFetch(true)}></BoredBtn>
    </BoredDiv>
  )
}