import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import './assets/styles/index.css'
import Auth from './pages/Auth/Auth'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import Parties from './pages/Parties/Parties'
import PartiesList from './pages/Parties/PartiesList'
import Party from './pages/Parties/Party'

ReactDOM.createRoot(document.getElementById('root')!).render(
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
