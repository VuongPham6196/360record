import { getLOCATION } from 'api/httpClient';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { authActionTypes } from 'redux/auth/actions';

const LocationDetail: React.FC = (): JSX.Element => {
  const param = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fecthLocationDetail = async () => {
      const { id } = param;
      try {
        const respone = await getLOCATION({ id: id });
        if (respone.data.location === null) {
          return navigate('/dashboard/locations');
        }
        setData(respone.data.location);
      } catch (error) {
        dispatch({ type: authActionTypes.GET_AUTH_REQUEST_FAILED });
      }
    };
    fecthLocationDetail();
  });

  return (
    <div>
      <h2>Location Detail Page of {param.id}</h2>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default LocationDetail;
