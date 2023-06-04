import * as React from 'react';
import { Button, TextField, Grid, Card, CardContent, CardActions, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, setUser } from '../../store/reducers/user';
import { API_URL } from '../../utils';


const UserSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required')
});
export const UserProfile = () => {
    const [loading, setLoading] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const user = useSelector(state => state.user.user);

    React.useEffect(() => {
        dispatch(getUser({ token }))
    }, [])
    console.log("user", user)
    return (
        <Grid container sx={{ justifyContent: 'center', marginTop: '5%' }}>
            {isEdit ?
                <Formik
                    initialValues={
                        {
                            firstName: user.firstName,
                            lastName: user.lastName,
                        }
                    }
                    validationSchema={UserSchema}
                    enableReinitialize
                    onSubmit={async (values) => {
                        try {
                            setLoading(true)
                            let res = await axios.patch(`${API_URL}/user`, values, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                            dispatch(setUser(res.data))
                            toast.success('User Updated successfully!')
                            setLoading(false)
                            setIsEdit(false)
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
                                            Update User
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
                                </Grid>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end', pr: 2 }}>
                                <Button sx={{textTransform:'none'}} onClick={() => setIsEdit(false)} >Cancel</Button>
                                <Button type='submit' sx={{textTransform:'none'}} variant="contained">Update</Button>
                            </CardActions>
                        </Card>

                    </form>}
                </Formik> :
                <Card sx={{ minWidth: 275, maxWidth: 500 }}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    First Name: {user?.firstName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Last Name: {user?.lastName}
                                </Typography>
                            </Grid>

                        </Grid>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end', pr: 2 }}>
                        <Button sx={{textTransform:'none'}} onClick={() => setIsEdit(true)}>Edit</Button>
                    </CardActions>
                </Card>}
        </Grid>
    );
}