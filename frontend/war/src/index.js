import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import soliderSlice from './features/soliderSlice';
import userSlice from './features/userSlice';

// Google Tag Manager
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-NG3MWHDC');

const store = configureStore({
  reducer: {
    user: userSlice,
    solider: soliderSlice
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    {/* Google Tag Manager (noscript) */}
    <noscript>
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NG3MWHDC"
        height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
    </noscript>
    {/* End Google Tag Manager (noscript) */}
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
