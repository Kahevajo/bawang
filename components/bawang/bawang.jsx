import React from "react";
import ReactDOM from "react-dom";
import Databaren from "../databaren/databaren.jsx";
import {get_lang, TranslateContainer} from "../translate/translate.jsx";
import Datafooter from "../datafooter/datafooter.jsx";
import FirstPage from "../firstpage/firstpage.jsx";
import Tajtan from "../tajtan/tajtan.jsx";
import {Router, Route, Link} from 'react-router'
import {createHistory, createMemoryHistory} from 'history'
import AsyncRender from "react-async-render";
import reactMixin from "react-mixin";


export default class Bawang extends React.Component {
    constructor(props, context) {
        super(props, context);
        var history = process.browser ? createHistory() : createMemoryHistory();
        if(props.path) {
            // For serverside
            history.pushState(null, props.path);
        }
        this.state = {
            history: history
        }
        this.asyncInit(function(done) {
            done();
        });
    }
    componentDidMount() {
        var that = this;
        this.state.history.listen(function(location) {
            that.setState({isInitialRender: false});
        });
    }
    getChildContext() {
        return {
            history: this.state.history,
        }
    }
    render() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width" />
                    <link rel="stylesheet" href="/node_modules/normalize.css/normalize.css" type="text/css" />
                    <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900,300" rel="stylesheet" />
                    <link rel="styleshconstructioneet" type="text/css" href="/node_modules/font-awesome/css/font-awesome.css" />
                    <link rel="stylesheet" type="text/css" href="/components/bawang/style.css" />
                    <link rel="stylesheet" type="text/css" href="/components/databaren/style.css" />
                    <link rel="stylesheet" type="text/css" href="/components/datafooter/style.css" />
                    <link rel="stylesheet" type="text/css" href="/components/datanews/style.css" />
                    <title>Konglig Datasektionen vid KTH</title>
                </head>
                <body>
                    <TranslateContainer startlang={this.props.language}>
                        <Databaren />
                        <Router history={this.state.history}>
                            <Route path="/" component={FirstPage} />
                            <Route path="/chapter" component={Tajtan} />
                        </Router>
                        <Datafooter />
                    </TranslateContainer>
                    <script src="/bundle.js"></script>
                </body>
            </html>
        );
    }
}
Bawang.contextTypes = {
    ...AsyncRender.contextTypes
};
Bawang.childContextTypes = {
    history: React.PropTypes.object,
};
reactMixin(Bawang.prototype, AsyncRender.mixin);

if(process.browser) {
    ReactDOM.render(<Bawang language={get_lang()} />, document);
}
