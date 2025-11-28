import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css'
import Home from './pages/Home';
import noPage from './pages/noPage';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<noPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App