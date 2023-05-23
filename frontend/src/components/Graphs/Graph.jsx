import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from "chart.js";
ChartJS.register(Title, Tooltip, LineElement,
	Legend, CategoryScale, LinearScale, PointElement, Filler);

const Graph = (props) => {
	const options = {
		scales: {
			x: {
				time: {
					unit: "minute",
					displayFormats: {
						minute: "HH:mm",
					},
				},
			},
		},	y: {
			type: "linear"
		}
	}

	const [graphPoints, setGraphPoints] = useState({
		labels: [],
		datasets: [
			{
				label: props.title,
				data: [],
				backgroundColor: "#16ccc6",
				borderColor: "green",
				tension: 0.4,
				fill: true,
				pointStyle: "rect",
				pointBorderColor: "blue",
				pointBackgroundColor: "#fff",
				showLine: true,
			},
		],
	});

	const generateTimeLabels = (start, end) => {
		const labels = [];

		for (let time = start; time < end; time.setMinutes(time.getMinutes() + 5)) {
			const formattedTime = time.toLocaleDateString("nb-NO", {
				timeZone: "Europe/Oslo",
				hour: "2-digit",
				minute: "2-digit",
			});

			labels.push(formattedTime.split(" ")[1]);
		}

		return labels;
	};

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(props.src);
				let json = await response.json();
				return json;
			} catch (error) {
				console.error(error);
			}
		};

		const updateGraph = async () => {
			const end = new Date();
			const start = new Date();
			start.setHours(end.getHours() - 1);
			let data = await fetchData();
			
			if (Array.isArray(data)) {
				data.reverse();
				let labels = generateTimeLabels(start, end);
				setGraphPoints((prevState) => ({
					labels: labels,
					datasets: [
						{
							...prevState.datasets[0],
							data: data,
						},
					],
				}));
			} else {
				console.error("Error: data is not an array", data);
			}
		}


		updateGraph();
		setInterval(async () => {
			updateGraph();
		}, 300000);
	}, []);

	return (
		<div className="graf-Trend">
			<Line data={graphPoints} options={options}/>
		</div>
	);
};

export default Graph;