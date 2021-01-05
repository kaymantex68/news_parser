import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'

import Post from './components/Post';
import classes from './App.module.css';



class App extends Component {

  constructor(props) {
    super(props);
  }

  fetchPosts() {
    const {setPosts}=this.props;
    axios
      .get('https://5ff4330016cf4f0017c1fdb4.mockapi.io/posts')
      .then(({ data }) => {
        setPosts(data);
      });
  }



  render() {
    const { posts } = this.props;
    const { items } = posts;
    return (
      <div>
        <button onClick={this.fetchPosts.bind(this)}>Получить записи</button>
        {
          !items.length ? <span>Loading...</span> : items.map(({ title, description, image }, key) => (
            <Post
              key={`Post_key_${key}`}
              title={title}
              description={description}
              image={image}
            />
          )
          )
        }
      </div>
    )
  }
}

const state = props => {
  console.log(props)
  return {
    ...props,
  };
};


const actions = (dispatch) => ({
  setPosts: (data) => dispatch({
    type: 'SET_POSTS',
    payload: data,
  }),
});



export default connect(state, actions)(App);
