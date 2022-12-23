import RegionsList from 'components/Region/RegionsList';
import React from 'react';
import { useSelector } from 'react-redux';

const acceptRole = ['superadmin', 'superobsever', 'regionmanager'];

const Regions: React.FC = (): JSX.Element => {
  const currentRole = useSelector((state: any) => state.auth.user.role);
  if (!acceptRole.includes(currentRole)) {
    return <p>You do not access this page!</p>;
  }
  return (
    <div>
      <RegionsList />
    </div>
  );
};

export default Regions;
