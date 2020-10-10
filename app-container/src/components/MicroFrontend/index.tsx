import React, { useState, useEffect, useCallback } from 'react'

import Error from './Error'
import Loading from './Loading'

interface MicroFrontend {
  name: string;
  host: string;
  context: any;
  history: any;
}

const MicroFrontend: React.FC<MicroFrontend> = ({ name, host, history, context }) => {
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const renderMicroFrontend = useCallback(() => {
    setLoading(false)
    window[`render-${name}`] && window[`render-${name}`](`${name}-container`, history, context)
  }, [name, history, context])

  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`

    if (document.getElementById(scriptId)) {
      renderMicroFrontend()
      return
    }

    fetch(`${host}/asset-manifest.json`)
      .then(res => res.json())
      .then(data => {
        const promises = Object.keys(data.files)
          .filter(key => key.endsWith('.js'))
          .reduce((sum: any, key) => {
            sum.push(
              new Promise(resolve => {
                const path = `${host}${data.files[key]}`;
                const script = document.createElement('script');
                if (key === 'main.js') {
                  script.id = scriptId;
                }
                script.onload = () => {
                  resolve();
                };
                script.src = path;
                document.head.appendChild(script);
              })
            );
            return sum;
          }, []);
        Promise.allSettled(promises).then(() => {
          renderMicroFrontend()
        })
      })
      .catch(() => setHasError(true))

    return () => {
      window[`unmount-${name}`] && window[`unmount-${name}`](`${name}-container`)
    }
  }, [host, name, renderMicroFrontend])

  if (hasError) return <Error />
  
  return (
    <>
      { loading &&  <Loading />}
      <main id={`${name}-container`} />
  </>
  )
}

interface MicroFrontendFactoryProps {
  history?: any;
}

export const CreateMicroFrontend = (name: string, host: string, ctx?: any) => {
  const MicroFrontendFactory: React.FC<MicroFrontendFactoryProps> = ({ history }) => (
    <MicroFrontend
      history={history}
      host={host}
      name={name}
      context={ctx}
    />
  )

  return MicroFrontendFactory
}

export default MicroFrontend
