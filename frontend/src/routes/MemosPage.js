import '../App.css';
import React from "react";
import {Header} from "../components/Header";
import MemoList from "../components/MemoList";
import {Route,Link, Switch} from 'react-router-dom';
import Home from "../components/Home";

function MemosPage() {
    return (
        <div>
            <Header/>
            <MemoList/>
            <Link to="/">home</Link>
        </div>
    );
}

export default MemosPage;
