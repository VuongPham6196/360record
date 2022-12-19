import axios from 'axios';
import Cookies from 'universal-cookie';

axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';

const STORAGE_TOKEN = 'token';
const GRAPHQL_ENDPOINT = 'http://192.168.1.189:3030/v2';

export const cookies = new Cookies();

export const getStorageToken = () => {
  return localStorage.getItem(STORAGE_TOKEN) ?? cookies.get(STORAGE_TOKEN);
};

const getAuthorizationToken = async () => {
  const headers = {};
  const token = getStorageToken();
  return { ...headers, ...(token && { Authorization: `Token ${token}` }) };
};

export const httpPost = (data) => {
  return getAuthorizationToken()
    .then((headers) => {
      return axios.post(GRAPHQL_ENDPOINT, data, {
        headers,
        withCredentials: false,
      });
    })
    .then((data) => data?.data)
    .catch((error) => error.message);
};

export const login = (username, password) => {
  const query = `
    mutation(
      $username: String!,
      $password: String!
    ) {
      authenticate(
        username: $username,
        password: $password
      ) {
        token
        user {
          id
          name
          firstName
          lastName
          email
          active
          company {
            id
            name
            active
          }
        }
        errors { message path }
      }
    }
  `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ');

  const variables = { username, password };

  return httpPost({ query, variables });
};

export const getCOMPANIES = (variables) => {
  variables = variables ?? {};

  const query = `
  query (
    $name: String,
    $active: Boolean,
    $demo: Boolean,
    $orderBy: CompanyOrder,
    $first: Int,
    $last: Int,
    $after: String,
    $before: String,
    

  ) {
    companies (
      name: $name,
      active: $active,
      demo: $demo,
      orderBy: $orderBy,
      first: $first,
      last: $last,
      after: $after,
      before: $before
    ) {
      edges {
        node {
          id
          name
          active
          regions {
            edges {
              node {
                id
                name
                active
              }
            }
          }
          locations {
            edges {
              node {
                id
                name
                active
              }
            }
          }
          demo
          industry
          planLevel
          productPlan
          monthlyRecurringRevenue
          locations{
            edges{
              node{
                id
              }
            }
          }
          users {
            edges {
              node {
                id
              }
            }
          }
          inspections(after:$after,before:$before,first:$first,last:$last) {
            edges {
              node {
                id
              }
            }
          }
          maxLocations
          maxUsers
          createdAt
          updatedAt
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
  `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ');

  return httpPost({ query, variables });
};
