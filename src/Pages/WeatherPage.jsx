import axios from "axios";
import DashboardLayout from "../Layouts/DashboardLayout";
import { useState } from "react";
import { APP_ID } from "../AppId";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,  
  LinearScale,   
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const axiosInstance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

export default function WeatherPage() {
  const [search, setSearch] = useState("");
  const [forecast, setForecast] = useState({});
  const [show, setShow] = useState(false);

  const SearchWeather = async () => {
    try {
      if (search.trim() === "") {
        console.log("nothing");
        
      } else {
        await axiosInstance
          .get(`/forecast?q=${search}&units=metric&APPID=${APP_ID}`)
          .then((result) => {
            setForecast(result.data);
            setShow(true);
          })
          .catch((error) => console.log(error.message));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const chartData = {
    labels: forecast.list?.map((entry) =>
      new Date(entry.dt_txt).toLocaleString("en-US", {
        weekday: "short",
        
      })
    ),
    datasets: [
      {
        label: "Temperature (°C)",
        data: forecast.list?.map((entry) => entry.main.temp),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: `5-Day Temperature Forecast of ${search}`,
      },
    },
  };

  return (
    <DashboardLayout>
      <div className="xl:pl-72">
        
        <div className="flex mb-4 justify-between">
        <h1 className="text-2xl font-bold">Weather</h1>
          <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-2xl w-40 sm:w-60 mr-2"
            placeholder="Enter city"
          />
          <button
            onClick={SearchWeather}
            className="border rounded-2xl transition-colors duration-500 w-32 h-10 bg-gray-200 hover:bg-white"
          >
            Search
          </button>
          </div>
        </div>

        {/* Display chart */}
        {show && (
          <div className="weather-chart">
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
