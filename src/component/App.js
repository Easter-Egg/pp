import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import { Link } from 'react-router';
import firebase from 'firebase';

class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true
    }
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          loading: false
        })
      }
    });
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p><Link to="/login">로그인 페이지로</Link></p>
        <p><Link to="/signUp">회원가입 페이지로</Link></p>
      </div>
    );
  }
}

export default App;
