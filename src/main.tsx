import { createRoot } from 'react-dom/client';

import './index.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SessionProvider } from './contexts/SessionContext';
import Auth from './pages/Auth/Auth';
import SecureRoute from './pages/Auth/SecureRoute';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Home';
import Parties from './pages/Parties/Parties';
import Party from './pages/Parties/Party';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <Routes>
          <Route path='auth' element={<Auth />}>
            <Route path='sign-in' element={<SignIn />} />
            <Route path='sign-up' element={<SignUp />} />
          </Route>
          <Route element={<SecureRoute />}>
            <Route index element={<Home />} />
            <Route path='parties' element={<Parties />} />
            <Route path=':partyId' element={<Party />} />
          </Route>
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
