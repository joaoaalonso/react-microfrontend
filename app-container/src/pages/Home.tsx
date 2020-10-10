import React from 'react'

import Menu from 'components/Menu'
import { ServiceRouter } from 'routes'

interface HomeProps {
  context: any;
}

const Home: React.FC<HomeProps> = ({ context }) => {
  return (
    <div>
      <Menu />
      <ServiceRouter context={context} />
    </div>
  )
}

export default Home
