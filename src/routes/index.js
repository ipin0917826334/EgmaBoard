import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import About from '../pages/About'
import ChatBoard from '../pages/Forum/ChatBoard'
import CreateRoom from '../pages/Forum/CreateRoom'
import Board from '../pages/Forum/Board'
export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/forum" component={ChatBoard} />
    <Route exact path="/createpublic" component={CreateRoom} />
    <Route exact path="/board1" component={Board} />
  </Switch>
)