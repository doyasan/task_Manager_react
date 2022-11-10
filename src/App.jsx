import React, { useState } from "react";
import "./index.css"

export const App = () => {
    const [taskInput, setTaskInput] = useState('');
    const [taskListIncomplete, setTaskListIncomplete] = useState([]);
    const [taskListComplete, setTaskListComplete] = useState([]);
    const onChangeTaskInput = (event) => setTaskInput(event.target.value);

    //追加ボタン処理
    const clickAdd = () => {
        if(taskInput === "") return;
        const newTasks = [...taskListIncomplete, taskInput];
        setTaskListIncomplete(newTasks);
        setTaskInput("");
    } 

    //削除ボタン処理
    const clickDel = (index) => {
        const newDelTasks = [...taskListIncomplete];
        newDelTasks.splice(index,1);
        setTaskListIncomplete(newDelTasks);
    }

    //完了ボタン処理
    const clickComp = (index) => {
        const newInCompTasks = [...taskListIncomplete];
        newInCompTasks.splice(index,1);
        
        const newCompTasks = [...taskListComplete, taskListIncomplete[index]];
        setTaskListIncomplete(newInCompTasks);
        setTaskListComplete(newCompTasks);
    }

    //戻す処理
    const clickRemove = (index) => {
        const newCompTasks = [...taskListComplete];
        newCompTasks.splice(index, 1);
        const newInCompTasks = [...taskListIncomplete, taskListComplete[index]];
        setTaskListComplete(newCompTasks);
        setTaskListIncomplete(newInCompTasks);
    }
    
    return (
        <>
		<div className="task">
			<h1>タスク管理ツール</h1>
			<div id="task--input" className="task__block">
				<label for="js__input--txt">
					<input id="js__input--txt" placeholder="タスクを入力" type="text" value={taskInput} onChange={onChangeTaskInput} />
					<button id="js__btn--add" onClick={clickAdd}>追加</button>
				</label>	
			</div>
			<div className="task__block" id="task--incomplete">
				<h3>未完了のタスク</h3>
				<ul id="task__list--incomplete" className="task__list">
                    {taskListIncomplete.map((task, index)=>{
                        return (
                            <li key={task} className="task__item">
                                <p>{task}</p>
                                <button className="js__btn--complete" onClick={()=> clickComp(index)}>完了</button>
                                <button className="js__btn--remove" onClick={()=> clickDel(index)}>削除</button>
                            </li>
                        );
                    })}
                </ul>
			</div>
			<div className="task__block" id="task--complete">
				<h3>完了したタスク</h3>
				<ul id="task__list--complete" className="task__list">
                    {taskListComplete.map((task, index)=>{
                        return (
                            <li key={task} className="task__item">
                                <p>{task}</p>
                                <button className="js__btn--return" onClick={()=> clickRemove(index)}>戻す</button>
                            </li>
                        );
                    })}
                </ul>
			</div>
		</div>
        </>
    );
}