import axios from 'axios';
import Cookies from 'universal-cookie';

axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';

const STORAGE_TOKEN = 'jwt';
const GRAPHQL_ENDPOINT = 'http://192.168.1.189:3030/v2';
const JWT =
  'eyJraWQiOiJNbDB1RlREbmFvY3Yxc3E2MVZTYTZRIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIyMTI5IiwiaWF0IjoxNjY2MzIxODk3fQ.ii8omCBBUuoReVccoDHJEd-Wu_lQPUVb8BhyU8OeC3pX3axe2S0WM33X0TXmybKWrMPTH-QSt9VwtQm0BOppvg';

export const cookies = new Cookies();

export const getStorageToken = async () => {
  try {
    const token =
      (await localStorage.getItem(STORAGE_TOKEN)) ||
      (await cookies.get(STORAGE_TOKEN));
    return token;
  } catch (error) {
    return console.log(error);
  }
};

export const getAuthorizationToken = async () => {
  const headers = {};

  try {
    const token = (await getStorageToken()) || JWT;

    if (token) {
      return { ...headers, ...{ Authorization: `Token ${token}` } }; //xem laij cho nay
    } else {
      return headers;
    }
  } catch (e) {
    return Promise.reject(new Error(e));
  }
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
  console.log('login called');

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
  console.log(variables);

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
