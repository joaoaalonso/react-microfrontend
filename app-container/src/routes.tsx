import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from 'pages/Home'
import SERVICES from 'services.json'
import { CreateMicroFrontend } from 'components/MicroFrontend'

interface RouterProps {
    context: any;
}

export const MainRouter: React.FC<RouterProps> = ({ context }) => {
  return (
    <Switch>
      <Route path="/" render={() => <Home context={context} />} />
    </Switch>
  )
}

export const ServiceRouter: React.FC<RouterProps> = ({ context }) => {
  return (
    <Switch>
      {
        SERVICES.map(service => {
          const { name, host, path } = service
          const ServiceComponent = CreateMicroFrontend(name, host, context)
          return <Route key={`route-${name}`} path={path} render={() => <ServiceComponent />} />
        })
      }
    </Switch>
  )
}