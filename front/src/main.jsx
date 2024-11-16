import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, theme } from '@chakra-ui/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ChakraProvider theme={theme}> */}
    <App />
    {/* </ChakraProvider> */}
  </StrictMode>,
)
