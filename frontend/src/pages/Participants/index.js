import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import './styles.css'

export default function Participants() {
  const [participants, setParticipants] = useState([])
  const history = useHistory()

  useEffect(() => {
    api.get('/participants').then((response) => {
      setParticipants(response.data)
    })
  }, [])

  function handleBack() {
    history.push('/messages')
  }

  return (
    <div className="content">
      <h1>Lista de participantes:</h1>
      <ul>

        {participants.map((participant) => {
          return (
            <li className="participant" key={participant}>
              <p>{participant}</p>
            </li>
          )
        })}

      </ul>
      <button onClick={handleBack} type="button" className="button">Voltar</button>
    </div>
  )
}