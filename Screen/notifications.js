import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';

const Notifications = () => {
  
  const [notifications, setNotifications] = useState([]);

  // Example function to fetch notifications (replace with your actual data fetching logic)
  useEffect(() => {
    const fetchNotifications = async () => {
      // Mock notifications

      const fetchedNotifications = [
        { id: 1, title: 'New Disease Detected', message: 'Your plant may have leaf spot disease.' },
        { id: 2, title: 'Watering Reminder', message: 'It\'s time to water your fern.' },
        { id: 3, title: 'Fertilizer Alert', message: 'Consider fertilizing your cactus.' },
        { id: 4, title: 'Weather Warning', message: 'Upcoming cold weather may affect your plants.' },
        { id: 5, title: 'New Feature', message: 'Check out our new plant identification tool.' },
        { id: 6, title: 'Seasonal Tips', message: 'Start preparing your plants for the spring season.' },
        { id: 7, title: 'Pest Alert', message: 'Watch out for aphids on your roses.' },
        { id: 8, title: 'Pruning Reminder', message: 'It\'s the perfect time to prune your fruit trees.' },
        { id: 9, title: 'Soil Health', message: 'A guide to improving the soil quality for your plants.' },
        { id: 10, title: 'Gardening Community', message: 'Join our forum to discuss with fellow gardening enthusiasts.' },
        // Add more notifications as needed
      ];
      setNotifications(fetchedNotifications);
    };

    fetchNotifications();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/notification.jpg')}
      style={styles.background}
    >
    <ScrollView style={styles.container}>
      <View style={styles.notificationContainer}>
        {notifications.map(notification => (
          <TouchableOpacity key={notification.id} style={styles.notificationCard}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text>{notification.message}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
    </ImageBackground>

  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notificationContainer: {
    padding: 10,
    marginBottom: 48,
  },
  notificationCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  notificationTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#023020'
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
});
