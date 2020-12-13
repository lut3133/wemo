import '../App.css';
import React from "react";
import {getLs, getPwd, postCd, postDeleteFile, postMkDir, postRmDir} from "../requests/requests";
import {deleteMemo} from "../actions/memo";
import {connect} from "react-redux";
import {Header} from "../components/Header";
import {Link} from "react-router-dom";
import NavBar from "../components/NavBar";

class FilesPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            file_info_list : [],
            cur_path : ".",
            new_dir_name : ""
        }
        this.open = this.open.bind(this);
        this.clickDirName = this.clickDirName.bind(this);
        this.clickOpen = this.clickOpen.bind(this);
        this.clickDeleteDir = this.clickDeleteDir.bind(this);
        this.clickNewFolderButtion = this.clickNewFolderButtion.bind(this);
        this.clickRequestNeFolder = this.clickRequestNeFolder.bind(this);
    }

    deleteMemo(fileName){

        this.props.dispatchDeleteMemo();
        const data = {
            file_name : fileName
        }
        postDeleteFile(data);
        window.location.replace("/memo");
    }

    open(type){
        if(type === "file"){

        }
        else if(type === "dir"){

        }
        window.location.replace("/home");
    }
    clickDirName(dir_name){
        let data = {
            dir_name : dir_name
        }
        postCd(data);
        window.location.replace("/file");
    }
    clickOpen(dir_name){
        let data = {
            dir_name : dir_name
        }
        postCd(data);
        window.location.replace("/memos");
    }
    clickDeleteDir(dir_name){
        let data = {
            dir_name : dir_name
        }
        postRmDir(data);
        window.location.replace("/file");
    }
    clickNewFolderButtion(){
        var mkdirModal = document.getElementById("mkdirModal");
        var mkdirBtn = document.getElementById("newFolderButton");
        var span1 = document.getElementById("mkdirModalClose");

        mkdirBtn.onclick = function() {
            mkdirModal.style.display = "block";
        }
        span1.onclick = function() {
            mkdirModal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == mkdirModal) {
                mkdirModal.style.display = "none";
            }
        }
    }
    clickRequestNeFolder(){
        var span1 = document.getElementById("mkdirModalClose");
        span1.click();
        let data = {
            new_dir_name : this.state.new_dir_name
        }
        postMkDir(data);
        window.location.replace("/file");
    }

    updateNewDirName = (event) => {this.setState({new_dir_name: event.target.value})}

    render() {
        return (
            <div>
                <div class="wrapper">
                    <div class="currentPath">
                        현재 위치: \{this.state.cur_path === "." ? "" : this.state.cur_path}
                    </div>
                    <div class="newFolder">
                        <button id="newFolderButton" onClick={this.clickNewFolderButtion}>새 폴더</button>

                    </div>
                </div>
                <div class="filesInfo">
                    <table class="fileTable">
                        <th>이름</th>
                        <th>수정 날짜</th>
                        <th>파일 크기</th>
                        <th> </th>
                        <th> </th>
                        {this.state.cur_path === "." || this.state.cur_path === "" ? null : <tr>
                            <td className="fileNametd" onClick={()=>{
                                this.clickDirName("..");
                            }} > .. </td>
                            <td className="fileModificationDate"> </td>
                            <td className="fileSize"> </td>
                            <td className="fileDelete"></td>
                            <td className="fileOpen"></td>
                        </tr>}

                        {this.state.file_info_list.map(file => {

                            if(file.type ==="dir"){
                                // request post cd
                                return (<tr>
                                    <td class="fileNametd" onClick={()=>{
                                        this.clickDirName(file.name);
                                    }} > {file.name} </td>
                                    <td class="fileModificationDate"> {file.modificationDate}</td>
                                    <td class="fileSize"> {file.size}</td>
                                    <td className="fileDelete" onClick={() => {
                                        this.clickDeleteDir(file.name);
                                    }}>삭제
                                    </td>

                                    <td className="fileOpen"onClick={()=>{
                                        this.clickOpen(file.name);
                                    }}>
                                        <Link to="/memos">
                                            열기
                                        </Link>
                                    </td>
                                </tr>)
                            }
                            else if(file.type === "text"){
                                return (<tr>
                                    <td class="fileNametd" >
                                        <Link to={{
                                            pathname : "/memo",
                                            state : {
                                                name : file.name,
                                                content : null
                                            }
                                        }}>
                                            {file.name}
                                        </Link>
                                    </td>
                                    <td class="fileModificationDate"> {file.modificationDate}</td>
                                    <td class="fileSize"> {file.size}</td>
                                    <td className="fileDelete" onClick={() => {
                                        deleteMemo(file.name, file.content);
                                        postDeleteFile({file_name: file.name});
                                        window.location.replace("/file");
                                    }}>삭제
                                    </td>

                                    <td className="fileOpen" >
                                        <Link to={{
                                            pathname : "/memo",
                                            state : {
                                                name : file.name,
                                                content : null
                                            }
                                        }}>
                                            열기
                                        </Link>
                                    </td>

                                </tr>)
                            }
                            else if(file.type === "audio"){
                                return (<tr>
                                    <td class="fileNametd" >
                                        <Link to={{
                                            pathname : "/audio",
                                            state : {
                                                name : file.name,
                                            }
                                        }}>
                                            {file.name}
                                        </Link>
                                    </td>
                                    <td class="fileModificationDate"> {file.modificationDate}</td>
                                    <td class="fileSize"> {file.size}</td>
                                    <td className="fileDelete" onClick={() => {
                                        deleteMemo(file.name, file.content);
                                        postDeleteFile({file_name: file.name});
                                        window.location.replace("/file");
                                    }}>삭제
                                    </td>

                                    <td className="fileOpen" >
                                        <Link to={{
                                            pathname : "/audio",
                                            state : {
                                                name : file.name,
                                            }
                                        }}>
                                            열기
                                        </Link>
                                    </td>

                                </tr>)
                            }

                            }
                        )}
                    </table>
                </div>
                <div id="mkdirModal" className="modal">
                    <div className="modal-content">
                        <span id="mkdirModalClose" className="close">&times;</span>
                        <h2>폴더생성</h2>
                        <span>폴더 이름:</span>
                        <input id="newDirName" value={this.state.new_dir_name} onChange={this.updateNewDirName} type="text"/>
                        <button onClick={this.clickRequestNeFolder}>폴더 생성</button>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        getLs().then(res =>{
            this.setState({file_info_list : res});
        });
        getPwd().then(res =>{
            console.log(res.cur_path);
            this.setState({cur_path : res.cur_path});
        })
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteMemo: (title,text) => dispatch(deleteMemo(title,text))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(FilesPage)