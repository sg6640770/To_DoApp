const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherData(city: string) {
  try {
    const encodedCity = encodeURIComponent(city);
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodedCity}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Weather data not available');
    }

    const data = await response.json();
    return {
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      icon: data.weather[0].icon
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Weather API error: ${error.message}`);
    }
    throw new Error('Failed to fetch weather data');
  }
}