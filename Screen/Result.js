import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { Card, ListItem } from 'react-native-elements';

const LeafTypeScreen = ({ route }) => {
  const { leafType, disease, causes, remedies, image, data } = route.params;
  
  // Function to check if the disease is one of the specified values
  const isPest = (disease) => {
    const pestDiseases = [
      'Spider Mites',
      'Mosaic Virus',
      'Yellow Leaf Curl Virus',
      'Canker',
      'Pestalotiopsis',
      'Sigatoka'
    ];
    return pestDiseases.includes(disease);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Report</Text>
        <Text style={styles.headerSubtitle}>Diagnosis and Remedies</Text>
      </View>
      <Card containerStyle={styles.card}>
        {/* Image and Severity */}
        <ListItem bottomDivider containerStyle={styles.listItem}>
          <ListItem.Content style={styles.listItemContent}>
            <Text style={styles.title}>Localized Area:</Text>
          </ListItem.Content>
          {image && (
            <Image source={{ uri: image }} style={styles.image} />
          )}
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listItem}>
          <ListItem.Content style={styles.listItemContent}>
            <Text style={styles.title}>Severity:</Text>
            <Text style={styles.value}>{data}</Text>
          </ListItem.Content>
        </ListItem>

        {/* Leaf Type and Disease */}
        <ListItem bottomDivider containerStyle={styles.listItem}>
          <ListItem.Content style={styles.listItemContent}>
            <Text style={styles.title}>Leaf Type:</Text>
            <Text style={styles.value}>{leafType}</Text>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider containerStyle={styles.listItem}>
          <ListItem.Content style={styles.listItemContent}>
            <Text style={styles.title}>{isPest(disease) ? 'Pest' : 'Disease'}:</Text>
            <Text style={styles.value}>{disease}</Text>
          </ListItem.Content>
        </ListItem>

        {/* Causes and Remedies */}
        {causes && (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.title}>Causes:</ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>{causes}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
        {remedies && (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.title}>Remedies:</ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>{remedies}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffde2',
  },
  header: {
    backgroundColor: '#023020',
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
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
    color: '#ffedd5',
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
    color: '#555',
    textAlign: 'justify',
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
    color: '#023020',
  },
  value: {
    fontSize: 20,
    color: '#000000',
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default LeafTypeScreen;