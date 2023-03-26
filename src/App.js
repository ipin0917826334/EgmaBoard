import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Routing from './routes'

class App extends Component {
  render() {
    return (
      <div className="my-app">
        <header className="bg-red shadow-sm" role="navigation" aria-label="main navigation">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
          <h1 className="text-3xl font-bold text-gray-800">Egma Board</h1>
        </div>
        <nav className="flex space-x-4">
                <NavLink exact to="/" activeClassName="is-active" className="navbar-item">Home</NavLink>
                <NavLink to="/forum" activeClassName="is-active" className="navbar-item">Forum</NavLink>
                <NavLink to="/about" activeClassName="is-active" className="navbar-item">About</NavLink>
                </nav>
          </div>
        </header>

        <Routing />
      </div>
    )
  }
}

export default App
