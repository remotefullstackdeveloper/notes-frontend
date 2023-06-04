import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { Grid, MenuItem, Select } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from '../../../../store/reducers/notes';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export function FiltersDialog() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)

    const [open, setOpen] = React.useState(false);
    const [valueCreatedAt, setValueCreatedAt] = React.useState(moment());
    const [valueUpdatedAt, setValueUpdateAt] = React.useState(moment());

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [status, setStatus] = React.useState('all');

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };
    const handleApplyFilters = () => {
        try {
            let filter = ``

            if (status !== 'all') {
                filter = `?status=${status}`
            }
            if (valueCreatedAt) {
                filter = filter + `${filter.length > 1 ? '&' : '?'}createdAt=${valueCreatedAt.format('YYYY-MM-DD').toString()}&`
            }
            if (status !== 'all') {
                filter = filter + `updatedAt=${valueCreatedAt.format('YYYY-MM-DD').toString()}`
            }
            dispatch(getNotes({ token, filters: filter }))
            handleClose()
        } catch (error) {

        }
    }

    return (
        <div>
            <Button variant="outlined" sx={{ height: '40px', mr: 2 }} onClick={handleClickOpen}>
                <TuneIcon /> Filters
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Apply Filters
                </BootstrapDialogTitle>
                <DialogContent >
                    <Grid container spacing={2} sx={{ width: '270px', mx: 5, mt: 2 }}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                fullWidth
                                label="Status"
                                onChange={handleChangeStatus}
                            >
                                <MenuItem value={'all'}>All</MenuItem>
                                <MenuItem value={'done'}>Done</MenuItem>
                                <MenuItem value={'undone'}>Undone</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <DatePicker fullWidth value={valueCreatedAt} onChange={(newValue) => setValueCreatedAt(newValue)} />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <DatePicker fullWidth value={valueUpdatedAt} onChange={(newValue) => setValueUpdateAt(newValue)} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ textDecoration: 'none' }} onClick={handleApplyFilters}>
                        Apply Filter
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div >
    );
}