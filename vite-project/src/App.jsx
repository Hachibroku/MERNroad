import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapsComponent from './MapsComponent';

function App() {

  return (
    <>
      <Router>
            <Routes>
                {/* <Route path="/" exact component={HomePage} /> */}
                <Route path="/maps" element={<MapsComponent />} />
                {/* ... other routes ... */}
            </Routes>
        </Router>
    </>
  )
}

export default App
