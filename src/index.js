import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';



store.subscribe(() => {
  alert('стора изменилась');
  console.info('STORE: ', store.getState());
});


console.info('STORE: ', store.getState());


render(
  <Provider store={store}>
    <App getPost={()=>'test'}/>
  </Provider>,
  document.getElementById('root')
)

