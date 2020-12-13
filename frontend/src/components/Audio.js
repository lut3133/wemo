import React from "react"
import {Link} from "react-router-dom";
import {postAudioFile, postAudioUrl, postFileContent} from "../requests/requests";
import startRecordingButton from "../images/start-audio-recording-button.png";
import stopRecordingButton from "../images/stop-audio-recording-button.png";
import ReactDOM from 'react-dom';


var audioData = [];

class Audio extends React.Component {

    //audio = new Audio("http://localhost:3000/audioUrl/" + this.props.fileName);

    constructor(props) {
        super(props);

        let recordModeValue;

        if(this.props.fileName !== ""){
            recordModeValue = false;
        }
        else{
            recordModeValue = true;
        }

        this.state = {
            recordMode : recordModeValue,
            isRecording : false,
            src : startRecordingButton,
            title : this.props.fileName,
            audioSourceUrl : ""
        }

        this.clickButton = this.clickButton.bind(this);
    }

    updateTitle = (event) => {this.setState({title: event.target.value})}

    startRecordAudio(){
        this.getStream('audio');
        console.log("skjklsd");
    }

    async stopRecordAudio() {
        this.stopStream('audio');
        console.log("skjklsd");
        let fullBlob = new Blob(audioData, {
            type: "audio/webm;codecs=opus",
        });
        console.log(fullBlob);

        let audioFileName;

        if(this.state.title === ""){
            let date = new Date();
            audioFileName = date.getFullYear() +"-"+(date.getMonth()+1)+"-"
                +(date.getDate())+"_"+(date.getHours())+"-"+(date.getMinutes())+"-"+(date.getSeconds());
            audioFileName = audioFileName + ".webm";

        }
        else{
            audioFileName = this.state.title;
        }

        console.log(audioFileName );
        //let audioFile = new File([fullBlob], "filename")

        postAudioFile(fullBlob,audioFileName);

    }

    getUserMedia(constraints) {
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

    getStream (type) {
        if (!navigator.mediaDevices && !navigator.getUserMedia && !navigator.webkitGetUserMedia &&
            !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
            alert('User Media API not supported.');
            return;
        }

        var constraints = {};
        constraints[type] = true;


        this.getUserMedia(constraints)
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

    stopStream (type) {
        const media = document.querySelector(type);
        const stream = media.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }

    clickButton(){
        if(this.state.isRecording === true){
            this.stopRecordAudio();
            this.setState({
                isRecording : false,
                src : startRecordingButton
            });
            window.location.replace("/memos");
        }
        else{
            this.startRecordAudio();
            this.setState({
                isRecording : true,
                src : stopRecordingButton
            });
        }
    }


    render() {
        console.log(this.state.recordMode);
        if(this.state.recordMode === true){
            return (
                <React.Fragment>

                    <div class = "oneAudio">
                        <input placeholder="제목을 입력해주세요." type= "text" class = "oneAudioTitle" value={this.state.title} onChange={this.updateTitle}/>
                        <br/>
                        <hr/>
                        <br/><br/><br/>
                        <div className="audioComponentsWrapper">
                            <audio controls ></audio>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <img id="stopOrStartRecordingButton" src={this.state.src} onClick={this.clickButton} width="50" height="50"/>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        else{
            return (
                <React.Fragment>

                    <div class = "oneAudio">
                        <input placeholder="제목을 입력해주세요." type= "text" class = "oneAudioTitle" value={this.state.title} onChange={this.updateTitle}/>
                        <br/>
                        <hr/>
                        <br/><br/><br/>
                        <div className="audioComponentsWrapper">
                            <audio controls src = {"http://localhost:3000/audioUrl/"+this.props.fileName}/>

                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    </div>
                </React.Fragment>
            )
        }

    }

    componentDidMount() {
        if(this.state.title !== ""){
            //load data to audio tag
            let data = {
                audio_file_name : this.state.title
            }
            //let temp = postAudioUrl(data);
            //console.log(temp);
            //this.setState({audioSourceUrl : "http://localhost:3000/audioUrl/" + this.props.fileName});
            //const element = ReactDOM.findDOMNode(this);
            //const audio = element.querySelector('audio');
            //const source = audio.querySelector('source');
            //source.src = "http://localhost:3000/audioUrl/" + this.props.fileName;
            //console.log(source.src);
            //audio.load();
        }
    }

}

const saveBlobData = (event) =>{
    audioData.push(event.data);
}

export default Audio;