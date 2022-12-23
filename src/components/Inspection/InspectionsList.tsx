import styles from './InspectionsList.module.scss';

import EditImage from 'assets/images/Edit-filter.png';
import InforIcon from 'assets/icons/information.svg';
import TaskIcon from 'assets/icons/task.svg';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getInspections, getMoreInspections } from 'redux/inspections/actions';
import SortArrow from 'components/UI/SortArrow/SortArrow';

const InspectionsList: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const INSPECTIONS = useSelector(
    (state: any) => state.inspections.inspections
  );
  const PAGEINFO = useSelector((state: any) => state.inspections.pageInfo);

  const COLUMNS = [
    'TYPE',
    'DAMAGE',
    'USER',
    'WORKFLOW',
    'DEPARTMENT',
    'COMPANY',
    'REGION',
    'LOCATION',
    'ESIGN',
    'CREATE AT',
    'PHOTOS',
    'VIDEOS',
  ];

  useEffect(() => {
    function getInspectionsData() {
      dispatch(getInspections({ first: 20 }));
    }
    getInspectionsData();
  }, []);

  //Next page
  function nextPageHandle() {
    dispatch(getInspections({ first: 20, after: PAGEINFO.endCursor }));
  }
  //Prev Page
  function prevPageHandle() {
    dispatch(getInspections({ last: 20, before: PAGEINFO.startCursor }));
  }
  //Load more
  function loadMoreHandle() {
    console.log(INSPECTIONS.length);

    dispatch(
      getMoreInspections({
        first: 50,
        after: PAGEINFO.endCursor,
      })
    );
  }

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2>Inspection</h2>
        <div className={styles['create-task']}>
          <img src={InforIcon} alt="infor-icon" />
          <span>You can create a new draft inspection in</span>
          <div>
            <button>
              <img src={TaskIcon} alt="" />
              Tasks
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className={styles.search}>
        <div className={styles.tabs}>
          <span>All</span>
          <span>Commited</span>
          <span>Drafts</span>
        </div>
        <div className={styles.filters}>
          <select>
            <option>Inspections</option>
            <option>Checklist</option>
          </select>
          <input placeholder="Search Inspections..."></input>
          <select placeholder="Columns">
            <option>Columns</option>
            <option>2</option>
          </select>
          <select placeholder="Export">
            <option>Current Page</option>
            <option>Current Filter</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className={styles['table-container']}>
        <div className={styles['table-name']}>
          <table>
            <thead>
              <tr>
                <th>
                  <div>
                    <span>UNIT ID</span>
                    <SortArrow />
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {INSPECTIONS.map((inspection: any) => {
                if (inspection) {
                  return (
                    <tr key={inspection.id ?? ''}>
                      <td>
                        <a
                          href={`/dashboard/inspections/${inspection.id ?? ''}`}
                        >
                          {inspection.id ?? ''}
                        </a>
                      </td>
                    </tr>
                  );
                }
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
                    <span>TYPE</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>DAMAGE</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>USER</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>WORKFLOW</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>DEPARTMENT</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
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
                    <span>REGION</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>LOCATION</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>ESIGN</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>CREATE AT</span>
                    <SortArrow />
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>PHOTOS</span>
                    <SortArrow />
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>VIDEOS</span>
                    <SortArrow />
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {INSPECTIONS.map((inspection: any) => {
                return (
                  inspection && (
                    <tr key={inspection.id ?? ''}>
                      <td>
                        <span>{inspection.typeLabel ?? ''}</span>
                      </td>
                      <td>
                        <span>{inspection.damage ?? ''}</span>
                      </td>
                      <td>
                        <span>{inspection.user?.name ?? ''}</span>
                      </td>
                      <td>
                        <span>{inspection.workflowName ?? ''}</span>
                      </td>
                      <td>
                        <span>{inspection.department?.label ?? ''}</span>
                      </td>
                      <td>
                        <span>{inspection.company?.name ?? ''}</span>
                      </td>
                      <td>
                        <span>{inspection.region?.name ?? ''}</span>
                      </td>
                      <td>
                        <span>{inspection.location?.name ?? ''}</span>
                      </td>
                      <td>
                        <span></span>
                      </td>
                      <td>
                        <span>{inspection.createdAt ?? ''}</span>
                      </td>
                      <td>
                        <span>{inspection.numPhotos ?? ''}</span>
                      </td>
                      <td>
                        <span>{inspection.numVideos ?? ''}</span>
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

export default InspectionsList;
