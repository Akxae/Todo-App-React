import React, { useState } from 'react'
import styles from './DetailBox.module.css'

function DetailBox({ allTodos, setallTodos, isCompleted, completeTodo, setCompleteTodo }) {

    const [currentEdit,setCurrentEdit] = useState("");
    const [currentEditedItem,setCurrentEditedItem] = useState("");

    const handleDelete = (index) => {
        let reducedTodo = [...allTodos];
        reducedTodo.splice(index ,1);
        localStorage.setItem('todolist', JSON.stringify(reducedTodo))
        setallTodos(reducedTodo)
    }
    const handleDeleteCompleted = (index) => {
        let reducedTodo = [...completeTodo];
        reducedTodo.splice(index);
        localStorage.setItem('completedTodos', JSON.stringify(reducedTodo))
        setCompleteTodo(reducedTodo)
    }

    const handleEdit = (index, item) => {
        setCurrentEdit(index);
        setCurrentEditedItem(item)
    }
    const handleUpdatedTitle = (value) => {
        setCurrentEditedItem((prev)=>{
            return{...prev,title:value}
        })
    }
    const handleUpdatedDesc = (value) => {
        setCurrentEditedItem((prev)=>{
            return{...prev,desc:value}
        })
    }
    const handleUpdateTodo = ()=>{
        let newTodo = [...allTodos]
        newTodo[currentEdit]=currentEditedItem;
        setallTodos(newTodo);
        setCurrentEdit("");
    }
    const handleComplete = (index) => {
        let newDate = new Date();
        let dd = newDate.getDate();
        let mm = newDate.getMonth();
        let yyyy = newDate.getFullYear();
        let hour = newDate.getHours();
        let minute = newDate.getMinutes();
        let second = newDate.getSeconds();

        let completedAt = dd + "-" + mm + "-" + yyyy + " at " + hour + ":" + minute + ":" + second;

        let filteredTodo = {
            ...allTodos[index],
            completedAt: completedAt
        }
        let updatedCompletedArray = [...completeTodo];
        updatedCompletedArray.push(filteredTodo);
        setCompleteTodo(updatedCompletedArray);
        localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArray))
        handleDelete();
    }

    console.log(allTodos)
    return (
        <div className={styles.todoList}>
            {isCompleted == false &&
                allTodos.map((item, index) => {
                    if (currentEdit === index) {
                        return (
                            <div className={styles.editWrapper} key={index}>
                                <input type="text" placeholder='Updated Title'
                                    onChange={(e) => handleUpdatedTitle(e.target.value)}
                                    value={currentEditedItem.title} />
                                <textarea placeholder=''
                                    onChange={(e) => handleUpdatedDesc(e.target.value)} rows={4}
                                    value={currentEditedItem.desc}></textarea>
                                <button type="button" className={styles.primaryBtn} onClick={handleUpdateTodo}>Update</button>

                            </div>
                        )
                    } else {
                        return (
                            <div key={index} className={styles.todoListItem}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                                <div className={styles.actionBox}>
                                    <i title='Delete?' className={`${'ri-delete-bin-6-line'} ${styles.icon}`} onClick={() => handleDelete(index)}></i>
                                    <i title='Edit?' className={`${'ri-edit-circle-fill'} ${styles.editIcon}`} onClick={() => handleEdit(index, item)}></i>
                                    <i title='Completed?' className={`${'ri-checkbox-circle-fill'} ${styles.checkIcon}`} onClick={() => handleComplete(index)}></i>
                                </div>
                            </div>
                        );
                    }

                })
            }
            {isCompleted === true &&
                completeTodo.map((item, index) => {
                    return (
                        <div key={index} className={styles.todoListItem}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                                <p>Completed on : {item.completedAt}</p>
                            </div>
                            <div className={styles.actionBox}>
                                <i className={`${'ri-delete-bin-6-line'} ${styles.icon}`} onClick={() => handleDeleteCompleted(index)}></i>
                            </div>

                        </div>
                    )
                })
            }

        </div>
    )
}

export default DetailBox
