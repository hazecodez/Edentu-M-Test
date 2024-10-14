import axios from "axios";
import DashboardLayout from "../Layouts/DashboardLayout";
import { useRef, useState } from "react";
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
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";
import Button from "../Components/Button";
import { handleGeneratePDF } from "../Utilities/ReactToPDF";
import { TiWeatherPartlySunny } from "react-icons/ti";

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
  const [loading, setLoading] = useState(false);

  const componentRef = useRef(null);

  const SearchWeather = async () => {
    setLoading(true);
    try {
      if (search.trim() === "") {
        toast.warning("Enter the city name");
        setLoading(false);
      } else {
        await axiosInstance
          .get(`/forecast?q=${search}&units=metric&APPID=${APP_ID}`)
          .then((result) => {
            setForecast(result.data);
            setShow(true);
            setLoading(false);
          })
          .catch((error) => {
            toast.error("City not found!!");
            setLoading(false);
            console.log(error.message);
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const chartData = {
    labels: forecast.list?.map((entry) =>
      new Date(entry.dt_txt).toLocaleString("en-US", {
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: `5-Day Temperature Forecast`,
        font: {
          size: 24,
          weight: "bold",
        },
      },
    },
  };

  const downloadPDF = () => {
    handleGeneratePDF(componentRef, `Weather trends of ${search}`);
  };

  return (
    <DashboardLayout>
      {loading && (
        <div className="absolute left-56 inset-0 flex items-center justify-center z-10">
          <BeatLoader loading={loading} size={30} />
        </div>
      )}
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
            <Button ButtonName="Search" handleButton={SearchWeather} />
          </div>
        </div>

        {show ? (
          <div className="flex flex-col justify-center items-center">
            <h1 className="mt-5 text-xl font-bold">
              Weather Trends of {forecast.city.name}
            </h1>
            <div className="flex flex-col sm:flex-row items-center w-4/5 h-80 bg-blue-50 sm:h-64 rounded-lg mt-8 mb-8">
              <div className="flex  w-2/5 items-center justify-center">
                <img
                  src={`https://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@2x.png`}
                  alt=""
                  className="p-5 w-64"
                />
              </div>
              <div className="flex  w-full h-full justify-evenly items-center">
                <div className="flex flex-col items-center ">
                  <p className="text-5xl">
                    {Math.floor(forecast.list[0].main.temp)}°C
                  </p>
                  <div className="flex flex-row gap-10 p-7">
                    <div className="flex flex-col">
                      <p>{forecast.list[0].main.humidity} %</p>
                      <p>Humidity</p>
                    </div>

                    <div className="flex flex-col">
                      <p>{forecast.list[0].wind.speed} Km/h</p>
                      <p>Wind Speed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center p-10">
              <Button ButtonName="Download" handleButton={downloadPDF} />
            </div>

            {/* Display chart */}
            <div
              ref={componentRef}
              className="weather-chart w-[450px] sm:w-[500px] sm:h-[600px] md:w-[700px] md:h-[600px] lg:w-[850px] lg:h-[650px] xl:w-[1000px] xl:h-[700px] "
            >
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full h-[500px] text-gray-500">
            <TiWeatherPartlySunny className="w-24 h-24" />
            <p className="mt-4 text-lg text-center">
              You can search the weather here!
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
