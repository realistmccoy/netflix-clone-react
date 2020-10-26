import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = 'http://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');

	//run based on specific condition
	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);

			return request;
		}
		fetchData();
	}, [fetchUrl]);

	const opts = {
		height: '390',
		width: '100%',
		playerVars: {
			autoplay: 1,
		},
	};

	const handleClick = (movies) => {
		if (trailerUrl) {
			setTrailerUrl('');
		} else {
			movieTrailer(movies?.name || '')
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get('v'));
					
				})
				.catch((error) => console.log(error));
		}
	};

	return (
		<div className='row'>
			<h2>{title}</h2>

			<div className='row__posters'>
				{movies.map((movies) => (
					<img
						key={movies.id}
						onClick={() => handleClick(movies)}
						className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
						src={`${base_url}${
							isLargeRow ? movies.poster_path : movies.backdrop_path
						}`}
						alt={movies.name}
					/>
				))}
			</div>
			<div>{trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}</div>
		</div>
	);
}

export default Row;
