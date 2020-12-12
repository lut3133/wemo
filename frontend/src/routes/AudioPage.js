import React from "react";
import Audio from "../components/Audio";

export default class AudioPage extends React.Component {

    constructor(props){
        super(props);
    }

    render()
    {
        return (
            <div class="audioWrapper">
                <Audio/>
            </div>
        );
    }
}