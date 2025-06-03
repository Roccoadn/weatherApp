import { useEffect, useState } from "react";
import FechaHoraLocal from "../components/FuncionFecha";

export function WeatherApp() {
    const [weatherData, setWeatherData] = useState(false);

    const ApiRequest = async (city) => {
        try {
            const apiKey = "aaec21e9a535fcb78db2ace6e00b045d";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setWeatherData({
                humidity: data.main.humidity,
                temperature: Math.floor(data.main.temp),
                windSpeed: data.wind.speed,
                description: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
                icon: data.weather[0].icon,
                location: data.name,
                timezone: data.timezone,
            });

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    useEffect(() => {
        ApiRequest('Buenos Aires');
    }, []);

    return (
        <section className="weather-app">
            <form action="city" onSubmit={(event) => {
                event.preventDefault();
                const city = event.target.elements.city.value;
                ApiRequest(city);
            }}>
                <input type="text" name="city" placeholder="Busca una ciudad" />
                <button type="submit"><img src="../../img/lupa.webp" alt="lupa"/></button>
            </form>
            <div className="weather-info-container">
                <h2>{weatherData.location}</h2>
                <div className="weather-info">
                    <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="" />
                    <h3 className="description">{weatherData.description}</h3>
                    <h2 className="temperature">{weatherData.temperature}°C</h2>
                </div>
                <div className="weather-details">
                    <h3>{weatherData && weatherData.timezone && <FechaHoraLocal timezone={weatherData.timezone} />}</h3>
                </div>
                <div className="additional-info">
                    <div>
                        <img src="../../img/humedad.webp" alt="Humedad"/>
                        <h3 className="humidity">{weatherData.humidity}% <br /> Humedad</h3>
                    </div>
                    <div>
                        <img src="../../img/viento.webp" alt="Viento"/>
                        <h3 className="wind-speed">{weatherData.windSpeed} m/s <br /> Velocidad del viento</h3>
                    </div>
                </div>
            </div>
        </section>
    );
}