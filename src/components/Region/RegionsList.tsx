import styles from './RegionsList.module.scss';

import AddImage from 'assets/icons/add.svg';
import EditImage from '../../assets/images/Edit-filter.png';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRegions, getMoreRegions } from 'redux/regions/actions';
import SortArrow from 'components/UI/SortArrow/SortArrow';

const RegionsList: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const REGIONS = useSelector((state: any) => state.regions.regions);
  const PAGEINFO = useSelector((state: any) => state.regions.pageInfo);

  useEffect(() => {
    function getRegionsData() {
      dispatch(getRegions({ first: 20 }));
    }
    getRegionsData();
  }, []);

  //Next page
  function nextPageHandle() {
    dispatch(getRegions({ first: 20, after: PAGEINFO.endCursor }));
  }
  //Prev Page
  function prevPageHandle() {
    dispatch(getRegions({ last: 20, before: PAGEINFO.startCursor }));
  }
  //Load more
  function loadMoreHandle() {
    console.log(REGIONS.length);

    dispatch(
      getMoreRegions({
        first: 50,
        after: PAGEINFO.endCursor,
      })
    );
  }

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2>Regions</h2>
        <button>
          <img src={AddImage} alt="" /> CREATE NEW COMPANY
        </button>
      </div>

      {/* SEARCH */}
      <div className={styles.search}>
        <input placeholder="Search regions..."></input>
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
                    <span>REGION</span>
                    <SortArrow />
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {REGIONS.map((region: any) => {
                return (
                  region && (
                    <tr key={region.id}>
                      <td>
                        <a href={`/dashboard/regions/${region.id}`}>
                          {region.name}
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
                <th>
                  <div>
                    <span>COMPANY</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>LOCATIONS</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>IS ACTIVE?</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>USERS</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>INSPECTIONS</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>CREATED AT</span>
                    <SortArrow />
                  </div>
                </th>
                <th>
                  <div>
                    <span>UPDATED AT</span>
                    <SortArrow />
                  </div>
                </th>
                <th>
                  <div>
                    <span>LAST INSPECTION AT</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {REGIONS.map((region: any) => {
                return (
                  region && (
                    <tr key={region.id}>
                      <td>
                        <span>{region.company?.name ?? ''}</span>
                      </td>
                      <td>
                        <span>{region.locationCount ?? ''}</span>
                      </td>
                      <td>
                        <span>{region.active ?? ''}</span>
                      </td>
                      <td>
                        <span>{region.userCount ?? ''}</span>
                      </td>
                      <td>
                        <span>{region.inspectionCount ?? ''}</span>
                      </td>
                      <td>
                        <span>{region.createdAt ?? ''}</span>
                      </td>
                      <td>
                        <span>{region.updatedAt ?? ''}</span>
                      </td>
                      <td>
                        <span>{region.lastInspectionAt ?? ''}</span>
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

export default RegionsList;
