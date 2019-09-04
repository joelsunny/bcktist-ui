import React from 'react';
import './App.css';
import Auth from './Auth';
import UserHome from './Home';

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
      HomeScreen = <UserHome />;
    } else {
      HomeScreen = <Auth />;
    }
    return(
        {HomeScreen}
    )
  }
  
}

export default App;
