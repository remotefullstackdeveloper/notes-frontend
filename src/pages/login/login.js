import * as React from 'react';
import { Button, TextField, Grid, Card, CardContent, CardActions, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/reducers/auth';
import { toast } from 'react-toastify';
import { API_URL } from '../../utils';


const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required'),


});
export const Login = () => {
    const [loading, setLoading] = React.useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const handleClickLogin = () => {
        navigate('/home')
    }
    return (
        <Grid container sx={{ justifyContent: 'center',marginTop:'5%' }}>
            <Formik
                initialValues={
                    {
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                    }
                }
                validationSchema={LoginSchema}
                enableReinitialize
                onSubmit={async (values, { setErrors }) => {
                    try {
                        setLoading(true)
                        let res = await axios.post(`${API_URL}/auth/login`, values);
                        console.log("response", res.data.auth_token)
                        dispatch(setToken(res.data.auth_token))
                        toast.success('User logged in Successfully')

                        setLoading(false)
                        navigate("/");

                    } catch (error) {
                        console.log(error)
                        console.log(error.message)
                        toast.error(error.response.data.message)
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
                                        Login
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField label="Email" name='email' value={formik.values.email} onChange={formik.handleChange} variant="outlined" fullWidth
                                      error={
                                        Boolean(formik.errors.email && formik.touched.email)
                                    }
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.errors.email &&
                                        formik.touched.email &&
                                        String(formik.errors.email)
                                    }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Password" name='password' value={formik.values.password} onChange={formik.handleChange} variant="outlined" fullWidth 
                                      error={
                                        Boolean(formik.errors.password && formik.touched.password)
                                    }
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.errors.password &&
                                        formik.touched.password &&
                                        String(formik.errors.password)
                                    }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    Don't have an account? <Link to='/signup'>Signup</Link>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-end', pr: 2 }}>
                            <Button type='submit' variant="contained">Login</Button>
                        </CardActions>
                    </Card>

                </form>}
            </Formik>

        </Grid>
    );
}