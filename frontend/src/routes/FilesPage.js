import '../App.css';
import React from "react";
import {getLs, postDeleteFile} from "../requests/requests";
import {deleteMemo} from "../actions/memo";
import {connect} from "react-redux";
import {Header} from "../components/Header";
import {Link} from "react-router-dom";

class FilesPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            file_info_list : []
        }
    }

    deleteMemo(fileName){

        this.props.dispatchDeleteMemo();
        const data = {
            file_name : fileName
        }
        postDeleteFile(data);
        window.location.replace("/memo");
    }

    render() {
        return (
            <div>
                <Link to="/home">
                    <Header/>
                </Link>
                <div class="filesInfo">
                    <table>
                        <th>파일이름</th>
                        <th>수정 날짜</th>
                        <th>파일 크기</th>
                        <th> </th>
                        <th> </th>
                        <th> </th>
                    {this.state.file_info_list.map(file => <tr>
                        <td class="fileNametd"> {file.name} </td>
                        <td class="fileModificationDate"> {file.modificationDate}</td>
                        <td class="fileSize"> {file.size}</td>
                        <td onClick={()=> {
                            if(file.type === "file"){
                            deleteMemo(file.name,file.content);
                            postDeleteFile({file_name: file.name});
                            window.location.replace("/file");}}}>삭제</td>
                        <td>열기</td>
                    </tr>)}
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