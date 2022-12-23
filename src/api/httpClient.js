import axios from 'axios';
import Cookies from 'universal-cookie';

axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';

const STORAGE_TOKEN = 'token';
const STORAGE_USER = 'user';
const GRAPHQL_ENDPOINT = 'http://192.168.1.189:3030/v2';

export const cookies = new Cookies();

export const getStorageToken = () => {
  return localStorage.getItem(STORAGE_TOKEN) ?? cookies.get(STORAGE_TOKEN);
};

export const getStorageUser = () => {
  return localStorage.getItem(STORAGE_USER) ?? cookies.get(STORAGE_USER);
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
          role
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

export const getUser = () => {
  const query = `
  query($id:ID){
    user(id:$id){
     role
    }
  }`
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ');

  return httpPost({ query, id: null });
};

export const getCOMPANIES = (variables) => {
  variables = variables ?? {};

  const query = `
  query (
    $orderBy: CompanyOrder,
    $first: Int,
    $last: Int,
    $after: String,
    $before: String,
  ) {
    companies (
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
          industry
          regionCount
          planLevel
          productPlan
          monthlyRecurringRevenue
         	locationCount
        	billableUserCount
         	inspectionCount
          demo
          active
          maxLocations
          maxUsers
          createdAt
          updatedAt
          lastInspectionAt
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

export const getCOMPANY = (variables) => {
  variables = variables ?? {};

  const query = `
  query ($id: ID!) {
    company(id: $id) {
      name
      active
      createdAt
    }
  }
  
  `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ');

  return httpPost({ query, variables });
};

export const getINSPECTIONS = (variables) => {
  variables = variables ?? {};
  const query = `
  query (
    $orderBy: InspectionOrder,
    $first: Int,
    $last: Int,
    $after: String,
    $before: String,
  ) {
    inspections (
      orderBy: $orderBy,
      first: $first,
      last: $last,
      after: $after,
      before: $before
    ) {
      edges {
        node {
          id
          typeLabel
          damage
          user {
            name
          }
          workflowName
          department {
            label
          }
          company {
            name 
          }
          region {
            name
          }
          location {
            name
          }
          createdAt
          numPhotos
          numVideos
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

export const getINSPECTION = (variables) => {
  variables = variables ?? {};
  const query = `
  query($id:ID){
    inspection(id:$id){
      id
      numPhotos
      numVideos
    }
  }`
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ');

  return httpPost({ query, variables });
};

export const getLOCATIONS = (variables) => {
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
  $last:Int,
  $before:String,
) {
  locations (
    name: $name,
    active: $active,
    company: $company,
    region: $region,
    activeCompany: $activeCompany,
    orderBy: $orderBy,
    first: $first,
    after: $after,
    last:$last,
    before:$before
  ) {
    edges {
      node {
        id
        name
        active
        address1
        address2
        city
        state
        zipcode
        country
        timezone
        totalActiveUsers
        totalInspections
        createdAt
        updatedAt
        lastInspectionAt
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

export const getLOCATION = (variables) => {
  variables = variables ?? {};

  const query = `
  query ($id: ID!) {
    location(id: $id) {
      name
      createdAt
    }
  }
  `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ');

  return httpPost({ query, variables });
};

export const getREGIONS = (variables) => {
  variables = variables ?? {};

  const query = `
  query($after: String,$before: String,$first: Int,$last:Int,$orderBy: RegionOrder){
    regions(after:$after,before:$before,first:$first,last:$last,orderBy:$orderBy){
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      edges{
        node{
          id
          name
          company{name}
          locationCount
          active
          userCount
          inspectionCount
          createdAt
          updatedAt
          lastInspectionAt
        }
      }
    }
  }
  `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ');

  return httpPost({ query, variables });
};

export const getREGION = (variables) => {
  variables = variables ?? {};

  const query = `
query($id:ID!){
  region(id:$id){
    id
    name
  }
}`
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/gm, ' ');

  return httpPost({ query, variables });
};
