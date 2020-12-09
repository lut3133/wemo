import React from "react"
import {createMemo} from "../actions/memo";
import { connect } from 'react-redux'
import {postEditFile, postMakeFile} from "../requests/requests";
import NavBar from "./NavBar";



class Form extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.fileName,
            content: this.props.fileContent,
        };
        this.editMemo = this.editMemo.bind(this);
        //this.createMemo = this.createMemo.bind(this);

        this.startRecordAudio = this.startRecordAudio.bind(this);
        this.stopRecordAudio = this.stopRecordAudio.bind(this);
    }

    updateTitle = (event) => {this.setState({title: event.target.value})}
    updateContent = (event) => {this.setState({content:event.target.value})}
/*
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

 */
    editMemo(){
        const data = {
            file_name : this.state.title+".txt",
            file_data : this.state.content
        }
        postEditFile(data);
        window.location.replace("/memos");
    }

    startRecordAudio(){
        getStream('audio');
        console.log("skjklsd");
    }
    stopRecordAudio(){
        stopStream('audio');
        console.log("skjklsd");
    }

    render(){
        return (
            <React.Fragment>
                <div class = "oneMemo">
                    <input placeholder="제목을 입력해주세요." type= "text" class = "oneMemoTitle" value={this.state.title} onChange={this.updateTitle}/>
                    <br/>
                    <hr/>
                    <textarea placeholder="내용을 입력해주세요." class = "oneMemoContent" value={this.state.content} onChange={this.updateContent}></textarea>
                    <br/>
                    <audio controls></audio>
                    <button class ="oneAudioSaveButton" onClick={this.startRecordAudio}>음성녹음</button>
                    <button className="oneAudioSaveDoneButton" onClick={this.stopRecordAudio}>음성녹음종료</button>
                    <button class = "oneMemoSaveButton" onClick={this.editMemo}>저장</button>
                </div>
            </React.Fragment>)
    }
}

function getUserMedia(constraints) {
    // if Promise-based API is available, use it
    if (navigator.mediaDevices) {
        return navigator.mediaDevices.getUserMedia(constraints);
    }

    // otherwise try falling back to old, possibly prefixed API...
    var legacyApi = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (legacyApi) {
        // ...and promisify it
        return new Promise(function (resolve, reject) {
            legacyApi.bind(navigator)(constraints, resolve, reject);
        });
    }
}


function getStream (type) {
    if (!navigator.mediaDevices && !navigator.getUserMedia && !navigator.webkitGetUserMedia &&
        !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
        alert('User Media API not supported.');
        return;
    }

    var constraints = {};
    constraints[type] = true;


    getUserMedia(constraints)
        .then(function (stream) {
            var mediaControl = document.querySelector(type);


            const videoRecoder = new MediaRecorder(stream);
            console.log(videoRecoder);
            videoRecoder.start();

            setTimeout(() => videoRecoder.stop(), 10000);
            videoRecoder.addEventListener("dataavailable",handleVideoData);

            if ('srcObject' in mediaControl) {
                mediaControl.srcObject = stream;
                console.log(stream.toString());
            } else if (navigator.mozGetUserMedia) {
                mediaControl.mozSrcObject = stream;
            } else {
                mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }

            //mediaControl.play();
        })
        .catch(function (err) {
            alert('Error: ' + err);
        });
}

function stopStream (type) {
    const media = document.querySelector(type);
    const stream = media.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
}


const handleVideoData = (event) =>{
    // blob 이벤트에서 data 추출
    console.log("dsdsd"+event);
    const { data } = event;

    // 다운로드를 위해 a 태그를 만들어주고 href로 해당 data를 다운로드 받을 수 있게 url을 만듭시다
    const audioDownloadLink = document.createElement("a");
    audioDownloadLink.href = URL.createObjectURL(data);
    console.log(data.text);
    console.log(btoa(data));

    // 다운로드 되는 파일의 이름. 확장자는 mp4 등 다양하게 가능하지만 오픈 소스인지 확인 합시다
    audioDownloadLink.download = "recorded.wav";


    // body에 append 해줘야겠죠
    document.body.appendChild(audioDownloadLink);

    // faking click. body에 append 했으니 클릭해서 다운로드를 해줘야 합니다.
    audioDownloadLink.click();
}


const mapDispatchToProps = (dispatch) => ({
    dispatch: (title,content) => {
        dispatch(createMemo(title,content))
    }
})

export default connect(
    null,
    mapDispatchToProps)(Form)