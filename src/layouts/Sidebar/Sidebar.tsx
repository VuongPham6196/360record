import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = (): JSX.Element => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <img
          src="http://192.168.1.189:13030/7a118e128cc5c737471c73f087afdbc9.png"
          alt=""
        />
      </div>
      <ul className={styles.menu}>
        <li>
          <Link to={'/companies'}>COMPANY</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
