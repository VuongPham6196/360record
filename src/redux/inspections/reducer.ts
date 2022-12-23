import { inspectionsActionTypes } from './actions';

//initial pageInfo
const initPageInfo = {
  startCursor: null,
  endCursor: null,
  hasNextPage: false,
  hasPreviousPage: false,
};

const initialState = {
  loading: false,
  inspections: [],
  pageInfo: initPageInfo,
  errorMsg: null,
};

const inspectionsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case inspectionsActionTypes.GET_INSPECTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        errorMsg: null,
      };
    case inspectionsActionTypes.GET_INSPECTIONS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        inspections: action.payload.edges.map((item: any) => item.node),
        pageInfo: action.payload.pageInfo,
        errorMsg: null,
      };

    case inspectionsActionTypes.GET_MOREINSPECTIONS_REQUEST_SUCCESS:
      // Update pageInfo when concat INSPECTIONS array
      const { pageInfo } = state;
      const updatedPageInfo = {
        ...pageInfo,
        endCursor: action.payload.pageInfo.endCursor,
        hasNextPage: action.payload.pageInfo.hasNextPage,
      };

      return {
        ...state,
        loading: false,
        inspections: state.inspections.concat(
          action.payload.edges.map((item: any) => item.node)
        ),
        pageInfo: updatedPageInfo,
        errorMsg: null,
      };

    case inspectionsActionTypes.GET_INSPECTIONS_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        inspections: [],
        pageInfo: initPageInfo,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default inspectionsReducer;
