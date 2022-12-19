import styles from './Company.module.scss';

import AddImage from 'assets/icons/add.svg';
import EditImage from '../../assets/images/Edit-filter.png';
import UpIcon from 'assets/icons/up.svg';
import UpActiveIcon from 'assets/icons/up-active.svg';
import DownIcon from 'assets/icons/down.svg';
import DownActiveIcon from 'assets/icons/down-active.svg';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanies, getMoreCompanies } from 'redux/companies/actions';

const Company: React.FC = (): JSX.Element => {
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
          <img src={AddImage} /> CREATE NEW COMPANY
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
                    <span> NAME</span>
                    <span className={styles.indicator}>
                      <img src={UpIcon} alt="" />
                      <img src={UpActiveIcon} alt="" />
                      <img src={DownIcon} alt="" />
                      <img src={DownActiveIcon} alt="" />
                    </span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPANIES.map((company: any) => {
                if (company.node) {
                  return (
                    <tr key={company.node.id}>
                      <td>
                        <a href="#">{company.node.name}</a>
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
                    <span>INDUSTRY</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span> REGIONS</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span> PLAN LEVEL</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span> PRODUCT PLAN</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span> MRR</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span> LOCATIONS</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span> USERS</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span> INSPECTIONS</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span> IS DEMO?</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span> IS ACTIVE?</span>
                    <span className={styles.dropdown}>
                      <img src={EditImage} alt="" />
                    </span>
                  </div>
                </th>
                <th>
                  <div>
                    <span> MAX LOCATIONS</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span> MAX USERS</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span> CREATED AT</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span> UPDATED AT</span>
                  </div>
                </th>
                <th>
                  <div>
                    <span> COMPANY ID</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPANIES.map((company: any) => {
                if (company.node) {
                  return (
                    <tr key={company.node.id}>
                      <td>
                        <span>{company.node.industry}</span>
                      </td>
                      <td>
                        <span>{company.node.regions.edges.length}</span>
                      </td>
                      <td>
                        <span>{company.node.planLevel}</span>
                      </td>
                      <td>
                        <span>{company.node.productPlan}</span>
                      </td>
                      <td>
                        <span>{company.node.monthlyRecurringRevenue}</span>
                      </td>
                      <td>
                        <span>{company.node.locations.edges.length}</span>
                      </td>
                      <td>
                        <span>{company.node.users.edges.length}</span>
                      </td>
                      <td>
                        <span>{company.node.inspections.edges.length}</span>
                      </td>
                      <td>
                        <span>{company.node.demo}</span>
                      </td>
                      <td>
                        <span>{company.node.active.toString()}</span>
                      </td>
                      <td>
                        <span>{company.node.maxLocations}</span>
                      </td>
                      <td>
                        <span>{company.node.maxUsers}</span>
                      </td>
                      <td>
                        <span>{company.node.createAt}</span>
                      </td>
                      <td>
                        <span>{company.node.updatedAt}</span>
                      </td>
                      <td>
                        <span>{company.node.id}</span>
                      </td>
                    </tr>
                  );
                }
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

export default Company;
