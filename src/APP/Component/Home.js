import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DrawerComponent from '../Common/DrawerComponent';
import firebase from 'firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

export default function Home() {
	const [DrawerIsOpen, setDrawerIsOpen] = useState(false);
	const [loadingLock, setloadingLock] = useState(false);
	const [loadingUnLock, setloadingUnLock] = useState(false);
	const [lock, setLock] = useState(null);

	const history = useHistory();
	const classes = useStyles();

	const _onClose = () => {
		setDrawerIsOpen(false);
	}
	useEffect(() => {
		setloadingLock(true);
		setloadingUnLock(true);
		firebase.database().ref('/').on('value',snapshot => {
			setLock(snapshot.val().servo);
				setloadingLock(false);
				setloadingUnLock(false);
		});
	}, [])
	const _onHandelLock = (status) => {
		if (status) {
			setloadingLock(true)
		} else {
			setloadingUnLock(true)
		}
		firebase.database().ref('/').set({
			servo: status
		}).then((res) => {
			debugger
			var data = JSON.parse(localStorage.getItem('user'));
			var temp = {
				uid: data.uid,
				name: data.name,
				phone: data.phone,
				time: new Date()
			}
			firebase.firestore().collection('logs').doc().set(temp)
				.then(() => {
					setLock(status)
					if (status) {
						setloadingLock(false)
					} else {
						setloadingUnLock(false)
					}
				}
				).catch(e => console.log(e))
		})
	}

	if (!JSON.parse(localStorage.getItem('user'))) {
		history.push('/')
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<DrawerComponent open={DrawerIsOpen} close={_onClose} screen={'Home'}></DrawerComponent>
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
							Control Lock
						</Typography>
						<Typography variant="h5" align="center" color="textSecondary" paragraph>
							You can lock or unlock you lock from here.
						</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justify="center">
								<Grid item>
									<Button disabled={lock ? true : false} onClick={() => _onHandelLock(true)} variant={!lock ? "contained" : 'outlined'} color="primary">
										{loadingLock ?
											<CircularProgress size='1.5rem' color="inherit" />
											:
											'Lock'
										}

									</Button>
								</Grid>
								<Grid item>
									<Button disabled={!lock ? true : false} onClick={() => _onHandelLock(false)} variant={lock ? "contained" : 'outlined'} color="primary">
										{loadingUnLock ?
											<CircularProgress size='1.5rem' color="inherit" />
											:
											'Un-Lock'
										}
									</Button>
								</Grid>
							</Grid>
						</div>
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
	},

}));
