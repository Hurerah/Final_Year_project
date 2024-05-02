import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';

const LeafTypeScreen = ({ route }) => {
  const { leafType, disease, causes, remedies } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Report</Text>
        <Text style={styles.headerSubtitle}>Diagnosis and Remedies</Text>
      </View>
      <Card containerStyle={styles.card}>
      <ListItem bottomDivider containerStyle={styles.listItem}>
          <ListItem.Content style={styles.listItemContent}>
            <Text style={styles.title}>Leaf Type:</Text>
            <Text style={styles.value}>{leafType}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listItem}>
          <ListItem.Content style={styles.listItemContent}>
            <Text style={styles.title}>Disease:</Text>
            <Text style={styles.value}>{disease}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>Causes:</ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>{causes}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>Remedies:</ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>{remedies}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffde2', // Based on the background color of the image
    
  },
  header: {
    paddingVertical: 20,
    backgroundColor: '#023020', // Based on the header color of the image
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    paddingBottom: 10,
    paddingTop:30
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#ffedd5', // Based on the subtitle color of the image
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    shadowColor: 'rgba(0,0,0, .2)',
    marginTop: 25,
    paddingBottom: 25,
  },
  subtitle: {
    paddingTop: 7,
    fontSize: 20,
    color: '#555', // Based on the subtitle color of the image
    textAlign:'justify'
},
  listItem: {
    paddingVertical: 10,
  },
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#023020', // Title color
  },
  value: {
    fontSize: 20,
    color: '#000000', // Value color
  },
  // ...rest of your styles (e.g., for the navigation button)
});

export default LeafTypeScreen;
