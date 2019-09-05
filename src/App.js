import React from 'react';
import './App.css';
import Auth from './Auth';
import UserHome from './Home';
import List from './List'

class App extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {
      is_authenticated: Auth.getAuthStatus()
    }

  }

  render() {
    let HomeScreen;
    if (this.state.is_authenticated) {
      HomeScreen = <List />;
    } else {
      HomeScreen = <Auth />;
    }
    return(
        {HomeScreen}
    )
  }

}

export default App;
