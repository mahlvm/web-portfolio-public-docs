import "./ToDo.css";
import { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from "../components/Header";



const ToDo = () => {
    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [done, setDone] = useState([]);


    const handleInputChance = (event) => {
        setNewTask(event.target.value);
        console.log(newTask);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            addTask(event);
        }
    };

    const addTask = (event) => {
        event.preventDefault();
        const newList = [...tasks];
        newList.unshift(newTask);
        setTasks(newList);
        setNewTask("");
    }

    const removeTask = (index) => {
        const copyTasks = [...tasks];
        copyTasks.splice(index,1);
        setTasks(copyTasks);
    }

    const completeTask = (index) => {
        const copyTask = [...tasks];
        const whatTask = copyTask[index];
        const copyDone = [...done];
        copyDone.push(whatTask);
        setDone(copyDone);
        removeTask(index);
    }

    const removeTaskDone = (index) => {
        const copyDone = [...done];
        copyDone.splice(index,1);
        setDone(copyDone);
    }

    const up = (index) => {
        if (index <= 0) {
            return; 
        } else {
        const copyTasks = [...tasks];
        [copyTasks[index - 1], copyTasks[index]] = [copyTasks[index], copyTasks[index - 1]];
        setTasks(copyTasks);
        }
    }

    const down = (index) => {
        if (index === tasks.length - 1) {
            return; 
        } else {
        const copyTasks = [...tasks];
        [copyTasks[index + 1], copyTasks[index]] = [copyTasks[index], copyTasks[index + 1]];
        setTasks(copyTasks);
        }
    }



    return(
        <div className="main-div">
            <Header />
            

            <div className="content-div">    

                <div className="title">
                    <h1>To do</h1>
                </div>

                <div className="input-div">
                    <input type="text" value={newTask} onKeyPress={handleKeyPress} onChange={handleInputChance}/>
                    <button onClick={addTask}>Add</button>
                </div>
                

                <div className="boxes">
                    <div className="todo">
                        <div className="title-todo">
                            <i className="bi bi-clipboard2"></i>
                            <span>To-Do</span>
                        </div>

                        <div className="list">
                            <ul>
                                {tasks.map((taskItem, index ) => (
                                    <li key={index}>
                                        <div className="text-li">
                                            {taskItem}
                                        </div>
                                        <div className="buttons-todo">    
                                            <i className="bi bi-arrow-up" onClick={() => up(index)}></i>
                                            <i className="bi bi-arrow-down" onClick={() => down(index)}></i>
                                            <i className="bi bi-trash" onClick={() => removeTask(index)}></i>
                                            <i className="bi bi-check2-square" onClick={() => completeTask(index)}></i>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <div className="done">
                        <div className="title-done">
                            <i className="bi bi-clipboard2-check"></i>
                            <span>Done</span>
                        </div>
                        <div className="list">
                            <ul>
                                {done.map((itemDone, index) => (
                                    <li key={index}> 
                                        <div className="text-li">
                                            {itemDone}
                                        </div>
                                        <div className="buttons-todo"> 
                                            <i className="bi bi-trash" onClick={() => removeTaskDone(index)}></i>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>          
        </div>
    )
};

export default ToDo;