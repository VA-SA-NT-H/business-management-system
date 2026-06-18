import './index.css'
import App from './App.tsx'
import { Toaster } from "react-hot-toast";
import React from 'react';
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>

    <App />

    <Toaster
      position="top-right"
    />

  </React.StrictMode>

);