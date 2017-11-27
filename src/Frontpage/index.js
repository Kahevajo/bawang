import React, { Component } from 'react'

import Taitan from '../Taitan'
import Calypso from '../Calypso'

import './Frontpage.less'

class Frontpage extends Component {
  render() {
    return <div id='frontpage'>
      <header>
        <div className='title'>
          <span className='thin left'>
            Välkommen till
          </span>
          <span className='bold'>
          Konglig
            <img src='skold.svg' alt='Sköld' />
          Datasektionen
          </span>
          <span className='thin right'>
            Vid THS &bull; Sedan 1983
          </span>
        </div>
      </header>
      <div id='content'>
        <div className='col-md-4 intro' dangerouslySetInnerHTML={{__html: this.props.body}}></div>
        <div className='col-md-4 news'>
          <h2>
            Nyheter
          </h2>
          <ul>
            <li>Aaaah</li>
          </ul>
        </div>
        <div className='col-md-4 news'>
          <h2>
            Event
          </h2>
          <ul>
            <li>Aaaah</li>
          </ul>
        </div>
      </div>
    </div>
  }
}

export default Taitan(Calypso(Frontpage))
