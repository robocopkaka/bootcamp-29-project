import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';
import App from './components/App';
import history from './history';
import { fetchCenters } from './actions/centerActions';

const createStoreWithMiddleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware))(createStore);

const store = createStoreWithMiddleware(rootReducer);
store.dispatch(fetchCenters());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root')
);
