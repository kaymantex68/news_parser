import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { Button, Icon, Image, Item, Label, Dimmer, Loader, Segment } from 'semantic-ui-react'

import Post from './components/Post';
import classes from './App.module.css';



class App extends Component {
  fetchPosts() {
    const { setPosts } = this.props;
    axios
      .get('https://5ff4330016cf4f0017c1fdb4.mockapi.io/posts')
      .then(({ data }) => {
        setPosts(data);
      });
  }

  componentWillMount() {
    this.fetchPosts();
  }


  render() {
    console.info('APP PROPS: ', this.props);
    const { posts } = this.props;
    const { changeRegion } = this.props;
    const { items } = posts;

    return (
      <div className={classes.main_container}>
        <Button onClick={this.fetchPosts.bind(this)}>Получить записи</Button>

        <Button.Group>
          <Button onClick={() => { changeRegion('TAM1') }}>Тамбов онлайн</Button>
          <Button onClick={() => { changeRegion('TAM2') }}>Новсти Тамбов</Button>
          <Button onClick={() => { changeRegion('TAM3') }}>Еще что-то...</Button>
        </Button.Group>

        <Item.Group divided>
          {
            !items.length ?
              <div>
                <Segment style={{height:"80px", border:"none",shadowBox:"none"}}>
                <Dimmer style={{border:"none", shadowBox:"none"}} active inverted>
                    <Loader>Loading</Loader>
                  </Dimmer>
                </Segment>
              </div>
              :
              items.map((item, key) => (
                <Post
                  key={`Post_key_${key}`}
                  {...item}
                />
              )
              )
          }
        </Item.Group>
      </div>
    )
  }
}

const state = props => {

  return {
    ...props,
  };
};


const actions = dispatch => ({
  setPosts: (data) => dispatch({
    type: 'SET_POSTS',
    payload: data,
  }),
  changeRegion: (data) => dispatch({
    type: 'CHANGE_REGION',
    payload: data,
  }),
});



export default connect(state, actions)(App);
