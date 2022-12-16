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
    let token =
      (await localStorage.getItem(STORAGE_TOKEN)) ||
      (await cookies.get(STORAGE_TOKEN));
    return token;
  } catch (e) {
    return null;
  }
};

const getAuthorizationToken = async () => {
  const headers = {};

  try {
    const token = (await getStorageToken()) || JWT;
    if (token) {
      return { ...headers, ...{ Authorization: `Token ${token}` } };
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

export const getCompanies = (variables) => {
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
      $before: String
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

export const getRegions = (variables) => {
  variables = variables ?? {};

  const query = `
    query (
      $name: String,
      $active: Boolean,
      $company: [ID!],
      $orderBy: RegionOrder,
      $first: Int,
      $after: String
    ) {
      regions (
        name: $name,
        active: $active,
        company: $company,
        orderBy: $orderBy,
        first: $first,
        after: $after
      ) {
        edges {
          node {
            id
            name
            company { id name active }
            locations {
              edges {
                node {
                  id
                  name
                  active
                }
              }
            }
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

export const getLocations = (variables) => {
  variables = variables ?? {};

  const query = `
    query (
      $name: String,
      $active: Boolean,
      $company: [ID!],
      $region: [ID!],
      $activeCompany: Boolean,
      $orderBy: LocationOrder,
      $first: Int,
      $after: String
    ) {
      locations (
        name: $name,
        active: $active,
        company: $company,
        region: $region,
        activeCompany: $activeCompany,
        orderBy: $orderBy,
        first: $first,
        after: $after
      ) {
        edges {
          node {
            id
            name
            active
            company { id name active }
            region { id name active }
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

export const createCompany = (input) => {
  input = input ?? {};

  const query = `
    mutation (
      $input: CompanyCreateInput!
    ) {
      companyCreate (
        input: $input,
      ) {
        company {
          id
          name
          active
        }
        errors { message path }
      }
    }
  `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ');

  return httpPost({ query, variables: { input } });
};

export const createRegion = (input) => {
  input = input ?? {};

  const query = `
    mutation (
      $input: RegionCreateInput!
    ) {
      regionCreate (
        input: $input,
      ) {
        region {
          id
          name
          active
        }
        errors { message path }
      }
    }
  `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ');

  return httpPost({ query, variables: { input } });
};

export const createLocation = (input) => {
  input = input ?? {};

  const query = `
    mutation (
      $input: LocationCreateInput!
    ) {
      locationCreate (
        input: $input,
      ) {
        location {
          id
          name
          active
        }
        errors { message path }
      }
    }
  `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ');

  return httpPost({ query, variables: { input } });
};

export const updateCompany = (id, input) => {
  input = input ?? {};

  const query = `
    mutation (
      $id: ID!
      $input: CompanyUpdateInput!
    ) {
      companyUpdate (
        id: $id,
        input: $input,
      ) {
        company {
          id
          name
          active
        }
        errors { message path }
      }
    }
  `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ');

  return httpPost({ query, variables: { id, input } });
};

export const updateRegion = (id, input) => {
  input = input ?? {};

  const query = `
    mutation (
      $id: ID!
      $input: RegionUpdateInput!
    ) {
      regionUpdate (
        id: $id,
        input: $input,
      ) {
        region {
          id
          name
          active
        }
        errors { message path }
      }
    }
  `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ');

  return httpPost({ query, variables: { id, input } });
};

export const updateLocation = (id, input) => {
  input = input ?? {};

  const query = `
    mutation (
      $id: ID!
      $input: LocationUpdateInput!
    ) {
      locationUpdate (
        id: $id,
        input: $input,
      ) {
        location {
          id
          name
          active
        }
        errors { message path }
      }
    }
  `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ');

  return httpPost({ query, variables: { id, input } });
};
