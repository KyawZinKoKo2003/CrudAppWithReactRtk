import { TextField,Button } from "@mui/material";
import { useState } from "react";
import { useUpdateMutation,useGetTodosQuery } from "../services/apiSlice"
 const EditForm = (id:any) =>{
    const {data:list,isLoading} =useGetTodosQuery('');
    const [updateItem] = useUpdateMutation();
    const [formData,setFormData] = useState({
        title: list?.title || "",
        dueDate: list?.dueDate || "",
        notes: list?.notes || " ",
        status: list?.status || "incomplete"
    })
    const handleSubmit = () =>{
       updateItem(formData);
    };
    const handleInputChange = (e:any) =>{
        setFormData((prevData:any) =>({
            ...prevData,
            [e.target.name] : e.target.value
        }));
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <TextField type="text" onChange={handleInputChange} name="title" />
            <TextField type="date" name="date" onChange={handleInputChange}/>
            <TextField type="text" name="note" onChange={handleInputChange}/>
            <Button variant="contained" color="success" type="submit">Update</Button>
        </form>
        </>
    )
}
export default EditForm;