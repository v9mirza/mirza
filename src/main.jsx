import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import MainRoutes from './MainRoutes.jsx'
import CustomCursor from './components/CustomCursor.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CustomCursor />
    <MainRoutes />
  </BrowserRouter>,
)
