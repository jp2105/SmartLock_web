import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';

const DrawerComponent = (props) => {
	const [DrawerIsOpen, setDrawerIsOpen] = useState(props.open);
	const history = useHistory();
	const list = () => (
		<div style={{ width: '30vw' }}
			role="presentation"
		>
			<List
				onClick={() => history.push('home')}
			>
				<ListItem button key={'Home'}>
					<ListItemText style={{ color: props.screen === 'Home' ? 'blue' : 'black' }} primary={'Home'} />
				</ListItem>
			</List>
			<Divider />
			<List
				onClick={() => history.push('AddUser')}
			>
				<ListItem button key={'Add User'}>
					<ListItemText style={{ color: props.screen === 'AddUser' ? 'blue' : 'black' }} primary={'Add User'} />
				</ListItem>
			</List>
			<Divider />

			<List
				onClick={() => history.push('Logs')}
			>
				<ListItem button key={'Show Logs'}>
					<ListItemText style={{ color: props.screen === 'Logs' ? 'blue' : 'black' }} primary={'Show Logs'} />
				</ListItem>
			</List>
			<Divider />
			{/*<List*/}
			{/*onClick={() => history.push('SendOtp')}*/}
			{/*>*/}
			{/*	<ListItem button key={'Send OTP'}>*/}
			{/*		<ListItemText style={{ color: props.screen === 'SendOtp' ? 'blue' : 'black' }} primary={'Send OTP'} />*/}
			{/*	</ListItem>*/}
			{/*</List>*/}
			<Divider />
			<List
				onClick={() => history.push('AllUsers')}
			>
				<ListItem button key={'All Users'}>
					<ListItemText style={{ color: props.screen === 'AllUsers' ? 'blue' : 'black' }} primary={'All Users'} />
				</ListItem>
			</List>
			<List
				onClick={() => {
					localStorage.setItem('user', null);
					history.push('/')
				}}
			>
				<ListItem button key={'Logout'}>
					<ListItemText style={{ color: props.screen === 'logout' ? 'blue' : 'black' }} primary={'Logout'} />
				</ListItem>
			</List>

		</div>
	);

	return (
		<Drawer open={props.open} onClose={() => props.close()}>
			{list()}
		</Drawer>
	)
}
export default React.memo(DrawerComponent)
