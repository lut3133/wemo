import React from "react"

export default class List extends React.Component{
    constructor(props) {
        super(props);
        this.state = {isClicked: false}
    }

    render(){
        const {dispatchDeleteMemo} = this.props

        return (
            <React.Fragment>
                <ul>
                    <li>
                        <span>Content: {this.props.text}</span> <br/>
                        <span>Number of characters: {this.props.textLength}</span> <br/>
                        <button onClick={dispatchDeleteMemo}>삭제</button>
                    </li>
                </ul>
            </React.Fragment>)
    }
}

