import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Calypso from '../Calypso'

class News extends Component {
  render() {
    return [<header key='header'>
      <div className="header-inner">
        <div className="row">
          <div className="header-left col-md-2">
            <Link to="/">&laquo; Tillbaka</Link>
          </div>
          <div className="col-md-8">
            <h2>Nyheter</h2>
          </div>
          <div className="header-right col-md-2"></div>
        </div>
      </div>
    </header>,
    <div id="content" key='content'>
      {this.props.content.map(item => item.contentSwedish)}
    </div>]
  }
}

export default Calypso(News)
