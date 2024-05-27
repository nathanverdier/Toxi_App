import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

export default function SeeEveryone() {
  const [users, setUsers] = useState([]);
  const auth0Token = 'your-auth0-token';

  useEffect(() => {
    fetch('https://your-api.com/users', {
      headers: {
        Authorization: `Bearer ${auth0Token}`,
      },
    })
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View>
      {users.map(user => (
        <View key={user._id}>
          <Image source={{ uri: user.image }} style={{ width: 50, height: 50 }} />
          <Text>{user.name}</Text>
        </View>
      ))}
    </View>
  );
}