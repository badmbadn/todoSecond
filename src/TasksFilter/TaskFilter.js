import React from "react";

import './TaskFilter.css'

const TaskFilter = ({valueBtns}) => {

    const elements = valueBtns.map(item => {
        return <li key={item.id}>
                    <button className={item.class}>{item.value}</button> 
               </li>
    })

    return (
        <ul className="filters">
            {elements}
        </ul>
    )
}

export default TaskFilter;

