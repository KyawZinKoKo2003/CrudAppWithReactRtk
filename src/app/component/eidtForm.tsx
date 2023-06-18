import { TextField,Button } from "@mui/material";
import { useState } from "react";
import { setConstantValue } from "typescript";
import { useUpdateMutation,useGetTodosQuery, useGetTodosByIdQuery } from "../services/apiSlice"
 const EditForm = ({id}:{id:any}) =>{
    const {data}= useGetTodosByIdQuery(id)
    const [updateItem] = useUpdateMutation();
    const [title,setTitle] = useState<string>("");
    const [notes,setNotes] = useState<string>("");
    const [dueDate,setdueDate] = useState<string>("");
    const handleSubmit = async(e:any) =>{
       e.preventDefault();
       try{
        await updateItem({id,title,dueDate,notes,status:"incomplete"});
       }
       catch(error){
        console.log("error",error)
       }
    };
    return(
        <>
        {console.log(title)}
        <form onSubmit={handleSubmit}>
            <TextField type="text" value={ title} onChange={e =>setTitle(e.target.value)} />
            <TextField type="date"  value={dueDate} onChange={e =>setdueDate(e.target.value)}/>
            <TextField type="text" value={ notes} onChange={e =>setNotes(e.target.value)}/>
            <Button variant="contained" color="success" type="submit">Update</Button>
        </form>
        </>
    )
    
}
export default EditForm;