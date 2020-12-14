import React from "react"
import {postAudioFile} from "../requests/requests";
import startRecordingButton from "../images/start-audio-recording-button.png";
import stopRecordingButton from "../images/stop-audio-recording-button.png";


var audioData = [];

class Audio extends React.Component {

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
                mediaRecorder.start(2000);

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
                            <img id="stopOrStartRecordingButton" src={this.state.src} onClick={this.clickButton} alt="녹음 시작 종료 버튼" width="50" height="50"/>
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

}

const saveBlobData = (event) =>{
    audioData.push(event.data);
}

export default Audio;