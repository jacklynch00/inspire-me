import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Container, Grid, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';
import _ from 'lodash';

import QuoteCard from '../../components/QuoteCard';
import LoadingCard from '../../components/LoadingCard';
import image1 from '../../assets/images/home-background-1.jpeg';
import image2 from '../../assets/images/home-background-2.jpeg';
import image3 from '../../assets/images/home-background-3.jpeg';

const useStyles = makeStyles({
	heroSection: {
		backgroundColor: '#ddd',
		height: '300px',
		borderRadius: '10px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
});

const Home = () => {
	const classes = useStyles();
	const history = useHistory();
	const [quote1, setQuote1] = useState({});
	const [quote2, setQuote2] = useState({});
	const [quote3, setQuote3] = useState({});

	useEffect(() => {
		axios
			.get('https://quote-garden.herokuapp.com/api/v3/quotes/random')
			.then((resp) => {
				setQuote1(resp.data.data[0]);
			})
			.catch((e) => console.log(e));

		// Get quote 2
		axios
			.get('https://quote-garden.herokuapp.com/api/v3/quotes/random')
			.then((resp) => {
				setQuote2(resp.data.data[0]);
			})
			.catch((e) => console.log(e));

		// Get quote 3
		axios
			.get('https://quote-garden.herokuapp.com/api/v3/quotes/random')
			.then((resp) => {
				setQuote3(resp.data.data[0]);
			})
			.catch((e) => console.log(e));
	}, [setQuote1, setQuote2, setQuote3]);

	return (
		<Container>
			<Grid container spacing={3}>
				<Grid item sm={12} className={classes.heroSection}>
					<Typography variant='h1' align='center'>
						Welcome to InspireMe!
					</Typography>
					<Typography variant='h6' align='center'>
						A laundry list of quotes to brighten your day :)
					</Typography>
					<Button variant='contained' color='primary' onClick={() => history.push('/all-quotes')}>
						View More Quotes!
					</Button>
				</Grid>
				<Grid item sm={12}>
					<Typography variant='h2' m={3} align='center'>
						Quotes of the Day!
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					{_.isEmpty(quote1) ? <LoadingCard /> : <QuoteCard quoteData={quote1} quoteBg={image1} />}
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					{_.isEmpty(quote2) ? <LoadingCard /> : <QuoteCard quoteData={quote2} quoteBg={image2} />}
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					{_.isEmpty(quote3) ? <LoadingCard /> : <QuoteCard quoteData={quote3} quoteBg={image3} />}
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;
