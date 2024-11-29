import React from 'react';
import EntityList from '../../../components/EntityList';
import { View, Text } from 'react-native';


const AdminList = () => {
  const renderAdminDetails = (admin) => (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Nombre: {admin.name}</Text>
      <Text>Email: {admin.email}</Text>
    </View>
  );

  return (
    <EntityList
      collectionName="admins"
      renderItemDetails={renderAdminDetails}
    />
  );
};

export default AdminList;
