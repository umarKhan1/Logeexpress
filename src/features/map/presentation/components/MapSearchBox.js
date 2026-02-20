import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MaterialIcons } from '@expo/vector-icons';
import { CustomInput } from '../../../../shared/components/CustomInput';
import { moderateScale, verticalScale } from '../../../../core/utils/responsive';
import { AppColors } from '../../../../shared/theme/colors';

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export const MapSearchBox = ({ onSearchSelect }) => {
    return (
        <View style={styles.searchContainer}>
            <GooglePlacesAutocomplete
                placeholder="Search new address..."
                fetchDetails={true}
                onPress={onSearchSelect}
                query={{
                    key: GOOGLE_API_KEY,
                    language: 'en',
                }}
                textInputProps={{
                    InputComp: CustomInput,
                    containerStyle: { flex: 1, marginBottom: 0 },
                    style: { borderWidth: 0, borderColor: 'transparent' }, // Overriding default border
                }}
                renderLeftButton={() => (
                    <MaterialIcons
                        name="search"
                        size={28}
                        color={AppColors.primary}
                        style={{ alignSelf: 'center', marginLeft: 15 }}
                    />
                )}
                styles={{
                    container: {
                        flex: 1,
                    },
                    textInputContainer: {
                        backgroundColor: 'white',
                        borderRadius: moderateScale(10), // match exact screenshot form shape
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 4,
                        paddingVertical: Platform.OS === 'ios' ? verticalScale(2) : 0,
                    },
                    textInput: {
                        height: verticalScale(48), // decreasing height
                        color: '#000',
                        fontSize: moderateScale(16),
                        paddingHorizontal: moderateScale(12),
                        backgroundColor: 'transparent',
                    },
                    listView: {
                        backgroundColor: 'white',
                        borderRadius: moderateScale(10),
                        marginTop: moderateScale(5),
                        elevation: 4,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 3,
                    },
                    row: {
                        paddingVertical: moderateScale(12),
                        paddingHorizontal: moderateScale(15),
                        flexDirection: 'row',
                        alignItems: 'center',
                    },
                    separator: {
                        height: StyleSheet.hairlineWidth,
                        backgroundColor: '#E0E0E0',
                    }
                }}
                renderRow={(data) => (
                    <View style={styles.suggestionRow}>
                        <View style={styles.suggestionIconContainer}>
                            <MaterialIcons name="location-on" size={20} color="#000" />
                        </View>
                        <View style={styles.suggestionTextContainer}>
                            <Text style={styles.mainText} numberOfLines={1}>
                                {data.structured_formatting?.main_text || data.description}
                            </Text>
                            {data.structured_formatting?.secondary_text && (
                                <Text style={styles.secondaryText} numberOfLines={1}>
                                    {data.structured_formatting.secondary_text}
                                </Text>
                            )}
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? verticalScale(50) : verticalScale(30),
        left: moderateScale(20),
        right: moderateScale(20),
        flexDirection: 'row',
        zIndex: 1,
    },
    suggestionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    suggestionIconContainer: {
        width: verticalScale(36),
        height: verticalScale(36),
        borderRadius: verticalScale(18),
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(12),
    },
    suggestionTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    mainText: {
        fontSize: moderateScale(16),
        color: '#000',
        fontWeight: '400',
    },
    secondaryText: {
        fontSize: moderateScale(14),
        color: '#888',
        marginTop: verticalScale(2),
    },
});
