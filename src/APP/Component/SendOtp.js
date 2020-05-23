import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/Menu';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {TextField,FormControlLabel,Checkbox,Button} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import DrawerComponent from '../Common/DrawerComponent';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
// https://www.sms4india.com/api/v1/sendCampaign?apikey=FFPMX0ASKIEIR1IA4HX2YQWN7GI2EOFS&secret=7KGWE2RGRSIZA119&usetype=stage&senderid=TestSms&phone=7048645818&message=test
export default function SendOtp() {
    const [DrawerIsOpen, setDrawerIsOpen] = useState(false);
    const classes = useStyles();
    const history = useHistory();

    const _onClose = () => {
        setDrawerIsOpen(false);
    }

    if (!JSON.parse(localStorage.getItem('user'))) {
        history.push('/')
    }

    return (
        <React.Fragment>
            <CssBaseline />

            <DrawerComponent open={DrawerIsOpen} close={_onClose} screen={'SendOtp'}></DrawerComponent>

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
                    <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
             
            </Grid>
            <Grid item>
           
            </Grid>
          </Grid>
        </form>
                
                    </Container>
                </div>
            </main>
        </React.Fragment>
    );
}





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
