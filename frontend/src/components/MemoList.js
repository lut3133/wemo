import React from "react"
import List from "./List"
import {connect} from 'react-redux'
import {deleteMemo} from "../actions/memo";
import {getLsAndContent} from "../requests/requests";

class MemoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            existMemos : []
        };
    }

    callAPI(){
        getLsAndContent().then(res => {
            console.log(res);
            this.setState({existMemos : res});
            console.log(this.state.existMemos[0]);
        });

    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        const {state, deleteMemo} = this.props;
        return(
            <div>
                {state.map(memo =>
                    <List title = {memo.title}
                          text = {memo.text}
                          textLength = {memo.text.length}
                          dispatchDeleteMemo = {()=> deleteMemo(memo.title,memo.text)}/>
                          )}
                {this.state.existMemos.map(memo =>{
                    if(memo.type === "text"){
                        return <List title = {memo.name}
                                     text = {memo.content}
                                     textLength = {memo.content.length}
                                     dispatchDeleteMemo = {()=> deleteMemo(memo.name,memo.content)}
                                    modificationDate = {memo.modificationDate}/>
                    }
                    return <span></span>
                }
                )}
            </div>)
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