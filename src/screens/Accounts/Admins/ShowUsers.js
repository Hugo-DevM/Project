import React from 'react';
import EntityList from '../../../components/EntityList';
import { View, Text } from 'react-native';

const UserListAdmin = () => {
  const renderUserDetails = (user) => (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user.name}</Text>
      <Text>Email: {user.email}</Text>
    </View>
  );

  return (
    <EntityList
      collectionName="users"
      renderItemDetails={renderUserDetails}
    />
  );
};

export default UserListAdmin;
