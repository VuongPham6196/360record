import { getINSPECTION } from 'api/httpClient';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { authActionTypes } from 'redux/auth/actions';

const InspectionDetail: React.FC = (): JSX.Element => {
  const param = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fecthInspectionDetail = async () => {
      const { id } = param;
      try {
        const respone = await getINSPECTION({ id: id });
        if (respone.data.inspection === null) {
          return navigate('/dashboard/inpsection');
        }
        setData(respone.data.inspection);
      } catch (error) {
        dispatch({ type: authActionTypes.GET_AUTH_REQUEST_FAILED });
      }
    };
    fecthInspectionDetail();
  });

  return (
    <div>
      <h2>Inspection Detail Page of {param.id}</h2>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default InspectionDetail;
