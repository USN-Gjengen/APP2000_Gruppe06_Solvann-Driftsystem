import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from "chart.js";
ChartJS.register(Title, Tooltip, LineElement,
	Legend, CategoryScale, LinearScale, PointElement, Filler);

const GraphLastWeek = (props) => {
	const options = {
		scales: {
			x: {
				time: {
					unit: "date",
					displayFormats: {
						date: "DD",
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

		for (let time = start; time < end; time.setDate(time.getDate() + 1)) {
			const formattedTime = time.toLocaleDateString("nb-NO", {
				timeZone: "Europe/Oslo",
				weekday: "short",
			});
			labels.push(formattedTime);
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
			start.setDate(start.getDate() - 7);
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
		<div>
			<Line data={graphPoints} options={options} />
		</div>
	);
};

export default GraphLastWeek;