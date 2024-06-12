import { ThemeProvider } from '@/context/theme'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './style/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)
