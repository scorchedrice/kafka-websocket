import kafka from './assets/kafka.svg'
import './App.css'
import {io} from "socket.io-client";
import {useEffect, useState} from "react";

function App() {
  const URL = import.meta.env.VITE_SOCKET_URL
  const socket = io(URL)
  const [receivedData, setReceivedData] = useState<any>(null)
  useEffect(() => {
    socket.on('connect', () => console.log('Connected!'))
    socket.on('kafka', (data) => {
      setReceivedData(data)
    })
  })
  return (
    <>
      <div>
        <a href="https://scorchedrice.github.io" target="_blank">
          <img src={kafka} className="logo" alt="Kafka logo" />
        </a>
      </div>
      <h1>Kafka Data Receive</h1>
      {receivedData ? <div className="card">
        <p>코인명 : {receivedData.coinName}</p>
        <p>거래된 코인 수 : {receivedData.numOfCoin}코인</p>
        <p>총 거래액 : {receivedData.price * receivedData.numOfCoin}포인트</p>
      </div> : null}
    </>
  )
}

export default App
