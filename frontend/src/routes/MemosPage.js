import '../App.css';
import React from "react";
import MemoList from "../components/MemoList";
import {Link} from 'react-router-dom';
import buttonImg from '../images/add-memo-button.png'

export default class MemosPage extends React.Component {
    
    render()
    {
        return (
            <div>
                <MemoList/>
                <Link to={{
                    pathname : "/memo",
                    state : {
                        name : "",
                        content : ""
                    }
                }}>
                    <div class = "createMemo">
                        <img class="createMemo" src={buttonImg} alt="메모 추가 버튼" width="50" height="50"/>
                    </div>
                </Link>
            </div>
        );
    }
}

