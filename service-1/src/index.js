import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { name } from '../package.json'

window[`render-${name}`] = (containerId, history, context) => {
  ReactDOM.render(
    <App history={history} context={context}/>,
    document.getElementById(containerId)
  )
}

window[`unmount-${name}`] = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId))
}

if (!document.getElementById(`${name}-container`)) {
  ReactDOM.render(<App />, document.getElementById('root'))
}
