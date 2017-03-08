import React, { Component } from 'react';
import './SignUp.css';
import * as Auth from '../action/auth';
import { browserHistory } from 'react-router';

export default class SignUp extends Component {

  constructor () {
    super();
    this.state = {
      checked: false,
      error: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({error: ''});

    if(this.state.checked)
      Auth.signUp(this.email.value, this.password.value)
        .then((data) => {
          if(data.code === 'auth/weak-password')
            this.setState({error: '보안강도 약함'});

          if(data.code === 'auth/email-already-in-use')
            this.setState({error: '이미 있는 사용자'})

          if(data.email)
            browserHistory.push('/');
        });

    else
      this.password_check.focus();
  }

  handleChanged = (e) => {
    this.setState(
      {checked: this.password.value === this.password_check.value}, function() {console.log(this.state.checked)}
    );
  }

  render() {
    return (
      <div>
        <h1>회원가입</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="input" ref={(email) => this.email = email} placeholder="이메일"/>
          <input type="password" ref={(password) => this.password = password} placeholder="비밀번호"/>
          <input type="password" ref={(password_check) => this.password_check = password_check} onChange={this.handleChanged} placeholder="비밀번호 확인"/>
          <input type="submit" value="회원가입" /> {this.password_check? this.state.checked? '같음' : '다름' : ''} / {this.state.error}
        </form>
      </div>
    )
  }
}
