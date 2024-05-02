import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import POPULAR_PLANTS from '../src/api/diseases';

const Pophandler = ({ route }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'symptoms', title: 'Symptoms' },
    { key: 'causes', title: 'Causes' },
    { key: 'remedies', title: 'Remedies' },
  ]);

  const plant = POPULAR_PLANTS.find(p => p.id === route?.params?.val  ||p.name === route?.params?.searchQuery );
  if (!plant) {
    alert('Name of disease is not correct');
    return null;
  }

  const SymptomsRoute = () => (
    <ScrollView style={styles.scene}>
      <Text style={styles.text}>{plant?.symptoms}</Text>
    </ScrollView>
  );

  const CausesRoute = () => (
    <ScrollView style={styles.scene}>
      <Text style={styles.text}>{plant?.causes}</Text>
    </ScrollView>
  );

  const RemediesRoute = () => (
    <ScrollView style={styles.scene}>
      <Text style={styles.text}>{plant?.remedies}</Text>
    </ScrollView>
  );

  const renderScene = SceneMap({
    symptoms: SymptomsRoute,
    causes: CausesRoute,
    remedies: RemediesRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
      activeColor="#2e854b"
      inactiveColor="#9e9e9e"
      renderLabel={({ route, focused }) => (
        <Text style={[styles.label, focused ? styles.activeLabel : styles.inactiveLabel]}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={plant.imageUri} style={styles.plantImage} />
        <Text style={styles.plantName}>{plant.name}</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: '100%' }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingleft: 10,
    paddingTop:10,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  plantImage: {
    width: 200,
    height: 200,
    borderRadius: 100, // Make the image circular
    borderWidth: 4,
    borderColor: '#ddd', // Light grey border
  },
  plantName: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 10,
    color: '#333', // Dark text color for better readability
  },
  content: {
    marginTop: 20,
    paddingBottom:16,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    color: '#386641', // Using a green shade for headings
  },
  text: {
    fontSize: 17,
    lineHeight: 24, // Increase line-height for better readability
    color: '#555', // Slightly darker text for the body for contrast
  },
  indicator: {
    backgroundColor: '#2e854b',
    height: 4,
    borderRadius: 2,
  },
  tabBar: {
    backgroundColor: 'white',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowColor: '#000',
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  activeLabel: {
    color: '#2e854b',
  },
  inactiveLabel: {
    color: '#9e9e9e',
  },
  scene: {
    flex: 1,
    padding: 20,
  },
});

export default Pophandler;
