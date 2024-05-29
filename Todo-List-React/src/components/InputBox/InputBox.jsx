import React,{ useEffect, useState } from 'react'
import styles from './InputBox.module.css'
import DetailBox from '../DetailsBox/DetailBox.jsx'

const InputBox = () => {

    const [isCompleted, setIsCompleted] = useState(false);
    const [allTodos , setallTodos] = useState([]);
    const [newTitle,setNewTitle] = useState('');
    const [newDesc ,setNewDesc] = useState('');
   

    const handleAddTodo=()=>{
        if(newTitle==''){
            alert('not posible')
        }else{
            let newTodoItem = {
                title:newTitle,
                desc:newDesc
            }
            let updatedTodoArray = [...allTodos];
            updatedTodoArray.push(newTodoItem);
            setallTodos(updatedTodoArray);
            localStorage.setItem('todolist',JSON.stringify(updatedTodoArray))
        }
        
    }
    const [completeTodo , setCompleteTodo] = useState([]);
   useEffect(()=>{
    let savedData = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedData = JSON.parse(localStorage.getItem('completedTodos'));
    if(savedData){
        setallTodos(savedData);
    }

    if(savedCompletedData){
        setCompleteTodo(savedCompletedData)
    }
   },[])

    return (
        <div className={styles.todoWrapper}>
            <div className={styles.todoInput}>
                <div className={styles.todoInputItem}>
                    <label >Title</label>
                    <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title ?" />
                </div>
                <div className={styles.todoInputItem}>
                    <label >Description</label>
                    <input type="text" value={newDesc} onChange={(e)=>setNewDesc(e.target.value)} placeholder="What's the title description ?" />
                </div>
                <div className={styles.buttonBox}>
                    <button type="button" className={styles.primaryBtn} onClick={handleAddTodo}>Add</button>
                </div>
            </div>

            <div className={styles.btnArea}>
                <button className={`${styles.SecondaryButton} ${isCompleted === false ? `${styles.activated}` : ''}`}
                    onClick={() => setIsCompleted(false)}>Todo</button>
                <button className={`${styles.SecondaryButton} ${isCompleted === true ? `${styles.activated}` : ''}`}
                    onClick={() => setIsCompleted(true)}>Completed</button>
            </div>
            <DetailBox allTodos={allTodos} setallTodos={setallTodos} isCompleted={isCompleted} completeTodo={completeTodo} setCompleteTodo={setCompleteTodo}/>
        </div>
    )
}

export default InputBox
