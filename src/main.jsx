import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import UserRegistration from "./pages/UserRegistration";
import RegSuccess from './pages/RegSuccess';
import './index.css'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<StrictMode><App /></StrictMode>}>
      <Route index element={<UserRegistration />} />
      <Route path="/:id" element={ <UserRegistration /> }/>
      <Route path="/registrationSuccess" element={<RegSuccess />} />
      <Route path="/privacyPolicy" element={<PrivacyPolicy/>} />
    </Route>
  )
);



ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
