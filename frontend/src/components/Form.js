import React from "react"
import {createMemo} from "../actions/memo";
import { connect } from 'react-redux'
import {
    postEditFile,
    postFileContent, postFileHistory,
    postRename,
} from "../requests/requests";



class Form extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            originalTitle :this.props.fileName,
            title: this.props.fileName,
            content: this.props.fileContent,
            modificationDate : this.props.modificationDate,
            history : []
        };
        this.editMemo = this.editMemo.bind(this);
        //this.createMemo = this.createMemo.bind(this);
    }

    updateTitle = (event) => {this.setState({title: event.target.value})}
    updateContent = (event) => {this.setState({content:event.target.value})}

    editMemo(){
        console.log(this.state.title);
        const data = {
            file_name : this.state.originalTitle,
            file_data : this.state.content
        }
        if(this.state.originalTitle === "" && this.state.title !== ""){
            data.file_name = this.state.title +".txt";
        }

        postEditFile(data).then(()=>{
            if(this.state.originalTitle !== this.state.title && this.state.originalTitle !== ""){
                let dataForRename = {
                    old_name : this.state.originalTitle,
                    new_name : this.state.title
                }
                console.log(dataForRename.old_name);
                console.log(dataForRename.new_name);

                postRename(dataForRename);
            }
        });

        window.location.replace("/memos");
    }

    clickHistoryButtion(){
        var historyModal = document.getElementById("historyModal");
        var historyBtn = document.getElementById("modificationDateandHistory");
        var span1 = document.getElementById("historyModalClose");

        historyBtn.onclick = function() {
            historyModal.style.display = "block";
        }
        span1.onclick = function() {
            historyModal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target === historyModal) {
                historyModal.style.display = "none";
            }
        }
    }

    render(){
        return (
            <React.Fragment>
                <div class = "oneMemo">
                    <input placeholder="제목을 입력해주세요." type= "text" class = "oneMemoTitle" value={this.state.title} onChange={this.updateTitle}/>
                    <br/>
                    <hr/>
                    <textarea class = "oneMemoContent" value={this.state.content} onChange={this.updateContent}></textarea>
                    <br/><br/><br/>
                    <span id="modificationDateandHistory" onClick={this.clickHistoryButtion}>마지막 수정일: {this.state.modificationDate}</span>
                    <button id = "saveTextButton" onClick={this.editMemo}>저장</button>
                </div>
                <div id="historyModal" className="modal">
                    <div className="modal-content">
                        <span id="historyModalClose" className="close">&times;</span>
                        <h2>수정 내역</h2>
                        {this.state.history.map(eachHistory =>
                            <div>
                                <hr/>
                                <li>
                                    {eachHistory.date+" "+eachHistory.type}
                                </li>

                            </div>
                        )}
                    </div>
                </div>
            </React.Fragment>)
    }

    componentDidMount() {
        if(this.state.content === null){
            let data = {
                file_name : this.state.title
            }
            postFileContent(data).then(res =>{
                this.setState({ content : res.file_content});
            })
        }
        if(this.state.title !== null){
            let data = {
                file_name : this.state.originalTitle
            }
            postFileHistory(data).then(res =>{
                this.setState({history : res});
            })
        }
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