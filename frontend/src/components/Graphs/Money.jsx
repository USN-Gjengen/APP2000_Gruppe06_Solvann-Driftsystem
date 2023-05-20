import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from "chart.js";
ChartJS.register(Title, Tooltip, LineElement,
    Legend, CategoryScale, LinearScale, PointElement, Filler);

const Money = () => {
    const [Money, setMoney] = useState({
        labels: [],
        datasets: [
          {
            label: "Money",
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
      const generateTimeLabels = (minutesInterval, numberOfLabels) => {
        const now = new Date();
        const labels = [];
      
        for (let i = 0; i < numberOfLabels; i++) {
          const time = new Date(now.getTime() - i * minutesInterval * 60000);
          const formattedTime = time.toLocaleTimeString("nb-NO", {
            timeZone: "Europe/Oslo",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          labels.unshift(formattedTime);
        }
      
        return labels;
      };
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              "http://" + process.env.REACT_APP_FRONTEND_API_ADDRESS + "/api/groupStates/last"
            );
            const jsonData = await response.json();
      
            if (typeof jsonData === "object" && jsonData !== null) {
              const Money = jsonData.money;
              const labels = generateTimeLabels(5, 12); // updates labels every 5 minutes
      
              setMoney((prevState) => ({
                ...prevState,
                labels: labels,
                datasets: [
                  {
                    ...prevState.datasets[0],
                    data: [...prevState.datasets[0].data, Money],
                  },
                ],
              }));
            } else {
              console.error("Error: jsonData is not an object", jsonData);
            }
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();


        const interval = setInterval(() => {
            fetchData(); // make this update every 5 minutes
        }, 300000); // 5 Minutes

        return () => clearInterval(interval);

      }, []);

    return (
        <div>
            <h2>Money</h2>
            <Line data={Money} />
        </div>
    )
}

export default Money;