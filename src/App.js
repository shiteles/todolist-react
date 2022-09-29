import {useState} from 'react';
import AddTaskForm from './components/AddTaskForm'
import UpdateForm from './components/UpdateForm'
import ToDo from './components/ToDo'

import 'bootstrap/dist/css/bootstrap.min.css';


import './App.css';

function App() {

  // Estados das tarefas (to do list)
  const[toDo,setToDo] = useState([]);

  // Estado temporário
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  // Adicionar tarefas
  const addTask = () =>{
    if(newTask){
      let num = toDo.length + 1;
      let newEntry = {id: num, title:newTask, status:false}
      setToDo([...toDo,newEntry])
      setNewTask('');
    }
  }

  //Deletar tarefa
  const deleteTask = (id)=>{
    let newTask = toDo.filter(task => task.id !== id)
    setToDo(newTask);
  }

  //Marcar tarefa como feita ou completa
  const markDone = (id) =>{
    let newTask = toDo.map(task =>{
      if(task.id === id){
        return({...task, status: !task.status})
      }
      return task;
    })
    setToDo(newTask);
  }
  //Cancelar atualização
  const cancelUpdate = () =>{
    setUpdateData('');
  }

  //Mudar tarefa para atualizar
  const changeTask = (e) =>{ 
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status:updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  //Atualizar tarefa
  const updateTask = () =>{
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let updateObject = [...filterRecords,updateData]
    setToDo(updateObject);
    setUpdateData('');
    }  

  return (
    <div className="container App">

    <br /><br />
    <h2>To Do List App (ReactJS)</h2>
    <br /><br />

    {/* Atualizar Tarefa*/}
    {updateData && updateData ? (
      <UpdateForm 
      updateData={updateData}
      changeTask={changeTask} 
      updateTask={updateTask}
      cancelUpdate={cancelUpdate}

      />

    ) : (
      <AddTaskForm
      newTask= {newTask} 
      setNewTask={setNewTask}
      addTask={addTask}
      />
    )}
    
    {/*Mostrar tarefas */}

    {toDo && toDo.length ? '' : 'Sem tarefas...'}

    <ToDo 
      toDo={toDo}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
    />


    </div>
  );
}

export default App;
