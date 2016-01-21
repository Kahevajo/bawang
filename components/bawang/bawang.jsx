import React from "react";
import ReactDOM from "react-dom";
import Databaren from "../databaren/databaren.jsx";
import {get_lang, TranslateContainer} from "../translate/translate.jsx";
import FirstPage from "../firstpage/firstpage.jsx";
import Tajtan from "../tajtan/tajtan.jsx";
import {Router, IndexRoute, Route, Link, browserHistory} from 'react-router';
import Datafooter from "../datafooter/datafooter.jsx";
import {createHistory} from 'history'


class Container extends React.Component {
    render() {
        return (
            <div>
                <Databaren />
                {this.props.children}
                <Datafooter />
            </div>
        );
    }
}

export default class Bawang extends React.Component {
    render() {
        return (
            <div>
                <TranslateContainer startlang={this.props.language}>
                    <Router history={browserHistory}>
                        <Route path="/" component={Container}>
                            <IndexRoute component={FirstPage} />
                            <Route path="/chapter" component={Tajtan} />
                        </Route>
                    </Router>
                </TranslateContainer>
            </div>
        );
    }
}

if(process.browser)
    ReactDOM.render(<Bawang language={get_lang()} />, document.querySelector(".reactsbitch"));
