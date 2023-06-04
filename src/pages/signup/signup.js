import * as React from 'react';
import { Button, TextField, Grid, Card, CardContent, CardActions, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../utils';


const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required'),


});
export const Signup = () => {
    const [loading, setLoading] = React.useState(false);
    let navigate = useNavigate();
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
                validationSchema={SignUpSchema}
                enableReinitialize
                onSubmit={async (values) => {
                    console.log("error", values)
                    try {
                        setLoading(true)
                        let res = await axios.post(`${API_URL}/auth/signup`, values);
                        toast.success('User registered successfully!')
                        setLoading(false)
                        navigate('/login')

                    } catch (error) {
                        toast.error(error.response.data.message)
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
                                        Signup
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="FirstName" name='firstName' value={formik.values.firstName} onChange={formik.handleChange} variant="outlined" fullWidth
                                        error={
                                            Boolean(formik.errors.firstName && formik.touched.firstName)
                                        }
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.errors.firstName &&
                                            formik.touched.firstName &&
                                            String(formik.errors.firstName)
                                        } />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="LastName" name='lastName' value={formik.values.lastName} onChange={formik.handleChange} variant="outlined" fullWidth
                                        error={
                                            Boolean(formik.errors.lastName && formik.touched.lastName)
                                        }
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.errors.lastName &&
                                            formik.touched.lastName &&
                                            String(formik.errors.lastName)
                                        } />
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
                                        } />
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
                                        } />
                                </Grid>
                                <Grid item xs={12}>
                                    Already have an account? <Link to='/login'>Login</Link>

                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-end', pr: 2 }}>
                            <Button type='submit' variant="contained">Signup</Button>
                        </CardActions>
                    </Card>

                </form>}
            </Formik>

        </Grid>
    );
}