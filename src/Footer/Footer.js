import React from "react";
import TaskFilter from "../TasksFilter/TaskFilter";
import './Footer.css'


const Footer = () => {

    const btnStatus = [ 
        {value:'Все',class:'selected',id:1},
        {value:'Активный',class:null,id:2},
        {value:'Завершенный',class:null,id:3},
    ]

    return (
        <footer className="footer">
            <span className="todo-count">1 шт.осталось</span>
            <TaskFilter valueBtns={btnStatus} />
            <button className="clear-completed">Очистить завершено</button>
        </footer>
    )
}

export default Footer