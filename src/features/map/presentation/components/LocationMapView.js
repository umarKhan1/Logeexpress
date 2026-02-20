import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { AppColors } from '../../../../shared/theme/colors';
import { silverMapStyle } from '../../utils/mapStyles';

const { width, height } = Dimensions.get('window');

export const LocationMapView = ({ mapRef, location, isLoading, onRegionChangeComplete }) => {
    return (
        <View style={styles.mapContainer}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Text>Finding your location...</Text>
                </View>
            ) : location ? (
                <>
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={silverMapStyle}
                        initialRegion={location}
                        showsUserLocation={true}
                        showsMyLocationButton={false}
                        onRegionChangeComplete={onRegionChangeComplete}
                    />
                    <View style={styles.fixedMarker} pointerEvents="none">
                        <MaterialIcons name="location-pin" size={40} color={AppColors.primary} />
                    </View>
                </>
            ) : (
                <View style={styles.loadingContainer}>
                    <Text>Please enable location permissions.</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        width: width,
        height: height,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fixedMarker: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -20, // Half of the icon width to horizontally center it
        marginTop: -40,  // Full icon height to vertically center the "pin tip" at the location point
        zIndex: 1,
    }
});
