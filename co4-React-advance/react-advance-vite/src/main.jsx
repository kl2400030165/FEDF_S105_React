import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
//import Lazy from './ReactLazyDemo.jsx'
import ErrorBoundariesDemo from './ErrorBoundariesdemo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundariesDemo/>
  </StrictMode>,
)
