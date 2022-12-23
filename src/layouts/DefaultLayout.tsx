import { useSelector } from 'react-redux';
import styles from './DefaultLayout.module.scss';

import Sidebar from './Sidebar/Sidebar';

const DefaultLayout: React.FC<any> = ({ children }): JSX.Element => {
  const token = useSelector((state: any) => state.auth.token);

  return (
    <div>
      {token ? (
        <div className={styles['default-layout']}>
          <div className={styles['sidebar-wrapper']}>
            <Sidebar />
          </div>
          <div className={styles['content-wrapper']}>{children}</div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default DefaultLayout;
