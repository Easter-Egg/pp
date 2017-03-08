import React, { Component } from 'react';
import logo from '../logo.svg';
import './Login.css';
import './App.css';
import * as Auth from '../action/auth';
import { browserHistory } from 'react-router';


class Login extends Component {

  constructor () {
    super();
    this.state = {
      error: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({error: ''});
    Auth.login(this.email.value, this.password.value)
          .then(() => { browserHistory.push('/home'); })
            .catch((error) => {
              if(error) {
                console.log(error);
                this.setState({error: '이메일 혹은 비밀번호가 틀립니다.'});
              }
            });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={this.handleSubmit}>
          <input type="email" ref={(val) => this.email = val} placeholder="이메일"/>
          <input type="password" ref={(val) => this.password = val} placeholder="비밀번호"/>
          <input type="submit" value="로그인"/>
          <p>{this.state.error}</p>
        </form>
      </div>
    );
  }
}

export default Login;
