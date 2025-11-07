import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App3 from './App3.jsx'
//import PropsDemo from './PropsDemo.jsx'
//import State from './StateObjDemo.jsx'
//import Timer from './Timer.jsx'
//import Form from './Form.jsx'
//import ReactRouteDemo from './ReactRouteDemo.jsx'

//import Childtoparent from './Childtoparent.jsx'
//import Reusable from './ReusableCompoents.jsx'
//import ReduxDemo from './ReduxDemo.jsx'
import MaterialUI from './MaterialUI.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MaterialUI />
  </StrictMode>,
)
