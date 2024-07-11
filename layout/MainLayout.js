import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, KeyboardAvoidingView, ImageBackground } from 'react-native';
import getImageForWeather from "../utils/getImageForWeather";
import Content from '../components/Content/Content';

export default function MainLayout() {
  const [id, setID] = useState('');

  const addIdHanler = (newID) => {
    setID(newID);
  }

  const convertID = (id) => {
    if (id == 800) {
      return 'Clear';
    }
    if ([202, 232].includes(id)) {
      return 'Hail';
    }
    if ([803, 804].includes(id)) {
      return 'Heavy Cloud';
    }
    if ([801, 802].includes(id)) {
      return 'Light Cloud';
    }
    if ([502, 503, 504, 522].includes(id)) {
      return 'Heavy Rain';
    }
    if ([500, 501, 520].includes(id)) {
      return 'Light Rain';
    }
    if ([521, 531].includes(id)) {
      return 'Showers';
    }
    if ([611, 612, 613, 615, 616].includes(id)) {
      return 'Sleet';
    }
    if ([600, 601, 602, 620, 621, 622].includes(id)) {
      return 'Snow';
    }
    if ([200, 201, 202, 210, 211, 212, 221, 230, 231, 232].includes(id)) {
      return 'Thunder';
    }
    return 'Default'
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <StatusBar style="auto" />
      <ImageBackground
        source={getImageForWeather(convertID(id))}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <Content onAddId={addIdHanler}/>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});