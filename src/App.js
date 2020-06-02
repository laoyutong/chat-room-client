import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Room from './pages/Room'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Redirect to="/home"></Redirect>
        <Route path="/home" component={Home}></Route>
        <Route path="/room" component={Room}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
