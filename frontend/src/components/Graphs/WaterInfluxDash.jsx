import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from "chart.js";
ChartJS.register(Title, Tooltip, LineElement,
    Legend, CategoryScale, LinearScale, PointElement, Filler);

    const WaterInfluxDash = () => {
      const [waterInflux, setwaterInflux] = useState({
        labels: [],
        datasets: [
          {
            label: "Water Inlfux",
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
    
        for (let time = start; time <= end; time.setDate(time.getDate() + 1)) {
          const formattedTime = time.toLocaleDateString("nb-NO", {
            timeZone: "Europe/Oslo",
            day: "2-digit",
            month: "2-digit",
          });
          labels.push(formattedTime);
        }
    
        return labels;
      };
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const end = new Date();
            const start = new Date();
            start.setDate(end.getDate() - 6);
    
            const response = await fetch(
              `http://api.solvann.eksempler.no/api/WaterInflux/lastWeek?start=${start.toISOString()}&end=${end.toISOString()}`
            );
            const data = await response.json();
    
            if (Array.isArray(data)) {
              setwaterInflux((prevState) => ({
                ...prevState,
                labels: generateTimeLabels(start, end),
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
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
    
        const interval = setInterval(() => {
          fetchData();
        }, 300000);
    
        return () => clearInterval(interval);
      }, []);
    
      return (
        <div>
          <Line data={waterInflux} />
        </div>
      );
    };

export default WaterInfluxDash;