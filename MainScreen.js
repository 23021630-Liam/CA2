import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';

const MainScreen = ({ navigation }) => {
    const [data, setData] = useState([]); // All records from the API
    const [filteredData, setFilteredData] = useState([]); // Records filtered based on search
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch data
    useEffect(() => {
        fetch('https://data.gov.sg/api/action/datastore_search?resource_id=d_688b934f82c1059ed0a6993d2a829089&limit=10000')
            .then(response => response.json())
            .then(json => {
                const records = json.result.records;
                setData(records);
                setFilteredData(records);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    // Filter
    const handleSearch = (text) => {
        setSearchText(text);

        if (text === '') {
            setFilteredData(data);
        } else {

            const letter = text[0].toLowerCase();
            const filtered = data.filter(item => {
                return item.school_name && item.school_name[0].toLowerCase() === letter;
            });
            setFilteredData(filtered);
        }
    };

    // Render each list item
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('Detail', { item })}
        >
            <Text style={styles.itemText}>{item.school_name}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }
    // Text bar
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by first letter of school name..."
                value={searchText}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#f9f9f9',
        marginBottom: 4,
        borderRadius: 4,
    },
    itemText: {
        fontSize: 16,
    },
});

export default MainScreen;
