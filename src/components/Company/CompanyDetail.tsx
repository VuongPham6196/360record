import { getCOMPANY } from 'api/httpClient';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CompanyDetail = () => {
  const param = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const { id } = param;
    const locationId = { id: id };

    const fecthCompanyDetail = async (variables: any) => {
      try {
        const respone = await getCOMPANY(variables);
        setData(respone.data.company);
      } catch (error) {
        navigate('/dashboard/companies');
      }
    };
    fecthCompanyDetail(locationId);
  }, []);

  return (
    <div>
      <h2>Company Detail Page of {param.id}</h2>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default CompanyDetail;
