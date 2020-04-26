import React, { useState } from 'react'

export default function Messages() {
  const userName = localStorage.getItem('userName')

  return (
    <h1>Seja bem vindo, {userName}</h1>
  )
}