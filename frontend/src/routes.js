import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'

import Login from './pages/Login'
import Messages from './pages/Messages'
import NewAccount from './pages/NewAccount'
import Participants from './pages/Participants'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/messages" component={Messages} />
        <Route path="/new" component={NewAccount} />
        <Route path="/participants" component={Participants} />
      </Switch>
    </BrowserRouter>
  )
}