import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SceneProvider } from './SceneContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SceneProvider>
    <App />
    </SceneProvider>
  </StrictMode>,
)
