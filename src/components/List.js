import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import "./List.css";
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

function List(props) {

    console.log(props);

    return (
        <ol className={`list ${props.com ? "tick" : ""}`} key={props.id}>
            <DeleteIcon className='dt' onClick={() => { props.onDelete(props.id) }} />
            <li className={`ls ${props.com ? "tick" : ""}`}>{props.value}</li>
            <EditIcon className='edit' onClick={()=> {props.onEdit(props.id)}} />
            <CheckCircleOutlinedIcon className='complete' onClick={()=> {props.onComplete(props.id)}}/>
        </ol>
    )
}

export default List