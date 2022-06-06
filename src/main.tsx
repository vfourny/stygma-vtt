import { createRoot } from 'react-dom/client';

import './index.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { PartyProvider } from './contexts/PartyContext';
import { UserAuthProvider } from './contexts/UserAuthContext';
import AuthGuard from './pages/Auth/AuthGuard';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Verify from './pages/Auth/Verify';
import Parties from './pages/Parties/Parties';
import Party from './pages/Parties/Party';

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>  
     <BrowserRouter>
      <UserAuthProvider>
        <PartyProvider>
          <Routes>
            <Route path="/" element={<App/>}>
              <Route path="auth" element={<Auth />}>
                <Route index element={<SignIn />} />
                <Route path="sign-in" element={<SignIn />} />
                <Route path="sign-up" element={<SignUp />} />
                <Route path="verify" element={<Verify />} />
              </Route>
              <Route path='parties' element={<AuthGuard/>}>
                <Route index element={<Parties />}/>
                <Route path=":partyId" element={<Party />} />
              </Route>
              
            </Route>
          </Routes>
        </PartyProvider>
      </UserAuthProvider>
  </BrowserRouter>
  </React.StrictMode>
)
