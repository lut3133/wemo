import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Home from "../components/Home"
import MemosPage from "./MemosPage";
import FilesPage from "./FilesPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MemoPage from "./MemoPage";
import {Header} from "../components/Header";
import NavBar from "../components/NavBar";
import AudioPage from "./AudioPage";

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Link to="/home">
                    <Header/>
                </Link>
                <NavBar/>
                <Switch>
                    <Route path='/memos' component={MemosPage}/>
                    <Route path='/file' component={FilesPage}/>
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/register' component={RegisterPage}/>
                    <Route path='/memo' component={MemoPage}/>
                    <Route path='/audio' component={AudioPage}/>
                    <Route path='/' component={Home}/>
                </Switch>
            </Router>
        )
    }
}

export default Routes;