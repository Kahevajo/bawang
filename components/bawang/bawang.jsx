import React from "react";
import ReactDOM from "react-dom";
import Databaren from "../databaren/databaren.jsx";
import {get_lang, TranslateContainer} from "../translate/translate.jsx";
import Datafooter from "../datafooter/datafooter.jsx";
import FirstPage from "../firstpage/firstpage.jsx";
import Tajtan from "../tajtan/tajtan.jsx";
import {Router, Route, Link} from 'react-router'


export default class Bawang extends React.Component {
    render() {
        return (
            <div>
                <TranslateContainer startlang={this.props.language}>
                    <Databaren />
                    <Router>
                        <Route path="/" component={FirstPage} />
                        <Route path="/chapter" component={Tajtan} />
                    </Router>
                    <Datafooter />
                </TranslateContainer>
            </div>
        );
    }
}

if(process.browser)
    ReactDOM.render(<Bawang language={get_lang()} />, document.querySelector(".reactsbitch"));
