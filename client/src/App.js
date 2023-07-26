import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './App.css';
function App() {
	const [symbol, setSymbol] = useState('');
	const [selectedDate, setSelectedDate] = useState(null);
	const [stockData, setStockData] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await getStockData();
	};

	const getStockData = async () => {
		try {
			const response = await axios.post(
				`http://localhost:2000/api/fetchStockData`,
				{
					tickerSymbol: symbol,
					date: selectedDate?.toISOString().split('T')[0], // Convert date to "yyyy-MM-dd" format
				}
			);
			if(!(response && response.data && response.data.data)) {
				alert("Invalid request");
				return;
			}
			setStockData(response.data.data);
		} catch (error) {
			console.error('Error fetching stock data:', error.message);
			setStockData(null);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="stockSymbol">Stock Symbol : </label>
			<input
				type="text"
				id="stockSymbol"
				value={symbol}
				onChange={(e) => setSymbol(e.target.value)}
			/>
			<br />
			<br />
			<label htmlFor="selectedDate">Select Date : </label>
			<DatePicker
				id="selectedDate"
				selected={selectedDate}
				onChange={(date) => setSelectedDate(date)}
				dateFormat="yyyy-MM-dd"
			/>
			<br />
			<br />
			<button type="submit">Submit</button>

			{(symbol && selectedDate) && (
				<div>
					<p>
						Symbol: {symbol}</p>
					<p> Date: {selectedDate?.toISOString().split('T')[0]}
					</p>
				</div>)}
			{stockData && (
				<div>
					<h2>Stock Data</h2>
					<p>Open: {stockData.open}</p>
					<p>High: {stockData.high}</p>
					<p>Low: {stockData.low}</p>
					<p>Close: {stockData.close}</p>
					<p>Volume: {stockData.volume}</p>
				</div>
			)}
		</form>
	);
}

export default App;
