import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'

import Post from './components/Post';
import classes from './App.module.css';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    console.log(props);
  }

  componentWillMount() {
    axios
      .get('https://5ff4330016cf4f0017c1fdb4.mockapi.io/posts')
      .then(({ data }) => {
        this.setState({
          data
        })
      });
  }



  render() {
    return (
      <div>
        <button>Получить записи</button>
        {
          !this.state.data.length ? <span>Loading...</span> : this.state.data.map(({ title, description, image }, key) => (
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
    loading: true,
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
