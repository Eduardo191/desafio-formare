import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import api from '../../services/api'
import './styles.css'

export default function Messages() {
  const userName = localStorage.getItem('userName')
  const token = localStorage.getItem('token')
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const history = useHistory()

  useEffect(() => {
    api.get('/messages/all').then(response => {
      setMessages(response.data)
    })
  }, [])

  async function handleDeleteMessage(id) {
    try {
      await api.delete(`/messages/all/${id}`)

      setMessages(messages.filter(message => message._id !== id))
    } catch (err) {
      alert('Erro ao deletar mensagem, tente novamente')
    }
  }

  function handleLogout(auth) {
    try {
      api.post('/users/logout', {
        headers: {
          Authorization: auth
        }
      })

      history.push('/')
    } catch (err) {
      alert('Problema ao realizar o logout, tente novamente')
      console.log(err);
      console.log(token)
    }
  }

  async function handleNewMessage() {
    try {
      await api.post('/messages', { text, ownerName: userName, date: moment().format('DD/MM/YYYY HH:mm:ss') }, {
        headers: {
          Authorization: token
        }
      })

      window.location.reload()
    } catch (err) {
      alert('Erro ao enviar mensagem, tente novamente')
    }
  }

  return (
    <div className="content">
      <h1>Seja bem vindo(a), {userName}</h1>
      <button className="button" type="button" onClick={() => handleLogout(token)}>Logout</button>
      <h2>Mensagens:</h2>

      <ul>
        {messages.map((message) => {
          return (
            <li className="message" key={message._id}>
              <p>{message.ownerName}: {message.text}</p>
              <p>Enviada em: {message.date}</p>
              <button className="button" type="button" onClick={() => handleDeleteMessage(message._id)}>Deletar</button>
            </li>
          )
        })}

        <input placeholder="Digite aqui sua mensagem" value={text} onChange={e => setText(e.target.value)} />
        <button className="button" type="button" onClick={() => handleNewMessage()}>Enviar mensagem</button>
      </ul>
    </div>
  )
}