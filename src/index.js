import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}> <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
    
    </BrowserRouter>
  </React.StrictMode></Provider >,
)

