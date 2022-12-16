import styles from './DefaultLayout.module.scss';

import Sidebar from './Sidebar/Sidebar';

const DefaultLayout: React.FC<any> = ({ children }): JSX.Element => {
  return (
    <div className={styles['default-layout']}>
      <div className={styles['sidebar-wrapper']}>
        <Sidebar />
      </div>
      <div className={styles['content-wrapper']}>{children}</div>
    </div>
  );
};

export default DefaultLayout;
