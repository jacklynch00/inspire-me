import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, makeStyles, Button, CircularProgress } from '@material-ui/core';
import { Stack, Chip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMoreOutlined } from '@material-ui/icons';
import Masonry from 'react-masonry-css';

import QuoteCard from '../../components/QuoteCard';

const useStyles = makeStyles({
	chip: {
		marginBottom: '10px !important',
	},
	accordionTitle: {
		marginRight: '20px',
		flexShrink: 0,
	},
	masonryGrid: {
		display: 'flex',
		marginleft: '-30px',
		width: 'auto',
	},
	masonryGridColumn: {
		paddingLeft: '30px',
		backgroundClip: 'padding-box',
	},
	masonryGridColumnDiv: {
		margin: '15px',
	},
	quotesGridItem: {
		marginTop: '20px',
	},
	loadMoreButtonItem: {
		marginTop: '20px',
	},
});

const AllQuotes = () => {
	const classes = useStyles();
	const [genres, setGenres] = useState([]);
	const [selectedGenre, setSelectedGenre] = useState('');
	const [expanded, setExpanded] = useState(true);

	const quoteLimit = 100;
	const [currentPage, setCurrentPage] = useState(1);
	const [nextPage, setNextPage] = useState();
	const [totalPages, setTotalPages] = useState();
	const [totalQuotes, setTotalQuotes] = useState();
	const [quotes, setQuotes] = useState([]);
	const [loadingMore, setLoadingMore] = useState(false);

	useEffect(() => {
		axios
			.get('https://quote-garden.herokuapp.com/api/v3/genres')
			.then((resp) => {
				setGenres(resp.data.data);
			})
			.catch((err) => console.log(err));
	}, [setGenres]);

	const getGenreQuotes = (genre) => {
		setQuotes([]);
		axios
			.get(`https://quote-garden.herokuapp.com/api/v3/quotes?genre=${genre}&limit=${quoteLimit}&page=${currentPage}`)
			.then((resp) => {
				setCurrentPage(resp.data.pagination.currentPage);
				setNextPage(resp.data.pagination.nextPage);
				setTotalPages(resp.data.pagination.totalPages);
				setTotalQuotes(resp.data.totalQuotes);
				setQuotes(resp.data.data);
			})
			.catch((e) => console.log(e));
	};

	const loadMoreQuotes = () => {
		setLoadingMore(true);
		axios
			.get(`https://quote-garden.herokuapp.com/api/v3/quotes?genre=${selectedGenre}&limit=${quoteLimit}&page=${nextPage}`)
			.then((resp) => {
				setCurrentPage(resp.data.pagination.currentPage);
				setNextPage(resp.data.pagination.nextPage);
				setQuotes((quotes) => {
					return [...quotes, ...resp.data.data];
				});
				setLoadingMore(false);
			})
			.catch((e) => console.log(e));
	};

	const handleGenreClicked = (chip) => {
		setSelectedGenre(chip.target.textContent);
		setExpanded(!expanded);
		getGenreQuotes(chip.target.textContent);
	};

	const handleAccordianGenreClicked = () => {
		setSelectedGenre('');
		setQuotes([]);
		setExpanded(true);
	};

	const handleExpansion = (e, isExpanded) => {
		setExpanded(isExpanded);
	};

	const breakPoints = {
		default: 4,
		1300: 3,
		1100: 2,
		700: 1,
	};

	return (
		<Grid container>
			<Grid item sm={12}>
				<Accordion expanded={expanded} onChange={handleExpansion}>
					<AccordionSummary expandIcon={<ExpandMoreOutlined />} aria-controls='show-genre-options'>
						<Typography className={classes.accordionTitle}>Select a Genre</Typography>
						{selectedGenre ? <Chip color='success' label={selectedGenre} onDelete={handleAccordianGenreClicked} /> : null}
					</AccordionSummary>
					<AccordionDetails>
						<Grid item sm={12} className={classes.stackGrid}>
							<Stack direction='row' spacing={2} flexWrap='wrap' alignItems='flex-start' justifyContent='center'>
								{genres.map((el) => {
									return (
										<Chip
											className={classes.chip}
											color={selectedGenre === el ? 'success' : 'default'}
											key={el}
											label={el}
											onClick={handleGenreClicked}
											clickable
										/>
									);
								})}
							</Stack>
						</Grid>
					</AccordionDetails>
				</Accordion>
			</Grid>
			<Grid container className={classes.quotesGridItem} spacing={3}>
				<Masonry className={classes.masonryGrid} columnsClassName={classes.masonryGridColumn} breakpointCols={breakPoints}>
					{quotes.length > 0
						? quotes.map((el, i) => {
								return (
									<div className={classes.masonryGridColumnDiv} key={i}>
										<QuoteCard quoteData={el} />
									</div>
								);
						  })
						: null}
				</Masonry>
			</Grid>
			{quotes.length > 0 ? (
				<>
					{quotes.length === totalQuotes ? null : (
						<>
							<Grid item sm={12} align='center'>
								{loadingMore ? <CircularProgress /> : null}
							</Grid>
							<Grid item sm={12} className={classes.loadMoreButtonItem} align='center'>
								<Button variant='contained' color='primary' onClick={loadMoreQuotes}>
									Load More...
								</Button>
							</Grid>
						</>
					)}
					<Grid item sm={12} className={classes.loadMoreButtonItem} align='center'>
						<Typography>
							Showing page {currentPage} of {totalPages}.
						</Typography>
						<Typography>
							Showing quotes: {quotes.length} of {totalQuotes}
						</Typography>
					</Grid>
				</>
			) : null}
		</Grid>
	);
};

export default AllQuotes;
