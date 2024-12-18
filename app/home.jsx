import { StatusBar } from 'expo-status-bar';
import {Image, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePress = async () => {
    if (city.trim() === '') {
      alert('Please enter a city name');
      return;
    }

    
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const apiKey = '4cbe59cac245363e7b2982b952fcba96'; 
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError(data.message);
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3498db' }}>
      <Icon name={"cloud"} size={50} color="#000" />
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white', marginBottom: 20 }}>
        Weather App
      </Text>

      <TextInput
        style={{
          height: 40,
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 8,
          width: '80%',
          marginBottom: 20,
          paddingLeft: 10,
          color: 'white',
        }}
        placeholder="Enter city"
        placeholderTextColor="white"
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity
        style={{
          backgroundColor: '#2ecc71',
          paddingVertical: 12,
          paddingHorizontal: 30,
          borderRadius: 8,
          elevation: 5,
        }}
        onPress={handlePress}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Get Weather</Text>
      </TouchableOpacity>

      {loading && <Text style={{ color: 'white', marginTop: 20 }}>Loading...</Text>}

      {error && <Text style={{ color: 'red', marginTop: 20 }}>{error}</Text>}

      {weatherData && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: 'white' }}>{weatherData.name}</Text>
          <Text style={{ fontSize: 18, color: 'white' }}>
            {weatherData.main.temp}°C, {weatherData.weather[0].description}
          </Text>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}