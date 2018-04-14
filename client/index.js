import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import rootReducer from './reducers/rootReducer';
import App from './components/App';
import history from './history';
// import { fetchCenters } from './actions/centerActions';
// import { fetchEvents } from './actions/eventActions';

const createStoreWithMiddleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware))(createStore);

const store = createStoreWithMiddleware(rootReducer);
// store.dispatch(fetchCenters());
// store.dispatch(fetchEvents());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>
  , document.getElementById('root')
);
