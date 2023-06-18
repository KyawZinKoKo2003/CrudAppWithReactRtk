import { Box, Button, IconButton, TableBody, TableHead, TextField } from "@mui/material";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useGetTodosQuery, usePutTodosMutation, useDeleteTodosMutation } from "./app/services/apiSlice";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import EditForm from "./app/component/eidtForm";
const App = () => {
  const [putTodos] = usePutTodosMutation();
  const [deleteTodos] = useDeleteTodosMutation();
  const [title, setTitle] = useState<string>("");
  const [id,setId] = useState();
  const [date, setDate] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const titleRef = useRef<HTMLInputElement | null>();
  const noteRef = useRef<HTMLInputElement | null>();
  const dateRef = useRef<HTMLInputElement | null>();
  const { data, isFetching, isLoading, error } = useGetTodosQuery('');

  const handleTitle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setTitle(e.target.value)
  }
  const handleDate = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setDate(e.target.value);
  }
  const handleNote = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setNote(e.target.value);
  }
  const addList = (e: any) => {
    putTodos({ title, dueDate: date, notes: note, status: "incomplete" })
  };
  const handleEdit = (id: any) => {
    setVisible(true)
    setId(id);
  }
  const handleDelete = (id: any) => {
    deleteTodos(id)
  };

  return (

    <>
      {isLoading && <h2>Loading...</h2>}
      {isFetching && <h2>Fetching...</h2>}
      {error && <h2>Error in Fetching data</h2>}
      {data &&

        <Box
          justifyContent="center"
          alignItems="center"
        >
          <h1>Create new todo list</h1>
          <TextField onBlur={(e) => handleTitle(e)} inputRef={titleRef} variant="outlined" label="Title" />
          <TextField onBlur={(e) => handleDate(e)} inputRef={dateRef} type="date" variant="outlined" />

          <TextField onBlur={(e) => handleNote(e)} inputRef={noteRef} type="text" label="Note" variant="outlined" />
          <Button type="submit" aria-label="Date" variant="outlined" color="success" onClick={addList}>Submit</Button>
          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">DueDate</TableCell>
                  <TableCell align="center">Notes</TableCell>
                  <TableCell align="center">Option</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  data?.map((todo: any) => {
                    return (
                      <TableRow key={todo.id}>
                        <TableCell align="center">{todo.id}</TableCell>
                        <TableCell align="center">{todo.title}</TableCell>
                        <TableCell align="center" >{todo.status}</TableCell>
                        <TableCell align="center">{todo.dueDate}</TableCell>
                        <TableCell align="center">{todo.notes}</TableCell>
                        <TableCell align="center"><Button variant="contained" onClick={() => handleEdit(todo.id)}>Edit</Button></TableCell>
                        <TableCell align="center"><Button variant="contained" onClick={() => handleDelete(todo.id)} color="error">Delete</Button></TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
                {visible && <EditForm id={id}/>}
        </Box>
      }
    </>
  )
}
export default App;