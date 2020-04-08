import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

// Importing AuthenticatedRoutes
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

// Importing Song Routes
import Songs from '../routes/Songs'
import Song from '../routes/Song'
import SongCreate from '../routes/SongCreate'
import SongEdit from '../routes/SongEdit'

// import SongPlayer from '../SongPlayer/SongPlayer'

import Home from '../Home/Home'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/songs-create' render={() => (
            <SongCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/songs/:id/edit' render={({ match }) => (
            <SongEdit msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} exact path='/songs' render={() => (
            <Songs msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )}/>
          <AuthenticatedRoute user={user} exact path='/songs/:id' render={({ match }) => (
            <Song msgAlert={this.msgAlert} user={user} match={match} />
          )}/>
          <AuthenticatedRoute user={user} exact path='/home' render={() => (
            <Home msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
