import React from "react"
import {createMemo} from "../actions/memo";
import { connect } from 'react-redux'
import {postMakeFile} from "../requests/requests";



class Form extends React.Component{

    constructor(props) {
        super(props);
        this.state = { content: ""};
        this.createMemo = this.createMemo.bind(this);
    }

    updateTitle = (event) => {this.setState({title: event.target.value})}
    updateContent = (event) => {this.setState({content:event.target.value})}

    createMemo(){
        this.props.dispatch(this.state.title,this.state.content);
        const data = {
            file_name : this.state.title + ".txt",
            file_data : this.state.content
        }
        postMakeFile(data);
    }

    render(){
        return (
            <React.Fragment>
                <span>Title: </span>
                <input value={this.state.title} onChange={this.updateTitle}/>
                <br/>
                <span>Content: </span>
                <input value={this.state.content} onChange={this.updateContent}/>
                <button onClick={this.createMemo}>OK</button>
            </React.Fragment>)
    }
}



const mapDispatchToProps = (dispatch) => ({
    dispatch: (title,content) => {
        dispatch(createMemo(title,content))
    }
})

export default connect(
    null,
    mapDispatchToProps)(Form)