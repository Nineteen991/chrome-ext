import { useEffect, useState } from 'react'
import styled from 'styled-components'

import searchIcon from '../images/Icon.png'

const CryptoDiv = styled.div`
  margin: 1rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  @media(max-width: 60rem) {
    width: 80%;
  }
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

const CryptoBottom = styled.div`
  margin-top: 1rem;
  height: 4rem;
  display: flex;
  flex-direction: column;
`

const CryptoH2 = styled.h2`
  color: white;
  text-shadow: 1px 1px black;
  font-style: italic;
`

const Note = styled.p`
  margin-top: 1rem;
  color: #eee;
`

export default function CryptoData() {
  const [inputValue, setInputValue] = useState('')
  const [submitValue, setSubmitValue] = useState('')
  const [cryptocurrency, setCryptocurrency] = useState(null)

  function getCryptocurrency(e) {
    e.preventDefault()
    setSubmitValue(inputValue)
    setInputValue('')
    e.target.reset()
  }

  const cryptoInfo = data => {
    return (
      <>
        <CryptoMiddle>
          <CryptoIcon src={data.image.small} />
          <CryptoH1>{data.name}</CryptoH1>
        </CryptoMiddle>
        <CryptoBottom>
          <CryptoH2>
            Market Cap: {
              data.market_data.market_cap.usd.toLocaleString("en-US", {
                style: "currency", 
                currency: "USD", 
                maximumFractionDigits: 0
              })
            }
          </CryptoH2>

          <CryptoH2>
            Price: {
              data.market_data.current_price.usd.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 8
              })
            }
          </CryptoH2>

          <CryptoH2>
            24 Hour High: {
              data.market_data.high_24h.usd.toLocaleString("en-US", {
                style: "currency", 
                currency: "USD", 
                maximumFractionDigits: 8
              })
            }
          </CryptoH2>

          <CryptoH2>
            24 Hour Low: {
              data.market_data.low_24h.usd.toLocaleString("en-US", {
                style: "currency", 
                currency: "USD", 
                maximumFractionDigits: 8
              })
            }
          </CryptoH2>
        </CryptoBottom>
      </>
    )
  }

  useEffect(() => {
    const coinGeckoUrl = `https://api.coingecko.com/api/v3/coins/${submitValue}`

    fetch(coinGeckoUrl)
      .then(res => {
        if (!res.ok) {
          throw Error('Failed to fetch cryptocurrency')
        } 
        return res.json()
      })
      .then(data => {
        if(data.length > 1) {
          setCryptocurrency(() => cryptoInfo(data[0]))
        } else if (data) {
          setCryptocurrency(() => cryptoInfo(data))
        } 
      })
      .catch(err => console.log(err))
  }, [submitValue])

  return (
      <CryptoDiv>

        <form onSubmit={e => getCryptocurrency(e)}>
          <CryptoInput 
            placeholder='Search a cryptocurrency'
            name='cryptoInput'
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
          />
          <CryptoBtn>Search</CryptoBtn>
        </form>

        <Note>
          Note: for crypto names that are longer than 1 word, you 
          may need to either use a - or combine into 1 word
        </Note>

        {cryptocurrency}        

      </CryptoDiv>
  )
}