import * as React from 'react';
import { Button, TextField, Grid, Card, CardContent, CardActions, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../store/reducers/auth';
import { getNoteById } from '../../store/reducers/notes';
import { API_URL } from '../../utils';


const NotesSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),


});
export const NotesForm = () => {
    const [loading, setLoading] = React.useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { id } = useParams();

    let token = useSelector(state => state.auth.token);
    let currentNote = useSelector(state => state?.notes?.currentNote);
    console.log("id", id, currentNote)
    React.useEffect(() => {
        if (id) {
            dispatch(getNoteById({ token, id }))
        }
    }, [id])
    React.useEffect(() => { console.log("currentNote", currentNote) }, [currentNote])
    return (
        <Grid container sx={{ justifyContent: 'center' }}>
            <Formik
                initialValues={
                    currentNote ? {
                        title: currentNote.title,
                        description: currentNote.description,
                    } : {
                        title: '',
                        description: '',

                    }
                }
                validationSchema={NotesSchema}
                enableReinitialize
                onSubmit={async (values, { setErrors }) => {
                    console.log("error", values)
                    try {
                        setLoading(true)
                        let res = currentNote ?
                            await axios.patch(`${API_URL}/note/${id}`, { ...values, id: id }, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }) :
                            await axios.post(`${API_URL}/note`, values, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                        setLoading(false)
                        navigate("/");

                    } catch (error) {
                        console.log(error)
                        console.log(error.message)
                        console.log(error.response.data.message)
                        setLoading(false)
                    }
                }}


            >
                {(formik) => <form onSubmit={formik.handleSubmit}>

                    <Card sx={{ minWidth: 275, maxWidth: 500 }}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                        {currentNote ? 'Update Note' : 'Create Note'}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField label="Title" name='title' value={formik.values.title} onChange={formik.handleChange} variant="outlined" fullWidth
                                        error={
                                            Boolean(formik.errors.title && formik.touched.title)
                                        }
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.errors.title &&
                                            formik.touched.title &&
                                            String(formik.errors.title)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Description" name='description' value={formik.values.description} onChange={formik.handleChange} variant="outlined" fullWidth
                                        error={
                                            Boolean(formik.errors.description && formik.touched.description)
                                        }
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.errors.description &&
                                            formik.touched.description &&
                                            String(formik.errors.description)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-end', pr: 2 }}>
                            <Link style={{ textDecoration: 'none', paddingRight: 8 }} to='/'>Cancel</Link>
                            <Button sx={{ textTransform: 'none' }} type='submit' variant="contained">{currentNote ? 'Update' : 'Save'}</Button>
                        </CardActions>
                    </Card>

                </form>}
            </Formik>

        </Grid>
    );
}