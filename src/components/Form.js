import React from "react"
import {createMemo} from "../actions/memo";
import { connect } from 'react-redux'



class Form extends React.Component{

    constructor(props) {
        super(props);
        this.state = { content: ""};
        this.createMemo = this.createMemo.bind(this);
    }

    updateContent = (event) => {this.setState({content:event.target.value})}

    createMemo(){
        this.props.dispatch(this.state.content);
    }

    render(){
        return (
            <React.Fragment>
                <input value={this.state.content} onChange={this.updateContent}/>
                <button onClick={this.createMemo}>OK</button>
            </React.Fragment>)
    }
}



const mapDispatchToProps = (dispatch) => ({
    dispatch: content => {
        dispatch(createMemo(content))
    }
})

export default connect(
    null,
    mapDispatchToProps)(Form)