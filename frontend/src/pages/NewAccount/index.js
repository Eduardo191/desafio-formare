import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import './styles.css'

export default function NewAccount() {
  const [name, setName] = useState('')
  const history = useHistory()

  async function handleCreate(e) {
    e.preventDefault()

    try {
      const response = await api.post('/users', { name })
      localStorage.setItem('token', response.data.user.token)
      localStorage.setItem('userName', response.data.user.name)
      history.push('/')
    } catch(err) {
      alert('Falha na criaçao da conta, tente novamente')
    }
  }

  return (
    <div className="content">
      <form className="new-account" onSubmit={handleCreate}>
        <h1>Crie sua conta aqui</h1>

        <input 
          placeholder="Digite seu nome"
          value={name}
          onChange={e => setName(e.target.value)} 
        />

        <button className="button" type="submit">Criar</button>
        <Link to="/">Voltar para tela de login</Link>
      </form>
    </div>
  )
}