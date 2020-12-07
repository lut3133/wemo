import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../components/Home"
import MemosPage from "../routes/MemosPage";
import FilesPage from "../routes/FilesPage";

class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/memo' component={MemosPage}/>
                    <Route path='/file' component={FilesPage}/>
                    <Route path='/' component={Home}/>
                </Switch>
            </Router>
        )
    }
}

export default Routes;