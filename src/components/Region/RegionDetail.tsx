import { getREGION } from 'api/httpClient';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RegionDetail = () => {
  const param = useParams();
  const [data, setData] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    const { id } = param;
    const locationId = { id: id };

    const fecthRegionDetail = async (variables: any) => {
      try {
        const respone = await getREGION(variables);
        setData(respone.data.region);
      } catch (error) {
        navigate('/dashboard/regions');
      }
    };
    fecthRegionDetail(locationId);
  }, []);

  return (
    <div>
      <h2>Region Detail Page of {data?.name}</h2>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default RegionDetail;
