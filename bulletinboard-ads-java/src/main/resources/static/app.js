'use strict'

import { html, useState, useEffect } from './webjars/htm/3.1.1/preact/standalone.module.js'
import AdsOverview from './ads-overview.js'
import AdDetails from './ad-details.js'

// FIXME changing the hash directly when already on the details view will not load the data of the new ad
const App = function (props) {
  const [state, setState] = useState({ isCreate: false })

  useEffect(() => {
    setStateFromUrl()
    addEventListener('hashchange', setStateFromUrl)
    return () => removeEventListener('hashchange', setStateFromUrl)
  }, [])

  const setStateFromUrl = () => {
    const isCreate = location.hash.indexOf('#/new') > -1
    setState({ isCreate })
  }

  const getAdId = () => {
    const indexShow = location.hash.indexOf('#/show/')
    return (indexShow > -1) ? location.hash.substring(indexShow + 7) : ''
  }

  const adId = getAdId()
  const showDetails = adId || state.isCreate
  return showDetails
    ? html`<${AdDetails} client=${props.client} adId=${adId} isCreate=${state.isCreate} />`
    : html`<${AdsOverview} client=${props.client} />`
}

export default App
