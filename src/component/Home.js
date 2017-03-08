import React, { Component } from 'react';
import firebase from 'firebase';
import { browserHistory } from 'react-router';
import * as Auth from '../action/auth';
import '../../node_modules/react-treeview/react-treeview.css';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      authenticated: false,
      loading: true
    }
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged( (user) => {
      if(user) {
        this.setState({
          authenticated: !!user,
          email: user.email
        })
      } else {
        browserHistory.push('/');
      }
    });
  }

  componentWillUnmount () {
    this.removeListener()
  }

  handleLogout() {
    Auth.logout();
  }

  render () {
    return (
      <div>
        <h1>home</h1>
        <p>{this.state.email}</p><button onClick={this.handleLogout}>로그아웃</button>
      </div>
    )
  }
}
