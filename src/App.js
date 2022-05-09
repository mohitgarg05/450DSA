import './App.css';
import React  from 'react'
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import MainPage from './components/MainPage'
import PageType from './components/PageType'


function App() {


  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/:pagetype" element={<PageType />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
