import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import App from './App';
import './styles/globals.css';

Amplify.configure({
  Auth: {
    region: import.meta.env.SNOWPACK_PUBLIC_REGION,
    userPoolId: import.meta.env.SNOWPACK_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: import.meta.env
      .SNOWPACK_PUBLIC_USER_POOL_WEB_CLIENT_ID,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
