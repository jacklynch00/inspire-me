import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardHeader, Avatar } from '@material-ui/core';

const QuoteCard = (props) => {
	const { quoteData, quoteBg } = props;

	return (
		<Card key={quoteData._id} elevation={3}>
			<CardHeader
				title={quoteData.quoteAuthor}
				subheader={quoteData.quoteGenre}
				avatar={<Avatar sx={{ bgColor: '#f00' }}>{quoteData.quoteAuthor ? quoteData.quoteAuthor[0].toUpperCase() : 'n/a'}</Avatar>}
			/>
			{quoteBg ? <CardMedia component='img' height='140' image={quoteBg} alt='quote background image' /> : null}
			<CardContent>
				<Typography variant='body2' color='textSecondary'>
					{quoteData.quoteText}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default QuoteCard;
