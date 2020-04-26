import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
//import './styles.css'

export default function Login() {
  const [name, setName] = useState('')
  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const response = await api.post('/users/login', { name })

      localStorage.setItem('token', response.data.user.token)
      localStorage.setItem('userName', response.data.user.name)
      history.push('/messages')
    } catch(err) {
      console.log(err)
      alert('Falha no login, tente novamente')
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Faça seu logon ou crie uma conta</h1>

        <input 
          placeholder="Digite seu nome"
          value={name}
          onChange={e => setName(e.target.value)} 
        />

        <button type="submit">Entrar</button>
        <Link to="/new">Não tenho cadastro</Link>
      </form>
    </div>
  )
}