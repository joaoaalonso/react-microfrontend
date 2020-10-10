import React from 'react'
import { NavLink } from 'react-router-dom'

import SERVICES from 'services.json'

const Menu: React.FC = () => {
  return (
    <ul>
      {
        SERVICES.map(service => (
          <li key={`link-${service.name}`}>
            <NavLink to={service.path}>
              { service.name }
            </NavLink>
          </li>
        ))
      }
    </ul>
  )
}

export default Menu
