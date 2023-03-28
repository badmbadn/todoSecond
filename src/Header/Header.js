import React from "react";

import NewTaskForm from "../NewTaskForm/NewTaskForm";
import './Header.css'

const Header = () => {
    return (
        <header className="header">
            <h1>Дела</h1>
            <NewTaskForm/>
        </header> 
    )
}

export default Header