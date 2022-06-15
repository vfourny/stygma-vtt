import { createRoot } from 'react-dom/client';

import './index.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PartyProvider } from './contexts/PartyContext';
import { SessionProvider } from './contexts/SessionContext';
import Auth from './pages/Auth/Auth';
import SecureRoute from './pages/Auth/SecureRoute';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Verify from './pages/Auth/Verify';
import Parties from './pages/Parties/Parties';
import Party from './pages/Parties/Party';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <PartyProvider>
          <Routes>
            <Route path='/'>
              <Route path='auth' element={<Auth />}>
                <Route path='sign-in' element={<SignIn />} />
                <Route path='sign-up' element={<SignUp />} />
                <Route path='verify' element={<Verify />} />
              </Route>
              <Route path='parties' element={<SecureRoute />}>
                <Route index element={<Parties />} />
                <Route path=':partyId' element={<Party />} />
              </Route>
            </Route>
          </Routes>
        </PartyProvider>
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
