import React from "react"

export default class List extends React.Component{
    constructor(props) {
        super(props);
        this.state = {isClicked: false,
                        title: props.title,
                        content: props.text}
    }

    updateTitle = (event) => {this.setState({title:event.target.value})}
    updateContent = (event) => {this.setState({content:event.target.value})}

    render(){
        const {dispatchDeleteMemo} = this.props


        return (
            <React.Fragment>
                <ul>
                    <li>
                        <span>Title: </span>
                        <input value={this.state.title} onChange={this.updateTitle}/>
                        <br/>
                        <span>Content: </span>
                        <input value={this.state.content} onChange={this.updateContent}/>
                        <button onClick={this.createMemo}>수정</button>
                        <br/>
                        <span>Number of characters: {this.props.textLength}</span> <br/>
                        <button onClick={dispatchDeleteMemo}>삭제</button>
                    </li>
                </ul>
            </React.Fragment>)
    }
}

