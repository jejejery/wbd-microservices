import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router'
import './index.css'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global:  {
      body: {
        bg: '#1E2930',
      },
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider theme={theme}>
      <Router/>
    </ChakraProvider>
)
