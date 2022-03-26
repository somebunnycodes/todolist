import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

  const [newToDo, setNewToDo] = useState("");
  const [toDos, setToDos] = useState(() => {
    const saved = localStorage.getItem("myToDoList");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const handleChangeNewToDo = (e) => {
    setNewToDo(e.target.value);
  }

  const handleAddToDo = (e) => {
    e.preventDefault();
    const newArray = [...toDos, {
      label: newToDo, 
      completed: false
    }];
    setToDos(newArray);
    setNewToDo("");
  }

  const handleToggleToDoCompleted = (i) => {
    setToDos(toDos.map((toDo, index) => {
      if (i === index) {
        toDo.completed = !toDo.completed;
      }
      return toDo;
    }));
  }

  const handleDeleteToDo = (e, i) => {
    e.preventDefault();
    setToDos(toDos.filter((toDo, index) => {
      return i !== index;
    }))
  }
  
  useEffect(() => {
    localStorage.setItem("myToDoList", JSON.stringify(toDos));
  }, []);

  return (
    <div className="App">
      <form>
        <input 
          type="text" 
          onChange={handleChangeNewToDo}
          value={newToDo}
        />
        <button onClick={handleAddToDo}>Add To Do</button>
      </form>

      {toDos.map((toDo, i)=>{
        const className = toDo.completed ? "strikeThrough" : "";
        return (
        <form>
          <input type="checkbox" checked={toDo.completed} onChange={e => handleToggleToDoCompleted(i)}/>
          <span className={className}>{toDo.label}</span>
          <button onClick={e => handleDeleteToDo(e, i)}>Delete To Do</button>
        </form>)
      })}
    </div>
  );
}



export default App;
