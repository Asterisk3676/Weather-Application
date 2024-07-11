import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform, Alert } from 'react-native';
import SearchInput from '../Search/SearchInput';
import keys from '../../BaseURL';

const api = {
    key: keys.API_KEY,
    url: keys.API_URL
}

export default function Content(props) {
    const dateTime = () => {
        const timestamp = Math.floor((Date.now() / 1000));
        var currentdate = new Date(timestamp * 1000);
        currentdate = currentdate.getDate() + " / "
            + (currentdate.getMonth() + 1) + " / "
            + currentdate.getFullYear();
        return currentdate;
    }

    const [location, setLocation] = useState('Bangkok');
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState('');
    const [temperature, setTemperature] = useState('');
    const [pm, setPM] = useState('');
    const [id, setID] = useState('');

    useEffect(() => {
        const fetchCoordinates = async () => {
            const cityName = await location;
            if (!cityName) return;
            const WEATHER_API_URL = `${api.url}/weather?q=${cityName}&units=metric&appid=${api.key}`;
            await fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
                let { name } = data;
                let { lat, lon } = data.coord;
                let { country } = data.sys;
                fetchWeatherDetails(name, lat, lon, country);
            }).catch(() => {
                setCity('Not found');
                setWeather(NaN);
                setTemperature(NaN);
                setPM(NaN);
                alertBox('Coordinates not found', `Failed to fetch coordinates of "${cityName}"`);
            });
        };

        const fetchWeatherDetails = async (name, lat, lon, country) => {
            const WEATHER_API_URL = `${api.url}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`;
            const AIR_POLLUTION_API_URL = `${api.url}/air_pollution?lat=${lat}&lon=${lon}&appid=${api.key}`;

            fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
                let { id, description } = data.weather[0];
                setID(id);
                setCity(`${name}, (${country})`);
                setWeather(description);
                setTemperature(data.main.temp);
            }).catch(() => {
                alertBox('Weather not found', 'Failed to fetch current weather');
            });

            fetch(AIR_POLLUTION_API_URL).then(res => res.json()).then(data => {
                let { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = data.list[0].components;
                setPM(pm2_5);
            }).catch(() => {
                alertBox('Air Pollution not found', 'Failed to fetch air quality');
            });
        };

        fetchCoordinates();
    }, [location]);

    const addLocationHanler = (newLocation) => {
        setLocation(newLocation);
    }

    const alertBox = (title, msg) => {
        Alert.alert(title, msg, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
    };

    props.onAddId(id);

    return (
        <View style={styles.detailsContainer}>
            <Text style={[styles.largeText, styles.textStyle]}>{city}</Text>
            <Text style={[styles.smallTaxt, styles.textStyle]}>{weather}</Text>
            <Text style={[styles.smallTaxt, styles.textStyle]}>{dateTime()}</Text>
            <View style={[styles.status]}>
                <View>
                    <Text style={[styles.smallTaxt, styles.textStyle]}>Celsius</Text>
                    <Text style={[styles.largeText, styles.textStyle]}>{Math.round(temperature)}°</Text>
                </View>
                <View>
                    <Text style={[styles.smallTaxt, styles.textStyle]}>PM 2.5</Text>
                    <Text style={[styles.largeText, styles.textStyle]}>{Math.round(pm)}</Text>
                </View>
            </View>
            <SearchInput
                placeholder='Search your city'
                onAddLocation={addLocationHanler}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
        color: '#fff',
    },
    largeText: {
        fontSize: 44,
    },
    smallTaxt: {
        fontSize: 18,
    },
    detailsContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 20
    },
    status: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        gap: 50,
    },
});
