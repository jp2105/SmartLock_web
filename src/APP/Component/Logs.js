import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/Menu';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import DrawerComponent from '../Common/DrawerComponent';
import firebase from 'firebase';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';

export default function Logs() {
    const [DrawerIsOpen, setDrawerIsOpen] = useState(false);
    const [allLogs, setAllLogs] = useState([]);
    const [isloading, setIsloading] = useState(true);
    const classes = useStyles();
    const history = useHistory();
    const _sorting = (a, b) => {
        if (a.time < b.time) {
            return 1;
        } else if (a.time < b.time) {
            return -1;
        } else {
            return 0;
        }
    }
    useEffect(
        () => {
            var arr = [];
            try {
                firebase.firestore()
                    .collection("logs")
                    .onSnapshot((doc) => {
                        doc.forEach(temp => {
                            arr.push(temp.data());
                        })
                        // moment((row.time.toDate())).format('MMM Do YYYY, h:mm:ss a')
                        setAllLogs((_.sortBy(arr,['time'])).reverse());
                        setIsloading(false);
                    });
            } catch (e) {
                console.log(e)
            }
        }, []
    )

    const _onClose = () => {
        setDrawerIsOpen(false);
    }

    if (!JSON.parse(localStorage.getItem('user'))) {
        history.push('/')
    }

    return (
        <React.Fragment>
            <CssBaseline />

            <DrawerComponent open={DrawerIsOpen} close={_onClose} screen={'Logs'}></DrawerComponent>

            <AppBar position="relative">
                <Toolbar>
                    <span onClick={() => setDrawerIsOpen(true)}>
                        <CameraIcon className={classes.icon} />
                    </span>
                    <Typography variant="h4" color="inherit" noWrap>
                        Smart Lock
					</Typography>
                </Toolbar>
            </AppBar>

            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">

                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            All Logs
						</Typography>

                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            List of users with time and date how has access lock.
						</Typography>

                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="customized table">

                                        <TableHead >
                                            <TableRow >
                                                <StyledTableCell style={{ backgroundColor: '#3498DB' }}>Name</StyledTableCell>
                                                <StyledTableCell style={{ backgroundColor: '#3498DB' }} align="right">Time</StyledTableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {allLogs.length > 0 &&
                                                allLogs.map(row => {
                                                    return (
                                                        <StyledTableRow key={row.name}>
                                                            <StyledTableCell component="th" scope="row">
                                                                {row.name}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="right">{moment((row.time.toDate())).format('MMM Do YYYY, h:mm:ss a')}</StyledTableCell>

                                                        </StyledTableRow>
                                                    )
                                                })}
                                            <Backdrop className={classes.backdrop} open={isloading}>
                                                <CircularProgress color="inherit" />
                                            </Backdrop>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </main>
        </React.Fragment>
    );
}
const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);


const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
        backgroundColor: 'red'
    },
    table: {
        minWidth: 30,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
