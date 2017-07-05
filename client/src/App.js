import React, { Component } from 'react';
import './App.css';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

class App extends Component {

    logout(e) {
        cookie.remove('token');
        cookie.remove('headers');
        browserHistory.replace('/welcome');
    }



  render() {
      let logout;
      if (cookie.load('token')) {
          logout = 'logout';
      } else logout = 'hidden';
    return (
      <div className="App">
        <div className="App-header">
          <h2 className='app-title'>Max Rewards</h2>
        </div>
        {this.props.children}
        <button id="lo" className={logout} onClick={this.logout}>Logout</button>
      </div>
    );
    }
}

export default App;
