import '../App.css';
import React from "react";
import {getLs} from "../requests/requests";

class FilesPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            file_info_list : []
        }
    }

    render() {
        return (
            <div>
                <span>FilesPage</span>
                {this.state.file_info_list.map(file => <li>
                    <span> {file.name} </span>
                    <span> {file.modificationDate}</span>
                    <span> {file.size} B</span>
                    <button>delete</button>
                    <button>rename</button>
                    <span>size</span>
                </li>)}
            </div>
        );
    }
    componentDidMount() {
        getLs().then(res =>{
            this.setState({file_info_list : res});
        });
    }
}

export default FilesPage;