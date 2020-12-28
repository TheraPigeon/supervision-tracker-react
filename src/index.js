import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './reset.css';
import './index.css';
import App from './hoc/App';
import * as serviceWorker from './serviceWorker';

// Reducers
import authReducer from './store/reducers/auth';
import allMembersReducer from './store/reducers/allmembers';
import newClinicReducer from './store/reducers/newclinic';
import rosterReducer from './store/reducers/roster';
import historyReducer from './store/reducers/history';
import newsoupReducer from './store/reducers/newsoup';

import Auth0ProviderWithHistory from './hoc/auth0providerWithHitory';

// load env file
require('dotenv').config();

const rootReducer = combineReducers({
  auth: authReducer,
  allmembers: allMembersReducer,
  newclinic: newClinicReducer,
  roster: rosterReducer,
  history: historyReducer,
  newsoup: newsoupReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0ProviderWithHistory>
          <App />
        </Auth0ProviderWithHistory>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
