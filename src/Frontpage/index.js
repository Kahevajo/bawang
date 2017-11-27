import React, { Component } from 'react'

import Taitan from '../Taitan'
import Calypso from '../Calypso'

import './Frontpage.less'

class Frontpage extends Component {
  render() {
    return <div className='frontpage'>
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
      <div className='content flex'>
        <div className='col-md-4 intro' dangerouslySetInnerHTML={{__html: this.props.body}}></div>
        <div className='col-md-4 news'>
          <h2>
            Nyheter
          </h2>
          <ul>
            {
              this.props.content
                .filter(item => item.itemType === 'POST')
                .filter((_, i) => i < 5)
                .map(item => <li key={item.id}>
                  <h3>{ item.titleSwedish }</h3>
                  <span>
                    { new Date(item.publishDate)
                        .toLocaleDateString('sv-SE', {day: 'numeric', month: 'short', year: 'numeric'}) }
                  </span>
                  &bull;
                  <span>
                    { item.publishAsDisplay || item.authorDisplay }
                  </span>
                </li>)
            }
          </ul>
        </div>
        <div className='col-md-4 news'>
          <h2>
            Event
          </h2>
          <ul>
            {
              this.props.content
                .filter(item => item.itemType === 'EVENT')
                .filter((_, i) => i < 5)
                .map(item => <li key={item.id}>
                  <h3>{ item.titleSwedish }</h3>
                  <span>
                    { new Date(item.publishDate)
                        .toLocaleDateString('sv-SE', {day: 'numeric', month: 'short', year: 'numeric'}) }
                    &bull;
                    { item.publishAsDisplay || item.authorDisplay }
                  </span>
                </li>)
            }
          </ul>
        </div>
      </div>
      <div className='content' dangerouslySetInnerHTML={{__html: this.props.sidebar}}></div>
    </div>
  }
}

export default Taitan(Calypso(Frontpage))
