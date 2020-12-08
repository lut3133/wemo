import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../components/Home"
import MemosPage from "./MemosPage";
import FilesPage from "./FilesPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MemoPage from "./MemoPage";

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/memos' component={MemosPage}/>
                    <Route path='/file' component={FilesPage}/>
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/register' component={RegisterPage}/>
                    <Route path='/memo' component={MemoPage}/>
                    <Route path='/' component={Home}/>
                </Switch>
            </Router>
        )
    }
}

export default Routes;