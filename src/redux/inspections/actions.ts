export const inspectionsActionTypes = {
  GET_INSPECTIONS_REQUEST: 'GET_INSPECTIONS_REQUEST',
  GET_INSPECTIONS_REQUEST_SUCCESS: 'GET_INSPECTIONS_REQUEST_SUCCESS',
  GET_MOREINSPECTIONS_REQUEST: 'GET_MOREINSPECTIONS_REQUEST',
  GET_MOREINSPECTIONS_REQUEST_SUCCESS: 'GET_MOREINSPECTIONS_REQUEST_SUCCESS',
  GET_INSPECTIONS_REQUEST_FAILED: 'GET_INSPECTIONS_REQUEST_FAILED',
};

export const getInspections = (payload: any) => {
  return {
    type: inspectionsActionTypes.GET_INSPECTIONS_REQUEST,
    payload: payload,
  };
};

export const getMoreInspections = (payload: any) => {
  return {
    type: inspectionsActionTypes.GET_MOREINSPECTIONS_REQUEST,
    payload: payload,
  };
};
