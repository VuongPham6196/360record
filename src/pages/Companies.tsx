import CompaniesList from 'components/Company/CompaniesList';
import { warn } from 'console';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const acceptRole = ['superadmin1', 'superobsever'];

const Companies: React.FC = (): JSX.Element => {
  const currentRole = useSelector((state: any) => state.auth.user);
  console.log(currentRole);

  if (!acceptRole.includes(currentRole)) {
    alert('You are not allow to access this page!');
    return <Navigate to={'/dashboard'} />;
  }
  return <CompaniesList />;
};

export default Companies;
