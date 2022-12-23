import styles from './CompaniesList.module.scss';

import AddImage from 'assets/icons/add.svg';
import EditImage from '../../assets/images/Edit-filter.png';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanies, getMoreCompanies } from 'redux/companies/actions';
import SortArrow from 'components/UI/SortArrow/SortArrow';

const CompaniesList: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const COMPANIES = useSelector((state: any) => state.companies.companies);
  const PAGEINFO = useSelector((state: any) => state.companies.pageInfo);

  useEffect(() => {
    function getCompaniesData() {
      dispatch(getCompanies({ first: 20 }));
    }
    getCompaniesData();
  }, []);

  //Next page
  function nextPageHandle() {
    dispatch(getCompanies({ first: 20, after: PAGEINFO.endCursor }));
  }
  //Prev Page
  function prevPageHandle() {
    dispatch(getCompanies({ last: 20, before: PAGEINFO.startCursor }));
  }
  //Load more
  function loadMoreHandle() {
    console.log(COMPANIES.length);

    dispatch(
      getMoreCompanies({
        first: 50,
        after: PAGEINFO.endCursor,
      })
    );
  }

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2>Companies</h2>
        <button>
          <img src={AddImage} alt="" />
          CREATE NEW COMPANY
        </button>
      </div>

      {/* SEARCH */}
      <div className={styles.search}>
        <input placeholder="Search companies..."></input>
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
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPANIES.map((company: any) => {
                return (
                  company && (
                    <tr key={company.id}>
                      <td>
                        <a href={`/dashboard/companies/${company.id}`}>
                          {company.name}
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
                    <span>INDUSTRY</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>REGIONS</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>PLAN LEVEL</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>PRODUCT PLAN</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>MRR</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>LOCATIONS</span>
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
                    <span>IS DEMO?</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
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
                    <span>MAX LOCATIONS</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>MAX USERS</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span>CREATED AT</span>
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
                    <span>LAST INSPECTION</span>
                    <SortArrow />
                  </div>
                </th>
                <th>
                  <div>
                    <span>COMPANY ID</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPANIES.map((company: any) => {
                return (
                  company && (
                    <tr key={company.id}>
                      <td>
                        <span>{company.industry ?? ''}</span>
                      </td>
                      <td>
                        <span>{company.regionCount ?? ''}</span>
                      </td>
                      <td>
                        <span>{company.planLevel ?? ''}</span>
                      </td>
                      <td>
                        <span>{company.productPlan ?? ''}</span>
                      </td>
                      <td>
                        <span>${company.monthlyRecurringRevenue ?? ''}</span>
                      </td>
                      <td>
                        <span>{company.locationCount ?? ''}</span>
                      </td>
                      <td>
                        <span>{company.billableUserCount ?? ''}</span>
                      </td>
                      <td>
                        <span>{company.inspectionCount ?? 0}</span>
                      </td>
                      <td>
                        <span>{company.demo.toString() ?? ''}</span>
                      </td>
                      <td>
                        <span>{company.active.toString() ?? ''}</span>
                      </td>
                      <td>
                        <span>{company.maxLocations ?? ''}</span>
                      </td>
                      <td>
                        <span>{company.maxUsers ?? ''}</span>
                      </td>
                      <td>
                        <span>{company.createdAt ?? ''}</span>
                      </td>
                      <td>
                        <span>{company.updatedAt ?? ''}</span>
                      </td>
                      <td>
                        <span>{company.lastInspectionAt ?? ''}</span>
                      </td>
                      <td>
                        <span>{company.id ?? ''}</span>
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

export default CompaniesList;
