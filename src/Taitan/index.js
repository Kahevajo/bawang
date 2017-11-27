import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import NotFound from '../NotFound'

const TAITAN_URL = process.env.TAITAN_URL || 'https://taitan.datasektionen.se'
//const TAITAN_URL = process.env.TAITAN_URL || 'http://localhost:1234'

export default function Taitan(Child) {
  return class Taitan extends Component {
    constructor(props) {
      super(props)

      this.state = {
        redirect: false,
        status: 0,
        title: '',
        slug: '',
        updated_at: '',
        image: '',
        message: '',
        body: '',
        sidebar: '',
        anchors: [],
        nav: []
      }
    }

    componentDidMount() {
      if(!this.props.status)
        this.loadData(this.props)
    }

    componentWillReceiveProps(nextProps) {
      if(this.props.location.pathname !== nextProps.location.pathname)
        this.loadData(nextProps)
    }

    loadData(props) {
      Taitan.loadData(props)
        .then(res => {
          if(typeof document !== 'undefined')
            document.title = res.title
          this.setState(res)
        })
    }

    static loadData(props) {
      const url = TAITAN_URL + props.location.pathname
      return fetch(url)
        .then(res => {
          const redirected = !res.url.endsWith(props.location.pathname) // node-fetch doesnt have the res.redirected property
          if(redirected)
            if(res.url.startsWith(TAITAN_URL))
              return Promise.resolve({ redirect: res.url.substr(TAITAN_URL.length) })
            else
              return Promise.resolve({ redirect: res.url })
          else if(res.ok) return res.json()
          else return Promise.resolve({ status: res.status })
        })
        .then(res => ({ status: 200, redirect: false, ...res }))
        .catch(err => {
          // Most likely we were redirected and the target did not allow cors-requests
          if(err.message === 'Failed to fetch' && window.confirm(`Redirect to "${url}"?`))
            window.location.href = url
        })
    }

    static getChild() {
      return Child
    }


    render() {
      if(this.state.redirect || this.props.redirect)
        return <Redirect to={this.state.redirect || this.props.redirect} />
      else if(this.state.status === 200)
        return <Child {...this.state} />
      else if(this.props.status === 200)
        return <Child {...this.props} />
      else
        return <NotFound {...this.props} {...this.state.status} />
    }
  }
}
