import * as React from 'react';

const initialState = {
  isLoggedIn: null
}

const AppNavigatorContext = React.createContext(initialState);

export default AppNavigatorContext;