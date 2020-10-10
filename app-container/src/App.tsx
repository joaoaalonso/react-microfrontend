import React, { useState, createContext } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { MainRouter } from 'routes'

const { Provider, Consumer } = createContext({})

const INITIAL_CONTEXT = {}

const App = () => {
  const [data, setData] = useState(INITIAL_CONTEXT)

  const context = { data, setData }

  return (
    <Provider value={context}>
      <BrowserRouter>
        <Consumer>
          { (context) => <MainRouter context={context} /> }
        </Consumer>
      </BrowserRouter>
    </Provider>
  )
}

export default App
