import React, { useState } from 'react';
import { AppBar, Toolbar, Drawer, Typography, List, ListItem, ListItemText, ListItemIcon, makeStyles, IconButton, Container } from '@material-ui/core';
import { FormatQuoteOutlined, HomeOutlined, Menu } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100vh',
		},
		page: {
			backgroundColor: '#f9f9f9',
			padding: theme.spacing(3),
			flex: 1,
		},
		drawer: {
			width: drawerWidth,
			padding: 20,
		},
		drawerTitle: {
			padding: 20,
		},
		appbar: {},
		toolbar: theme.mixins.toolbar,
		menuIcon: {
			color: '#fff',
		},
		active: {
			background: '#ccc',
		},
		footer: {
			bottom: 0,
		},
	};
});

const Layout = ({ children }) => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const [drawerOpen, setDrawerOpen] = useState(false);

	const menuItems = [
		{
			text: 'Home',
			icon: <HomeOutlined color='primary' />,
			path: '/',
		},
		{
			text: 'All Quotes',
			icon: <FormatQuoteOutlined color='primary' />,
			path: '/all-quotes',
		},
	];

	return (
		<>
			<div className={classes.root}>
				<AppBar className={classes.appbar} elevation={0}>
					<Toolbar>
						<IconButton onClick={() => setDrawerOpen(true)}>
							<Menu className={classes.menuIcon} />
						</IconButton>
						<Typography variant='h5'>InspireMe</Typography>
					</Toolbar>
				</AppBar>

				{/* Side Drawer */}
				<Drawer className={classes.drawer} anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
					<div className={classes.drawerTitle}>
						<Typography variant='h4' className={classes.title}>
							Inspire Me
						</Typography>
					</div>

					<List>
						{menuItems.map((el) => {
							return (
								<ListItem
									key={el.text}
									button
									onClick={() => {
										history.push(el.path);
										setDrawerOpen(false);
									}}
									className={location.pathname === el.path ? classes.active : null}>
									<ListItemIcon>{el.icon}</ListItemIcon>
									<ListItemText primary={el.text}></ListItemText>
								</ListItem>
							);
						})}
					</List>
				</Drawer>

				{/* Children */}
				<div className={classes.page}>
					<div className={classes.toolbar}></div>
					{children}
				</div>

				<AppBar position='static' color='primary'>
					<Container>
						<Toolbar>
							<Typography variant='body1' color='inherit'>
								© 2021 Jack Lynch
							</Typography>
						</Toolbar>
					</Container>
				</AppBar>
			</div>
		</>
	);
};

export default Layout;
