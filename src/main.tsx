import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';

import React from 'react';
import App from './App';
import Auth from './pages/Auth/Auth';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Parties from './pages/Parties/Parties';
import PartiesList from './pages/Parties/PartiesList';
import Party from './pages/Parties/Party';

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>  
 <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="auth" element={<Auth />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        
        <Route path="parties" element={<Parties />}>
          <Route path="list" element={<PartiesList />} />
          <Route path="party" element={<Party />} />
        </Route>
        
      </Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
)
