import React, { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DrawerComponent from '../Common/DrawerComponent'
import CameraIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';

import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	makeStyles,
	Container,
	AppBar,
	Toolbar,
	Input
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import firebase from 'firebase'

export default function AddUser() {
	const [DrawerIsOpen, setDrawerIsOpen] = useState(false);
	const [isSend, setIsSend] = useState(false)
	const [inputs, setInputs] = useState({})
	const history = useHistory();
	const dispatch = useDispatch();
	const selector = useSelector(state => state.LoginReducer);
	console.log(selector)
	const classes = useStyles();
	const _onClose = () => {
		setDrawerIsOpen(false);
	}
	const handelSendOtp = () => {
		if (!isNaN(inputs.phone) && inputs.phone.length === 10) handleLogin()
		else alert('please enter correct phone number')
	}
	const handelInputs = (e) => {
		e.preventDefault()
		setInputs({ ...inputs, [e.target.name]: e.target.value })
	}

	useEffect(() => {
		try {
			window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
				'recaptcha-container',
				{
					size: 'normal',
					callback: response => {
					},
					'expired-callback': response => {
						alert('Recaptcha Exprie Please try agian')
					}
				}
			)
		} catch (e) {
			alert('something went worng')
		}
		window.recaptchaVerifier.render().then(function (widgetId) {
			window.recaptchaWidgetId = widgetId
		})
	}, [])

	const handleLogin = () => {
		var appVerifier = window.recaptchaVerifier;
		firebase
			.auth()
			.signInWithPhoneNumber(`+91 ${inputs.phone}`, appVerifier)
			.then(confirmationResult => {
				setIsSend(true)
				window.confirmationResult = confirmationResult;
			})
			.catch(err => {
				console.log(err);
				alert('something went worng')
			});
	}

	const handleOTPCheck = () => {
		window.confirmationResult
			.confirm(inputs.otp)
			.then(function (result) {
				console.log(result);
				var data = { ...inputs, uid: result.user.uid }
				console.log(data);
				console.log(result.additionalUserInfo.isNewUser);
				if (result.additionalUserInfo.isNewUser) {
					firebase.firestore().collection('users').doc(result.user.uid).set(data)
						.then(() => {
							alert('User added');
							history.push('/home')
						}
						).catch(e=>console.log(e))

				} else {
					alert('phone number already addded');
					history.push('/home')
				}

			})
			.catch(function (error) {
				console.log(error)
			});
	};

	if (!JSON.parse(localStorage.getItem('user'))) {
		history.push('/')
	}
	var data=JSON.parse(localStorage.getItem('user'));
	if(!data.hasOwnProperty('role')){
		alert('only admin can add new users')
		history.push('home');
	}
	return (
		<React.Fragment>
			<CssBaseline />
			<DrawerComponent open={DrawerIsOpen} close={_onClose} screen={'AddUser'}></DrawerComponent>
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
			<Container component="main" maxWidth="xs">
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						Add New User
					</Typography>
					{!isSend &&
						<form className={classes.form} >
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="name"
								label="Full Name"
								name="name"
								autoComplete="name"
								autoFocus
								value={inputs.name}
								onChange={handelInputs}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="phone"
								label="Phone Number"
								name="phone"
								autoComplete="phone"
								value={inputs.phone}
								onChange={handelInputs}
							/>
							<div id="recaptcha-container" style={{ padding: 10 }} />
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
								value={inputs.password}
								onChange={handelInputs}
							/>
							<Button
								type="button"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={() => handelSendOtp()}
							>
								Send OTP
						</Button>
						</form>
					}
					{
						isSend &&
						<form className={classes.form}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									OTP is sended to {inputs.phone} number. <u onClick={() => { setIsSend(false) }}> Change number</u>
								</Grid>
							</Grid>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="otp"
								label="OTP Number"
								name="otp"
								autoComplete="otp"
								value={inputs.otp}
								onChange={handelInputs}
							/>
							<Button
								type="button"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={() => handleOTPCheck()}
							>
								Add User
							</Button>
							<Grid container>
								<Grid item xs>
								</Grid>
							</Grid>
						</form>
					}
				</div>
			</Container>
		</React.Fragment>
	)
}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	icon: {
		marginRight: theme.spacing(2),
	}
}))
