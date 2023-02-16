import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import List from './List';
import './TodoList.css';
import swal from 'sweetalert';

//GET DATA FROM LOCAL STORAGE

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  }
  else {
    return [];
  }
}

function TodoList() {

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [togglebtn, setToggleBtn] = useState(true);
  const [isEditItemId, setIsEditItemId] = useState(null);

  const changeHandler = (e) => {
    setInputData(e.target.value);
  }

  // ADD ITEMS

  const addItem = () => {

    if (!inputData) {
      swal({
        title: "Error!",
        text: "You did not write anything",
        icon: "error",
        button: "Ok!",
      });
    }
    else if (inputData && !togglebtn) {
      const changeData =items.map((elem) => {
        if (elem.id === isEditItemId) {
          return {...elem, name: inputData }
        }
        return elem;
      })
      setItems(changeData)
      setInputData("");
      setToggleBtn(true);
    }
    else {
      const convertData = { id: new Date().getTime().toString(), name: inputData, completed:false}
      setItems([...items, convertData]);
      setInputData("");
    }
  }

  // DELETE ITEMS

  const deleteItem = (index) => {
    console.log(index);
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    })
    setItems(updatedItems);
  };

  //EDIT ITEM

  const editItem = (index) => {
    var newEditItem = items.find((elem) => {
      // console.log(ele);
      return elem.id === index;
    });
    console.log(newEditItem);

    setToggleBtn(false);
    setInputData(newEditItem.name);
    setIsEditItemId(newEditItem.id);
  }

  //COMPLETED ITEM

  const completeItem=(index)=>{
    console.log(index);
    const newComItem = items.map((elem)=>{
      if(elem.id === index)
      {
        return {...elem,completed: !elem.completed}
      }
      return elem;
    })
    setItems(newComItem);
  }

  //REMOVE ALL

  const removeAll = () => {
    setItems([]);
  }

  // ADD DATA TO LOCAL STORAGE

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items))
  }, [items])



  return (
    <div className='main_div'>
      <div className='header'><h2>ToDo List</h2></div>
      <div className='inputButton'>
        <input type="text" placeholder='Add Your ToDO' value={inputData} onChange={changeHandler} />
        {
          (togglebtn === true) ? <Button variant="outlined" className='btn' onClick={addItem}><AddIcon className='icon' /></Button> : <Button variant="outlined" className='btn' onClick={addItem}><DoneOutlineOutlinedIcon className='icon' /></Button>
        }
        
          {
            items.map((elem) => {
              return <List value={elem.name} id={elem.id} key={elem.id} com={elem.completed} onDelete={deleteItem} onEdit={editItem} onComplete={completeItem}/>
            })
          }
        
      </div>
      <Button variant="contained" color="success" className='bt' onClick={removeAll}>
        Remove All
      </Button>
    </div>
  )
}

export default TodoList

