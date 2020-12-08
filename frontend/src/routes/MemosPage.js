import '../App.css';
import React from "react";
import {Header} from "../components/Header";
import FileList from "../components/MemoList";
import {Route,Link, Switch} from 'react-router-dom';
import Home from "../components/Home";

function MemosPage() {
    return (
        <div>
            <Header/>
            <FileList/>
            <Link to="/">home</Link>
        </div>
    );
}

export default MemosPage;
