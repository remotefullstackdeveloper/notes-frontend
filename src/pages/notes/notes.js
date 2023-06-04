import * as React from 'react';
import { Button, TextField, Grid, Card, CardContent, CardActions, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../store/reducers/auth';
import { getNotes } from '../../store/reducers/notes';
import { MenuActions, SearchInput, FiltersDialog } from "./_"
import moment from 'moment/moment';

const NotesSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),


});
export const Notes = () => {
    let dispatch = useDispatch();
    const [notes, setNotes] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    let token = useSelector(state => state.auth.token);
    let notesList = useSelector(state => state.notes.notesList);
    let loadingNotes = useSelector(state => state.notes.loadingNotes);
    React.useEffect(() => {
        dispatch(getNotes({ token }))
    }, [])
    React.useEffect(() => {
        setNotes([...notesList])
    }, [notesList])

    return (
        <Grid container sx={{ justifyContent: 'center' }}>
            <Grid item xs={12} sx={{ justifyContent: 'flex-end', display: 'flex', pr: 5 }}>
                <FiltersDialog />
                <SearchInput />
                <Link to={'/create-note'}>
                    <Button variant='contained' sx={{ height: '40px' }}> Add Note</Button>
                </Link>
            </Grid>
            {loading ||loadingNotes?
                <Grid container sx={{ p: 4, justifyContent: 'center' }}>
                          <CircularProgress />

                </Grid>
                : notes.length === 0 ?
                    <Grid container sx={{ p: 4, justifyContent: 'center' }}>
                        No Data to Display
                    </Grid> :
                    <TableContainer component={Paper} sx={{ m: 2 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>Title</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>Created at</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>Updated at</TableCell>
                                    <TableCell align="left" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {notes.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.title}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.description}
                                        </TableCell>
                                        <TableCell align="left">{row.status}</TableCell>
                                        <TableCell align="left">{moment(row.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</TableCell>
                                        <TableCell align="left">{moment(row.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</TableCell>
                                        <TableCell align="left"> <MenuActions id={row.id} note={row} /></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}
        </Grid >
    );
}