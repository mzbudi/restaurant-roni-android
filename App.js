import React, { Component } from 'react';
import { Root } from 'native-base';
import Navigator from './src/Public/navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/Public/redux/store';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root>
            <Navigator />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
