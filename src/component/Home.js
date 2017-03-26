import React, { Component } from 'react';
import firebase from 'firebase';
import { browserHistory } from 'react-router';
import * as Auth from '../action/auth';
import Masonry from 'react-masonry-component';

import './Home.css';

var masonryOptions = {
  transitionDuration: 0,
  fitWidth: true,
};

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
          email: user.email,
          loading: false
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
    var cards = [
      {
        key: '1',
        title: '사계 피아노 반주자 구합니다',
        content: '로렘 입섬',
        status: '조율 중',
        category: '0',
      },

      {
        key: '2',
        title: '자작곡인데 노래 불러주신 분 찾습니다.',
        content: '로렘 입섬 로렘 입섬',
        status: '구하는 중',
        category: '1',
      },

      {
        key: '3',
        title: '자작곡인데 노래 불러주신 분 찾습니다.',
        content: '로렘 입섬 로렘 입섬',
        status: '구하는 중',
        category: '1',
      },

      {
        key: '4',
        title: '자작곡인데 노래 불러주신 분 찾습니다.',
        content: '로렘 입섬 로렘 입섬',
        status: '구하는 중',
        category: '1',
      },

      {
        key: '5',
        title: '자작곡인데 노래 불러주신 분 찾습니다.',
        content: '로렘 입섬 로렘 입섬',
        status: '구하는 중',
        category: '1',
      },

      {
        key: '6',
        title: '자작곡인데 노래 불러주신 분 찾습니다.',
        content: '로렘 입섬 로렘 입섬',
        status: '구하는 중',
        category: '1',
      },

      {
        key: '7',
        title: '자작곡인데 노래 불러주신 분 찾습니다.',
        content: '로렘 입섬 로렘 입섬',
        status: '구하는 중',
        category: '1',
      },

      {
        key: '8',
        title: '자작곡인데 노래 불러주신 분 찾습니다.',
        content: '로렘 입섬 로렘 입섬',
        status: '구하는 중',
        category: '1',
      },
    ];

    var childElements = cards.map(function(card){
      const randomHeight = Math.random() * (250 - 400) + 250;

      const style = {
        height: randomHeight,
      }

      return (
        <div className="pp-list-card" key={card.key} style={style}>
          card {card.key}
        </div>
      );
    });

    return (
        <div className="container">
          <header>
            <h1>HOME</h1>
            <div>
              {this.state.email} <button onClick={this.handleLogout}>Logout</button>
            </div>
          </header>

          <section className="content">
            <main>
              {this.state.loading ? (
                <div>로딩 중...</div>
              ) : (
                <Masonry 
                  className={'pp-list'} // default ''
                  elementType={'div'} // default 'div'
                  options={masonryOptions} // default {}
                  disableImagesLoaded={false} // default false
                  updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                >
                  {childElements}
                </Masonry>
              )}
            </main>
          </section>

          <footer>
            CopyRight
          </footer>
      </div>
    )
  }
}
