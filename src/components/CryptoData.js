import { useEffect, useState } from 'react'
import styled from 'styled-components'

import searchIcon from '../images/Icon.png'

const CryptoDiv = styled.div`
  margin: 1rem;
  width: 20%;
  display: flex;
  flex-direction: column;
`

const CryptoInput = styled.input`
  height: 4rem;
  width: 60%;
  padding: 1rem 3.5rem;
  background: url(${searchIcon}) no-repeat 1rem center;
  background-color: white;
  outline: none;
  border-radius: 1rem 0 0 1rem;
`

const CryptoBtn = styled.button`
  padding: 1rem 2rem;
  border-radius: 0 1rem 1rem 0;
`

const CryptoMiddle = styled.div`
  margin-top: 1rem;
  height: 4rem;
  display: flex;
`

const CryptoIcon = styled.img`
  height: 4rem;
  margin-right: 1rem;
`

const CryptoH1 = styled.h1`
  color: white;
  text-shadow: 1px 1px black;
`

export default function CryptoData() {
  const [inputValue, setInputValue] = useState('')
  const [submitValue, setSubmitValue] = useState('')
  const [cryptocurrency, setCryptocurrency] = useState({})

  function getCryptocurrency(e) {
    e.preventDefault()
    setSubmitValue(inputValue)
    setInputValue('')
    e.target.reset()
  }

  useEffect(() => {
    const coinGeckoUrl = `https://api.coingecko.com/api/v3/coins/${submitValue}`

    fetch(coinGeckoUrl)
      .then(res => {
        if (!res) {
          throw Error('Failed to fetch cryptocurrency')
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
        if(data.length > 1) {
          setCryptocurrency(() => (
            <CryptoMiddle>
              <CryptoIcon src={data[0].image.small} />
              <CryptoH1>{data[0].name}</CryptoH1>
            </CryptoMiddle>
          ))
        }
      })
      .catch(err => console.log(err))
  }, [submitValue])

  return (
      <CryptoDiv>

        <form onSubmit={e => getCryptocurrency(e)}>
          <CryptoInput 
            placeholder='Search a cryptocurrency'
            name='crypto-input'
            onChange={e => setInputValue(e.target.value)}
          />
          <CryptoBtn>Search</CryptoBtn>
        </form>

        {cryptocurrency}        

      </CryptoDiv>
  )
}