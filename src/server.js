import express from 'express'
import morgan from 'morgan'
import ejs from 'ejs'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router'

import { App, routes } from './App'

import 'isomorphic-fetch'

const app = express()

app.set('views', './dist')
app.set('view engine', 'html')
app.engine('html', ejs.renderFile)

app.use(morgan('short'))
app.use(express.static('dist', { index: false }))

const TAITAN_URL = process.env.TAITAN_URL || 'https://taitan.datasektionen.se'
app.get('/fuzzyfile', (req, res) => {
  res.redirect(TAITAN_URL + '/fuzzyfile')
})

const traverseData = (thing, props) => {
  const promises = []
  if(typeof thing.loadData === 'function') {
    promises.push(thing.loadData(props))
  }
  if(typeof thing.getChild === 'function' && typeof thing.getChild().loadData === 'function') {
    promises.push(traverseData(thing.getChild(), props))
  }
  return Promise.all(promises).then(([one, child]) => ({...one, ...child}))
}

app.get('*', (req, res) => {
  const route = routes({}).find(({ props }) => {
    const match = matchPath(req.url, props)
    return match && (props.exact ? match.isExact : true) // possibly superfluous
  })
  const match = matchPath(req.url, route.props)
  const matchedRoute = route.props.render(match)

  traverseData(matchedRoute.type, {location: {pathname: req.url, search: ''}})
    .then(props => {
      const context = {}
      const content = renderToString(
        <StaticRouter location={req.url} context={context} >
          <App {...props} />
        </StaticRouter>)

      if(context.url) {
        res.redirect(context.url)
      } else {
        res.render('index.html', { title: props.title, content, props: JSON.stringify(props) });
      }
    }).catch(err => console.log(err))
})


const port = process.env.PORT || 5000
console.log('Listening on port', port)
app.listen(port)
