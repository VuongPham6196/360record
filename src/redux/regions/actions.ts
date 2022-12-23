export const regionsActionTypes = {
  GET_REGIONS_REQUEST: 'GET_REGIONS_REQUEST',
  GET_REGIONS_REQUEST_SUCCESS: 'GET_REGIONS_REQUEST_SUCCESS',
  GET_MOREREGIONS_REQUEST: 'GET_MOREREGIONS_REQUEST',
  GET_MOREREGIONS_REQUEST_SUCCESS: 'GET_MOREREGIONS_REQUEST_SUCCESS',
  GET_REGIONS_REQUEST_FAILED: 'GET_REGIONS_REQUEST_FAILED',
};

export const getRegions = (payload: any) => {
  return {
    type: regionsActionTypes.GET_REGIONS_REQUEST,
    payload: payload,
  };
};

export const getMoreRegions = (payload: any) => {
  return {
    type: regionsActionTypes.GET_MOREREGIONS_REQUEST,
    payload: payload,
  };
};
