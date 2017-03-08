import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import Login from './component/Login';
import SignUp from './component/SignUp';
import Home from './component/Home';
import './index.css';
import { Router, Route, browserHistory } from 'react-router';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBFBXGOcHrSec5-ivCgRkkuol1Xrot3B1Q",
  authDomain: "plz-perform.firebaseapp.com",
  databaseURL: "https://plz-perform.firebaseio.com",
  storageBucket: "plz-perform.appspot.com",
  messagingSenderId: "490024477881"
};

firebase.initializeApp(config);

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/login" component={Login} />
    <Route path="/signUp" component={SignUp} />
    <Route path="/home" component={Home} />
  </Router>, document.getElementById('root')
);
