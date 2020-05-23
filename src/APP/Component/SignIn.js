import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, CircularProgress, Backdrop, Button, CssBaseline, TextField, Grid, Typography, makeStyles, Container, AppBar, Toolbar } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { LoginCheck } from '../Actions/LoginAction'
export default function SignIn() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const [inputdata, setInputdata] = useState({ phone: '', password: '' });
	const [isLoading, setIsLoading] = useState(false);

	const _handelInputs = (e) => {
		setInputdata({ ...inputdata, [e.target.name]: e.target.value })
	}

	return (
		<React.Fragment>
			<AppBar position="relative">
				<Toolbar>
					<Typography variant="h4" color="inherit" noWrap>
						Smart Lock
					</Typography>
				</Toolbar>
			</AppBar>
			<Container component="main" maxWidth="xs">
				<CssBaseline />

				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						Sign in
				</Typography>
					{/* <form className={classes.form}> */}
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="phone"
						label="Phone Number"
						name="phone"
						autoComplete="phone"
						autoFocus
						onChange={_handelInputs}
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
						onChange={_handelInputs}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={() => {
							setIsLoading(true)
							dispatch(LoginCheck(inputdata))
								.then(res => {
									setIsLoading(false)
									history.push('home')
								})
								.catch(e => {
									setIsLoading(false)
									alert(e)
								})
						}
						}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
						</Grid>
					</Grid>
					{/* </form> */}
				</div>
				<Backdrop className={classes.backdrop} open={isLoading} >
					<CircularProgress color="inherit" />
				</Backdrop>
			</Container>
		</React.Fragment>
	);
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
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));
