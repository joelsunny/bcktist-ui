import React from 'react';
import './App.css';
import Auth from './Auth';
import UserHome from './Home';
import List from './List'

class App extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {
      is_authenticated: false
    }

    this.LoginHandler = this.LoginHandler.bind(this)
    this.LogoutHandler = this.LogoutHandler.bind(this)
    this.checkAuth = this.checkAuth.bind(this)
    this.checkAuth()

  }

  async checkAuth() {
    let auth_status = await Auth.getAuthStatus()
    this.setState({
      is_authenticated: auth_status
    })
  }

  async LoginHandler() {
    this.setState({
      is_authenticated:true
    })
  }

  async LogoutHandler() {
    this.setState({
      is_authenticated:true
    })
  }

  render() {
    let HomeScreen;
    if (this.state.is_authenticated) {
      HomeScreen = <UserHome />;
    } else {
      HomeScreen = <Auth onLogin={this.LoginHandler} onLogout={this.LogoutHandler}/>;
    }
    return(
      <>
        {HomeScreen}
      </>
    )
  }

}

export default App;
