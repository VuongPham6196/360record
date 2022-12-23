import styles from './LocationsList.module.scss';

import AddImage from 'assets/icons/add.svg';
import EditImage from '../../assets/images/Edit-filter.png';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations, getMoreLocations } from 'redux/locations/actions';
import SortArrow from 'components/UI/SortArrow/SortArrow';

const COLUMNS = [
  { title: 'LOCATION', hasFilter: true, hasSort: false },
  { title: 'REGION', hasFilter: true, hasSort: false },
  { title: 'IS ACTIVE?', hasFilter: true, hasSort: false },
  { title: 'ADDRESS', hasFilter: false, hasSort: false },
  { title: 'CITY', hasFilter: false, hasSort: false },
  { title: 'STATE/PROVINCE', hasFilter: false, hasSort: false },
  { title: 'POSTAL CODE', hasFilter: false, hasSort: false },
  { title: 'COUNTRY', hasFilter: false, hasSort: false },
  { title: 'TIMEZONE', hasFilter: false, hasSort: false },
  { title: 'USERS', hasFilter: false, hasSort: false },
  { title: 'INSPECTIONS', hasFilter: false, hasSort: false },
  { title: 'CREATED AT', hasFilter: false, hasSort: true },
  { title: 'UPDATE AT', hasFilter: false, hasSort: false },
  { title: 'LAST INSPECTION AT', hasFilter: false, hasSort: false },
];

const LocationsList: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const LOCATIONS = useSelector((state: any) => state.locations.locations);
  const PAGEINFO = useSelector((state: any) => state.locations.pageInfo);

  useEffect(() => {
    function getLocationsData() {
      dispatch(getLocations({ first: 20 }));
    }
    getLocationsData();
  }, []);

  //Next page
  function nextPageHandle() {
    dispatch(getLocations({ first: 20, after: PAGEINFO.endCursor }));
  }
  //Prev Page
  function prevPageHandle() {
    dispatch(getLocations({ last: 20, before: PAGEINFO.startCursor }));
  }
  //Load more
  function loadMoreHandle() {
    dispatch(
      getMoreLocations({
        first: 50,
        after: PAGEINFO.endCursor,
      })
    );
  }

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2>Locations</h2>
        <button>
          <img src={AddImage} alt="" />
          CREATE NEW LOCATION
        </button>
      </div>

      {/* SEARCH */}
      <div className={styles.search}>
        <input placeholder="Search Locations..."></input>
        <select>
          <option>Columns 1</option>
          <option>Columns 2</option>
          <option>Columns 3</option>
        </select>
      </div>

      {/* TABLE */}
      <div className={styles['table-container']}>
        <div className={styles['table-name']}>
          <table>
            <thead>
              <tr>
                <th>
                  <div>
                    <span>NAME</span>
                    <SortArrow />
                    <span className={styles.filter}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {LOCATIONS.map((location: any) => {
                return (
                  location && (
                    <tr key={location.id}>
                      <td>
                        <a href={`/dashboard/locations/${location.id}`}>
                          {location.name}
                        </a>
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
        <div className={styles['table-information']}>
          <table>
            <thead>
              <tr>
                {COLUMNS.map((column) => (
                  <th key={column.title}>
                    <div>
                      <span>{column.title}</span>
                      {column.hasSort && <SortArrow />}
                      {column.hasFilter && (
                        <span className={styles.filter}>
                          <img src={EditImage} alt="" />
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LOCATIONS.map((location: any) => {
                return (
                  location && (
                    <tr key={location.id}>
                      <td>
                        <span>{location.company?.name}</span>
                      </td>
                      <td>
                        <span>{location.region?.name}</span>
                      </td>
                      <td>
                        <span>{location.active?.toString()}</span>
                      </td>
                      <td>
                        <span>{location.address1 ?? location.address2}</span>
                      </td>
                      <td>
                        <span>{location.city}</span>
                      </td>
                      <td>
                        <span>{location.state ?? ''}</span>
                      </td>
                      <td>
                        <span>{location.zipcode ?? ''}</span>
                      </td>
                      <td>
                        <span>{location.country ?? ''}</span>
                      </td>
                      <td>
                        <span>{location.timezone ?? ''}</span>
                      </td>
                      <td>
                        <span>{location.totalActiveUsers ?? ''}</span>
                      </td>
                      <td>
                        <span>{location.totalInspections ?? ''}</span>
                      </td>
                      <td>
                        <span>{location.createdAt ?? ''}</span>
                      </td>
                      <td>
                        <span>{location.updatedAt ?? ''}</span>
                      </td>
                      <td>
                        <span>{location.lastInspectionAt ?? ''}</span>
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* LOAD MORE */}
      <div className={styles.loadmore}>
        <button disabled={!PAGEINFO.hasNextPage} onClick={loadMoreHandle}>
          Load More
        </button>
      </div>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        <button disabled={!PAGEINFO.hasPreviousPage} onClick={prevPageHandle}>
          back
        </button>
        <button disabled={!PAGEINFO.hasNextPage} onClick={nextPageHandle}>
          next
        </button>
      </div>
    </div>
  );
};

export default LocationsList;
