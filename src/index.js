import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reducer from './app/reducers/index.ts';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import VisibleMenu from "./app/containers/Pages/Menu"


const store = createStore(reducer)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <VisibleMenu />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
