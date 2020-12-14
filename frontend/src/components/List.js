import React from "react"
import {postDeleteFile} from "../requests/requests";
import {Link} from "react-router-dom";

export default class List extends React.Component{
    constructor(props) {
        super(props);
        this.state = {isClicked: false,
                        title: props.title,
                        content: props.text,
            modificationDate : props.modificationDate};
        this.deleteMemo = this.deleteMemo.bind(this);
    }

    updateTitle = (event) => {this.setState({title:event.target.value})}
    updateContent = (event) => {this.setState({content:event.target.value})}

    deleteMemo(){

        this.props.dispatchDeleteMemo();
        const data = {
            file_name : this.state.title
        }
        postDeleteFile(data);
        window.location.replace("/memo");
    }

    gotoMemoEditPage(){
    }


    render(){
        return (
                <Link to={{
                    pathname : "/memo",
                    state : {
                        name : this.state.title,
                        content : this.state.content,
                        modificationDate : this.state.modificationDate
                    }
                }}>
                    <div class="briefMemo">
                        <input type="text" class="manyMemoTitle" value={this.state.title.split(".")[0]} onChange={this.updateTitle}/>
                        <br/>
                        <hr/>
                        <textarea  class="manyMemoContent" value={this.state.content} onChange={this.updateContent}/>
                        <br/>
                    </div>
                </Link>)
    }
}

