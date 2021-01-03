import React, { Component } from 'react';
import Post from './components/Post';

import classes from './App.module.css';

import posts from './posts.json'

class App extends Component {
  render() {
    return (
      <div>
        {posts.map(({ title, description, image }, key) => (
          <Post
            key={`Post_key_${key}`}
            title={title}
            description={description}
            image={image}
          />
        )
        )}
      </div>
    )
  }
}

export default App;
