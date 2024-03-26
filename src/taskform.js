import  { useState } from "react";

export default function TaskForm({onAdd}) {
  
    const [taskname,setTaskname] = useState("");
    function handleSubmit(ev) {
      ev.preventDefault();
      onAdd(taskname);
      setTaskname("");
    } 

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add your next task here"
          value={taskname}
          onChange={ev => setTaskname(ev.target.value)}
        />
        <button>+</button>
      </form>
    );

}