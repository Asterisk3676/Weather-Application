import React from "react";
import { StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';

export default function SearchInput(props) {
    const [location, setLocation] = useState('');

    const handleChangeText = (newLocation) => {
        setLocation(newLocation);
    }

    const addLocationHanler = () => {
        props.onAddLocation(location);
    }

    return (
        <View style={styles.container}>
            <TextInput
                autoCorrect={false}
                placeholder={props.placeholder}
                placeholderTextColor='#232D3F'
                underlineColorAndroid='transparent'
                style={styles.TextInput}
                clearButtonMode='always'
                onChangeText={handleChangeText}
                onSubmitEditing={addLocationHanler}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 40,
        backgroundColor: '#fff',
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        borderRadius: 20,
        alignSelf: 'center'
    },
    TextInput: {
        flex: 1,
        color: '#232D3F',
        marginHorizontal: 10,
    },
});