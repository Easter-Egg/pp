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
      loading: true,
      posts: [],
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

    const db = firebase.database();
    const postsRef = db.ref().child('posts');

    postsRef.limitToLast(10).once('value', snapshot => {
      let posts = this.state.posts.slice();

      snapshot.forEach(function(data) {
        posts.push(data.val());
      });

      this.setState({posts: posts});
      console.log(this.state.posts)
    });
  }

  componentWillUnmount () {
    this.removeListener()
  }

  handleLogout() {
    Auth.logout();
  }

  render () {
    var posts = this.state.posts

    var childElements = posts.map(function(post){
      // const randomHeight = Math.random() * (400 - 550) + 400;

      // const style = {
      //   height: randomHeight,
      // }

      return (
        <div className="pp-list-card" key={post.idx}>
          <div className="card-thumbnail">
            <img src={post.thumbnail} alt="thumbnail" className="card-image-radious"/>
          </div>

          <div className="card-header card-padding-1">
            <div className="card-tag">연주</div>
            <div className="card-tag">피아노</div>
          </div>

          <div className="card-content card-padding">
            <h3>사계 중 여름 3악장</h3>
          </div>

          <div className="card-footer card-padding">
          </div>
        </div>
      );
    });

    return (
        <div className="container">
          <header>
            <div className="title">
              <h1>HOME</h1>
            </div>
            <div className="nav">
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
      </div>
    )
  }
}
