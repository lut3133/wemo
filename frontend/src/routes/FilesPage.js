import '../App.css';
import React from "react";
import {getLs, postDeleteFile} from "../requests/requests";
import {deleteMemo} from "../actions/memo";
import {connect} from "react-redux";
import {Header} from "../components/Header";
import {Link} from "react-router-dom";
import NavBar from "../components/NavBar";

class FilesPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            file_info_list : []
        }
        this.open = this.open.bind(this);
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

    render() {
        return (
            <div>
                <div class="currentPath">
                    현재 위치:
                </div>
                <div class="filesInfo">
                    <table class="fileTable">
                        <th>이름</th>
                        <th>수정 날짜</th>
                        <th>파일 크기</th>
                        <th> </th>
                        <th> </th>
                        <tr>
                            <td className="fileNametd"> .. </td>
                            <td className="fileModificationDate"> </td>
                            <td className="fileSize"> </td>
                            <td className="fileDelete">삭제</td>
                            <td className="fileOpen">열기</td>
                        </tr>
                        {this.state.file_info_list.map(file => {

                            if(file.type ==="dir"){
                                // request post cd
                                return (<tr>
                                    <td class="fileNametd" > {file.name} </td>
                                    <td class="fileModificationDate"> {file.modificationDate}</td>
                                    <td class="fileSize"> {file.size}</td>
                                    <td className="fileDelete" onClick={() => {
                                        if (file.type === "file") {
                                            deleteMemo(file.name, file.content);
                                            postDeleteFile({file_name: file.name});
                                            window.location.replace("/file");
                                        }
                                    }}>삭제
                                    </td>
                                    <Link to="/memos">
                                    <td className="fileOpen">열기</td>
                                    </Link>
                                </tr>)
                            }
                            else if(file.type === "file"){
                                return (<tr>
                                    <td class="fileNametd" > {file.name} </td>
                                    <td class="fileModificationDate"> {file.modificationDate}</td>
                                    <td class="fileSize"> {file.size}</td>
                                    <td className="fileDelete" onClick={() => {
                                        if (file.type === "file") {
                                            deleteMemo(file.name, file.content);
                                            postDeleteFile({file_name: file.name});
                                            window.location.replace("/file");
                                        }
                                    }}>삭제
                                    </td>
                                    <Link to={{
                                        pathname : "/memo",
                                        state : {
                                            name : file.name,
                                            content : "asdasd"
                                        }
                                    }}>
                                    <td className="fileOpen">열기</td>
                                    </Link>
                                </tr>)
                            }

                            }
                        )}
                    </table>
                </div>
            </div>
        );
    }
    componentDidMount() {
        getLs().then(res =>{
            this.setState({file_info_list : res});
        });
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