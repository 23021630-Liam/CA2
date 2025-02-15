import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
    const { item } = route.params;

    // Labels
    const fieldMapping = {
        _id: 'School ID',
        school_name: 'School Name',
        url_address: 'Website',
        address: 'Address',
        postal_code: 'Postal Code',
        telephone_no: 'Telephone Number',
        telephone_no_2: 'Telephone Number 2',
        fax_no: 'Fax Number',
        fax_no_2: 'Fax Number 2',
        email_address: 'Email Address',
        mrt_desc: 'Nearest MRT',
        bus_desc: 'Nearest Bus',
        principal_name: 'Principal',
        first_vp_name: 'Vice-President 1',
        second_vp_name: 'Vice-President 2',
        third_vp_name: 'Vice-President 3',
        fourth_vp_name: 'Vice-President 4',
        fifth_vp_name: 'Vice-President 5',
        sixth_vp_name: 'Vice-President 6',
        dgp_code: 'Area',
        zone_code: 'Zone',
        type_code: 'School Type',
        nature_code: 'School Nature',
        session_code: 'School Session',
        mainlevel_code: 'Main level',
        sap_ind: 'Sap',
        autonomous_ind: 'Autonomous',
        gifted_ind: 'Gifted',
        ip_ind: 'IP',
        mothertongue1_code: 'Mothertongue 1',
        mothertongue2_code: 'Mothertongue 2',
        mothertongue3_code: 'Mothertongue 3'
    };
//Displaying data
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.detailTitle}>Record Details</Text>
            {Object.keys(item).map((key, index) => {
                // Use the mapping if available; otherwise, format the key
                const displayLabel = fieldMapping[key] || key.charAt(0).toUpperCase() + key.slice(1);
                return (
                    <View key={index} style={styles.detailRow}>
                        <Text style={styles.detailLabel}>{displayLabel}: </Text>
                        <Text style={styles.detailValue}>{item[key]}</Text>
                    </View>
                );
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    detailTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    detailLabel: {
        fontWeight: '600',
        width: 140,
    },
    detailValue: {
        flex: 1,
        flexWrap: 'wrap',
    },
});

export default DetailScreen;
