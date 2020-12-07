import React from "react"
import Form from "./Form"
import List from "./List"
import {connect} from 'react-redux'
import {deleteMemo} from "../actions/memo";

class MemoList extends React.Component{

    render() {
        const {state, totalValue, deleteMemo} = this.props;
        return(
            <React.Fragment>
                <span>Number of Files:{totalValue}</span> <br/>
                <Form/>
                {state.map(memo =>
                    <List title = {memo.title} text = {memo.text} textLength = {memo.text.length} dispatchDeleteMemo = {()=> deleteMemo(memo.title,memo.text)}/>)}
            </React.Fragment>)
    }
}


const mapStateToProps = (state) => {
    return {
        state : state,
        totalValue: state.length,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteMemo: (title,text) => dispatch(deleteMemo(title,text))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MemoList)