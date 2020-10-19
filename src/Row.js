import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';

const base_url = 'http://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);

	//run based on specific condition
	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);

			return request;
		}
		fetchData();
	}, [fetchUrl]);

	return (
		<div className='row'>
			<h2>{title}</h2>

			<div className='row__posters'>
				{movies.map((movies) => (
					<img
						key={movies.id}
						className={`row__poster ${ isLargeRow && "row__posterLarge"}`}
						src={`${base_url}${
							isLargeRow ? movies.poster_path : movies.backdrop_path
						}`}
						alt={movies.name}
					/>
				))}
			</div>
		</div>
	);
}

export default Row;
