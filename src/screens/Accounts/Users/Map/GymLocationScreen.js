import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const GymLocationScreen = () => {
  const gymLocation = {
    latitude: 20.63107,
    longitude: -105.22652,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...gymLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01, 
        }}
      >
        <Marker
          coordinate={gymLocation}
          title="Fitness GYM"
          description="Ubicación del gimnasio"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default GymLocationScreen;
