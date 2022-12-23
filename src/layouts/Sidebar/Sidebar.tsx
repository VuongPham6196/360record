import { NavLink } from 'react-router-dom';
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
          <NavLink to={'/dashboard/units'}>Units</NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/inspections'}>Inspections</NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/workorders'}>Work Orders</NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/tasks'}>Tasks</NavLink>
        </li>
        <p>ADMINISTRATION</p>
        <li>
          <NavLink to={'/dashboard/notifications'}>Notifications</NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/companies'}>Companies</NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/regions'}>Regions</NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/locations'}>Locations</NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/users'}>Users</NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/emailtemplates'}>Email Templates</NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/digitalforms'}>Digital Forms</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
