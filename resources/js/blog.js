import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './components/routes';

import store from './redux/store';

const App = () => {

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );

}

ReactDOM.render(<App />, document.getElementById('app'));

