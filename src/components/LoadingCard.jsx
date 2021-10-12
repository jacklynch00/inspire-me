import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardHeader, Avatar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	title: {
		animation: '$loading .75s linear infinite alternate',
		width: '200px',
		height: '20px',
		borderRadius: '3px',
		margin: '2px 0',
	},
	subheader: {
		animation: '$loading .75s linear infinite alternate',
		width: '100px',
		height: '20px',
		borderRadius: '3px',
		margin: '2px 0',
	},
	mediaImage: {
		animation: '$loading .75s linear infinite alternate',
		width: '100%',
	},
	contentText: {
		animation: '$loading .75s linear infinite alternate',
		height: '20px',
		margin: '2px 0',
		borderRadius: '3px',
	},
	contentTextLast: {
		animation: '$loading .75s linear infinite alternate',
		height: '20px',
		margin: '2px 0',
		width: '70%',
		borderRadius: '3px',
	},
	'@keyframes loading': {
		'0%': {
			backgroundColor: 'hsl(0, 0%, 80%)',
		},
		'100%': {
			backgroundColor: 'hsl(0, 0%, 90%)',
		},
	},
});

const LoadingCard = () => {
	const classes = useStyles();

	return (
		<Card elevation={3}>
			<CardHeader classes={{ title: classes.title, subheader: classes.subheader }} title={''} subheader={''} avatar={<Avatar sx={{ bgColor: '#f00' }}>{''}</Avatar>} />
			<CardMedia classes={{ img: classes.mediaImage }} component='img' height='140' />
			<CardContent>
				<Typography classes={{ root: classes.contentText }}>{''}</Typography>
				<Typography classes={{ root: classes.contentText }}>{''}</Typography>
				<Typography classes={{ root: classes.contentTextLast }}>{''}</Typography>
			</CardContent>
		</Card>
	);
};

export default LoadingCard;
