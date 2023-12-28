import React, { useState } from "react";
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from './components/layout.jsx'
import Index from './pages'
import NotFound from './pages/not-found.jsx'
import Neo4jContext, { createDriver } from "./neo4j-context.jsx";
import Context from './pages/context.jsx'

localStorage.setItem('protocol', localStorage.getItem('protocol') ?? 'bolt')
localStorage.setItem('host', localStorage.getItem('host') ?? 'localhost')
localStorage.setItem('port', localStorage.getItem('port') ?? '7687')
localStorage.setItem('user', localStorage.getItem('user') ?? 'neo4j')
localStorage.setItem('password', localStorage.getItem('password') ?? '123')

const Main = (props) => {
  const [driver, setDriver] = useState(createDriver())

  return (
    <Neo4jContext.Provider value={{driver, setDriver}}>
      <ChakraProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path={'/'} element={<Index />} />
              <Route path={'/context'} element={<Context />} />
              <Route path={'*'} element={<NotFound />} />
            </Routes>
          </Layout>
        </HashRouter>
      </ChakraProvider>
    </Neo4jContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)


