import styles from './SortArrow.module.scss';

import UpIcon from 'assets/icons/up.svg';
import UpActiveIcon from 'assets/icons/up-active.svg';
import DownIcon from 'assets/icons/down.svg';
import DownActiveIcon from 'assets/icons/down-active.svg';

const SortArrow: React.FC = (): JSX.Element => {
  return (
    <div className={styles.sort}>
      <div className={styles.up}>
        <img src={UpActiveIcon} alt="" />
        <img src={UpIcon} alt="" />
      </div>
      <div className={styles.down}>
        <img src={DownActiveIcon} alt="" />
        <img src={DownIcon} alt="" />
      </div>
    </div>
  );
};

export default SortArrow;
