import React from "react";
import Audio from "../components/Audio";

export default class AudioPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {name: this.props.location.state.name}
    }

    render()
    {
        return (
            <div class="audioWrapper">
                <Audio fileName = {this.state.name}/>
            </div>
        );
    }
}