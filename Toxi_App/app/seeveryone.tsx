import React, { useEffect, useState } from 'react';
import { Image, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { REACT_APP_AUTH0_TOKEN } from '@env';

export default function SeeEveryone() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/v1/person', {
      headers: {
        Authorization: `Bearer ${REACT_APP_AUTH0_TOKEN}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error loading users: {error.message}</Text>;
  }

  if (users.length === 0) {
    return <Text>No users found</Text>;
  }

  return (
    <View style={styles.container}>
      {users.map(user => (
        <View key={user._id} style={styles.userContainer}>
          <Image source={{ uri: user.image }} style={styles.image} />
          <Text style={styles.text}>{user.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
  },
});
