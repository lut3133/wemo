import React from "react"
import {postDeleteFile} from "../requests/requests";
import {Link} from "react-router-dom";

export default class List extends React.Component{
    constructor(props) {
        super(props);
        this.state = {isClicked: false,
                        title: props.title,
                        content: props.text};
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
        const {dispatchDeleteMemo} = this.props

        return (
                <Link to={{
                    pathname : "/memo",
                    state : {
                        name : this.state.title,
                        content : this.state.content
                    }
                }}>
                    <div class="briefMemo">
                        <span>Title: </span>
                        <input value={this.state.title} onChange={this.updateTitle}/>
                        <br/>
                        <span>Content: </span>
                        <input value={this.state.content} onChange={this.updateContent}/>
                        <br/>
                        <button onClick={this.createMemo}>수정</button>
                        <button onClick={this.deleteMemo}>삭제</button>
                    </div>
                </Link>)
    }
}

