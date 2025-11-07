import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ImageDemo from './htmlPrograms/ImageDemo'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ImageDemo/>
  </StrictMode>,
)
