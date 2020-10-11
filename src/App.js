import React from 'react';
import './App.css';
import Row from './Row';
import requests from './requests';

function App() {
	return (
		<div className='App'>
			<h1> hey there</h1>
			<Row
				title='NETFLIX ORIGINALS'
				fetchUrl={requests.fetchNetflexOriginals}
			/>
			<Row title='Trending Now' fetchUrl={requests.fetchTrending} />
			<Row title='' />
			<Row title='' />
			<Row title='' />
			<Row title='' />
			<Row title='' />
		</div>
	);
}

export default App;
