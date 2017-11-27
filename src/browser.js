import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

//import registerServiceWorker from './registerServiceWorker'

import App from './App'

ReactDOM.hydrate(<BrowserRouter><App {...window.loadedprops} /></BrowserRouter>,
  document.getElementById('root'))

//registerServiceWorker()
