import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AddUser from '../Component/AddUser'
import SignIn from '../Component/SignIn'
import Home from '../Component/Home'
import AllUsers from '../Component/AllUsers'
import Logs from '../Component/Logs';
import SendOtp from '../Component/SendOtp';


export const Navigation = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/'>
					<SignIn/>
				</Route>
				<Route exact path='/AddUser'>
					<AddUser/>
				</Route>
				<Route exact path='/home'>
					<Home/>
				</Route>
				<Route exact path='/AllUsers'>
					<AllUsers/>
				</Route>
				<Route exact path='/Logs'>
					<Logs/>
				</Route>
				<Route exact path='/SendOtp'>
					<SendOtp/>
				</Route>
			</Switch>
		</BrowserRouter>
	)
}
