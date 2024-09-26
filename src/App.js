import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './scss/style.scss';
import './app.css';



// Containers
import DefaultLayout from './layout/DefaultLayout';





const App = () => {

  return (

    <Routes>


      <Route >
        <Route exact path="*" name="Home" element={<DefaultLayout />} />
      </Route>
    </Routes>

  )
}


export default App
