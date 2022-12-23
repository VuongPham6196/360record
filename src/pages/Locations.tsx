import LocationsList from 'components/Location/LocationsList';
import React from 'react';
import { useSelector } from 'react-redux';

const acceptRole = ['superadmin', 'superobserver', 'regionmanager', 'manager'];

const Locations: React.FC = (): JSX.Element => {
  const currentRole = useSelector((state: any) => state.auth.user.role);
  if (!acceptRole.includes(currentRole)) {
    return <p>You do not access this page!</p>;
  }
  return (
    <div>
      <LocationsList />
    </div>
  );
};

export default Locations;
