import React, {useState, useEffect} from "react";
import { View , Text, StyleSheet, SafeAreaView, TouchableOpacity, Image,
  FlatList, TextInput, ActivityIndicator, Dimensions } from "react-native";
import filter from 'lodash.filter';
import { TabView, SceneMap } from 'react-native-tab-view';
import MapView from 'react-native-maps';

const LocationScreen =  props => {
  
  const API_ENDPOINT = "https://randomuser.me/api/?seed=1&page=1&results=20";
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'list', title: 'List' },
    { key: 'map', title: 'Map' },
  ]);

  useEffect(() => {
    setIsLoading(true);

    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(results => {
        setData(results.results);
        setFullData(results.results);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

  function renderHeader() {
    return (
      <View style={styles.searchBar}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={queryText => handleSearch(queryText)}
          placeholder="Search"
          style={styles.searchBar}
        />
      </View>
    );
  }

  const handleSearch = query => {
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, user => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
    setQuery(query);
  };
  
  const contains = ({ name, email }, query) => {
    const { first, last } = name;
  
    if (first.includes(query) || last.includes(query) || email.includes(query)) {
      return true;
    }
  
    return false;
  };

  const ListRoute = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={item => item.email}
            ListHeaderComponent={renderHeader}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => props.navigation.navigate("Menu", {
                location: item,
                orderType: props.route.params.orderType,
                when: props.route.params.when,
              })} activeOpacity={0.7} style={styles.container}>
              <View style={styles.listItem}>
                <Image
                  source={{ uri: item.picture.thumbnail }}
                  style={styles.coverImage}
                />
                <View style={styles.metaInfo}>
                  <Text style={styles.title}>{`${item.name.first} ${
                  item.name.last
                  }`}</Text>
                </View>
              </View>
              </TouchableOpacity>)}
            />
      </View>
    </SafeAreaView>
  );

  const MapRoute = () => (
    <MapView
      style={styles.container}
      region={{
        latitude: 37.550201,
        longitude: -121.980827,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421}}
      showsUserLocation={true}
    />
  )

  const initialLayout = { width: Dimensions.get('window').width };

  const renderScene = SceneMap({
    list: ListRoute,
    map: MapRoute,
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18}}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  }

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scene: {
    flex: 1,
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#DCDCDC',
    flexDirection: 'row'
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8
  },
  metaInfo: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    width: 200,
    padding: 10,
  },
  searchBar: {
    backgroundColor: '#DCDCDC',
    padding: 5,
    marginVertical: 5,
    borderRadius: 10,
  },
});

export default LocationScreen;
