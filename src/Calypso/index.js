import React, { Component } from 'react'

const CALYPSO_URL = process.env.CALYPSO_URL || 'https://calypso.datasektionen.se/api/list'

export function loadCalypsoData(page = 0) {
}

export default function Calypso(Child) {
  return class Calypso extends Component {
    constructor(props) {
      super(props)

      this.state = {
        content: [],
        last: false,
        totalPages: 0,
        totalElements: 0,
        numberOfElements: 0,
        sort: [{"direction":"DESC","property":"id","ignoreCase":false,"nullHandling":"NATIVE","descending":true,"ascending":false}],
        first: false,
        size: 0,
        number: 0
      }

    }

    static loadData({ location }) {
      if(!location) return Promise.resolve({})

      return fetch(CALYPSO_URL + location.search)
        .then(res => res.json())
    }

    static getChild() {
      return Child
    }

    componentDidMount() {
      Calypso.loadData(this.props).then(res => this.setState(res))
    }

    componentWillReceiveProps(nextProps) {
      if(this.props.location.search !== nextProps.location.search)
        Calypso.loadData(nextProps).then(res => this.setState(res))
    }

    render() {
      return <Child {...this.props} {...this.state} />
    }
  }
}
