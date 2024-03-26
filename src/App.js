import './App.css';
import TaskForm from './taskform';
import TaskList from './tasklist';
import  { useState,useEffect } from "react";
import ReactPaginate from 'react-paginate';


function App() {

  const [tasks,setTasks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 5;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(tasks.length / itemsPerPage);

  const changePage = ({selected}) => {
    setPageNumber(selected);
  }
  
  useEffect(()=>{
    if(tasks.length === 0) return;
     localStorage.setItem("tasks",JSON.stringify(tasks));
  },[tasks]);

  useEffect(()=>{
     const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      setTasks(storedTasks || []);
  },[]);

  function addTask(name) {
    setTasks( prev=>{
      return [...prev,{name:name,done:false}];
    });
  }

  function updateTaskDone(taskIndex, newDone){
    setTasks(prev=>{
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;  
    })
  }

  function deleteTask(taskIndex){
    setTasks(prev=>{
      return prev.filter((taskObject,index)=> index !== taskIndex);
    })
  }

  

  const numTasks = tasks.filter(t=>t.done).length;
  const taskTotal = tasks.length;

  function getMessage() {
    const percentage = Math.round(numTasks/taskTotal*100);
     
    if (percentage === 0) {
      return "You're not done yet, Try to do atleast one  🙏";
    }
    if (percentage === 100) {
      return 'Nice job for today! 🏝';
    }
    return 'Keep it going 💪🏻...';

  }

 

  return (
  
   <div className="main">
    <h1>{numTasks}/{taskTotal} Complete </h1>
    <h2>{getMessage()}</h2>
    <div className="taskform">
      <TaskForm  onAdd={addTask}/>
    </div>
     {
        tasks.length?(
        tasks
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map((task,index)=>{
          return <TaskList  {...task}
          onTrash={()=> deleteTask(index)}
          onToggle={done => updateTaskDone(index, done)}/>
        })):(<div>No tasks </div>)
     } 
     
        {
          tasks.length > itemsPerPage && <div className="pagination">
            <ReactPaginate 
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationContainer"}
            previousLinkClassName={"prevBtn"}
            nextLinkClassName={"nextBtn"}
            activeClassName={"activePagination"}
            />
          </div> 

        }

   </div>
  );
}

export default App;
