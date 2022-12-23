export const locationsActionTypes = {
  GET_LOCATIONS_REQUEST: 'GET_LOCATIONS_REQUEST',
  GET_LOCATIONS_REQUEST_SUCCESS: 'GET_LOCATIONS_REQUEST_SUCCESS',
  GET_MORELOCATIONS_REQUEST: 'GET_MORELOCATIONS_REQUEST',
  GET_MORELOCATIONS_REQUEST_SUCCESS: 'GET_MORELOCATIONS_REQUEST_SUCCESS',
  GET_LOCATIONS_REQUEST_FAILED: 'GET_LOCATIONS_REQUEST_FAILED',
};

export const getLocations = (payload: any) => {
  return {
    type: locationsActionTypes.GET_LOCATIONS_REQUEST,
    payload: payload,
  };
};

export const getMoreLocations = (payload: any) => {
  return {
    type: locationsActionTypes.GET_MORELOCATIONS_REQUEST,
    payload: payload,
  };
};
