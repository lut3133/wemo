import React from "react"
import {createMemo} from "../actions/memo";
import { connect } from 'react-redux'
import {
    postAudioFile,
    postEditFile,
    postFileContent,
    postMakeFile,
    postRename,
    postSttTest
} from "../requests/requests";
import NavBar from "./NavBar";



class Form extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            originalTitle :this.props.fileName,
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
        console.log(this.state.title);
        const data = {
            file_name : this.state.originalTitle,
            file_data : this.state.content
        }
        postEditFile(data).then(()=>{
            console.log("lkjakjsd");
            if(this.state.originalTitle !== this.state.title){
                let dataForRename = {
                    old_name : this.state.originalTitle,
                    new_name : this.state.title
                }
                console.log("lkjakjsd");
                console.log(dataForRename.old_name);
                console.log(dataForRename.new_name);

                postRename(dataForRename);
            }
        });

        window.location.replace("/memos");
    }

    startRecordAudio(){
        getStream('audio');
        console.log("skjklsd");
    }
    async stopRecordAudio() {
        stopStream('audio');
        console.log("skjklsd");
        let fullBlob = new Blob(audioData, {
            type: "audio/webm;codecs=opus",
        });
        console.log(fullBlob);


        //let audioFile = new File([fullBlob], "filename")

        postAudioFile(fullBlob);

    }

    render(){
        return (
            <React.Fragment>
                <div class = "oneMemo">
                    <input placeholder="제목을 입력해주세요." type= "text" class = "oneMemoTitle" value={this.state.title} onChange={this.updateTitle}/>
                    <br/>
                    <hr/>
                    <textarea placeholder="내용을 입력해주세요." class = "oneMemoContent" value={this.state.content} onChange={this.updateContent}></textarea>
                    <br/><br/><br/>
                    <button id = "saveTextButton" onClick={this.editMemo}>저장</button>
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
    }
}

let audioData = [];
let mediaRecorder;

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
            console.log(stream);
            var mediaControl = document.querySelector(type);

            //const mime = ['audio/wav', 'audio.mpeg','audio/webm','audio/ogg'].filter(MediaRecorder.isTypeSupported)[0];
            const mediaRecorder = new MediaRecorder(stream);
            console.log(mediaRecorder);
            mediaRecorder.start();

            mediaRecorder.addEventListener("dataavailable",saveBlobData);

            if ('srcObject' in mediaControl) {
                mediaControl.srcObject = stream;
                console.log(stream.toString());
            } else if (navigator.mozGetUserMedia) {
                mediaControl.mozSrcObject = stream;
            } else {
                mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }

            mediaControl.play();
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

const saveBlobData = (event) =>{
    audioData.push(event.data);
}


const handleVideoData = (event) =>{
    // blob 이벤트에서 data 추출
    console.log("dsdsd"+event);
    const { data } = event;

    let blobData ={
        blob : data
    }
    data.arrayBuffer().then(buffer =>{
        //postSttTest(encode(buffer));
        console.log(buffer);
        buffer = new Int16Array(buffer);
        console.log(buffer+"ddddd");
        var downsampleBuffer = function (buffer, sampleRate, outSampleRate) {
            if (outSampleRate == sampleRate) {
                return buffer;
            }
            if (outSampleRate > sampleRate) {
                throw "downsampling rate show be smaller than original sample rate";
            }
            var sampleRateRatio = sampleRate / outSampleRate;
            var newLength = Math.round(buffer.length / sampleRateRatio);
            var result = new Int16Array(newLength);
            var offsetResult = 0;
            var offsetBuffer = 0;
            while (offsetResult < result.length) {
                var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
                var accum = 0, count = 0;
                for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
                    accum += buffer[i];
                    count++;
                }

                result[offsetResult] = Math.min(1, accum / count)*0x7FFF;
                offsetResult++;
                offsetBuffer = nextOffsetBuffer;
            }
            return result.buffer;
        }
        console.log("downsampled"+downsampleBuffer(buffer,48000,16000).byteLength)
        let buffer1 = downsampleBuffer(buffer,48000,16000);
        //console.log(buffer1.arrayBuffer().toString('base64')+"dddsewssewewe");
        const mime = ['audio/wav', 'audio.mpeg','audio/webm','audio/ogg'].filter(MediaRecorder.isTypeSupported)[0];
        let bblob = new Blob([buffer1]);
        bblob.arrayBuffer().then(data=>{
            //postSttTest(encode(data));
        })
        const audioDownloadLink = document.createElement("a");
        audioDownloadLink.href = URL.createObjectURL(bblob);
        audioDownloadLink.download = "recorded1.wav";


        // body에 append 해줘야겠죠
        document.body.appendChild(audioDownloadLink);

        // faking click. body에 append 했으니 클릭해서 다운로드를 해줘야 합니다.
        audioDownloadLink.click();
    })
    postAudioFile(blobData);

    // 다운로드를 위해 a 태그를 만들어주고 href로 해당 data를 다운로드 받을 수 있게 url을 만듭시다
    const audioDownloadLink = document.createElement("a");
    audioDownloadLink.href = URL.createObjectURL(data);



    var reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = function() {
        var base64data = reader.result;
        //postSttTest(base64data);
        //console.log(base64data);
    }

    console.log(data);

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