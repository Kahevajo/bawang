import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import Methone from 'methone'
import Frontpage from './Frontpage'
import News from './News'
import Default from './Default'

import './App.css';

const links = [
  <Link to='/nyheter'>Nyheter</Link>,
  <Link to='/sektionen'>Sektionen</Link>,
  <Link to='/studier'>Studier</Link>,
  <Link to='/namnder'>Nämnder</Link>,
  <Link to='/organisation'>Organisation</Link>,
  <Link to='/naringsliv'>Näringsliv</Link>,
  <Link to='/kontakt'>Kontakt</Link>,
]

export const routes = (props = {}) => [
  <Route key='index' path='/' exact render={ match => <Frontpage {...match} {...props} /> } />,
  <Route key='news' path='/nyheter' render={ match => <News {...match} {...props} /> } />,
  <Route key='newsItem' path='/nyheter/:postId' render={ match => <News {...match} {...props} /> } />,
  <Route key='default' render={ match => <Default {...match} {...props} /> } />,
]

export const App = props => <div id='application' className='cerise'>
  <Methone config={{sytem_name: 'bawang', color_scheme: 'cerise', links}} />
  <Switch>
    {routes(props)}
  </Switch>
</div>


export default App
