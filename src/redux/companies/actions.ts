export const companiesActionTypes = {
  GET_COMPANIES_REQUEST: 'GET_COMPANIES_REQUEST',
  GET_COMPANIES_REQUEST_SUCCESS: 'GET_COMPANIES_REQUEST_SUCCESS',
  GET_MORECOMPANIES_REQUEST: 'GET_MORECOMPANIES_REQUEST',
  GET_MORECOMPANIES_REQUEST_SUCCESS: 'GET_MORECOMPANIES_REQUEST_SUCCESS',
  GET_COMPANIES_REQUEST_FAILED: 'GET_COMPANIES_REQUEST_FAILED',
};

export const getCompanies = (payload: any) => {
  return {
    type: companiesActionTypes.GET_COMPANIES_REQUEST,
    payload: payload,
  };
};

export const getMoreCompanies = (payload: any) => {
  return {
    type: companiesActionTypes.GET_MORECOMPANIES_REQUEST,
    payload: payload,
  };
};
