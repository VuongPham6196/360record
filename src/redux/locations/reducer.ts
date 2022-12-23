import { locationsActionTypes } from './actions';

//initial pageInfo
const initPageInfo = {
  endCursor: null,
  hasNextPage: false,
  hasPreviousPage: false,
  startCursor: null,
};

const initialState = {
  loading: false,
  locations: [],
  pageInfo: initPageInfo,
  errorMsg: null,
};

const locationsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case locationsActionTypes.GET_LOCATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        errorMsg: null,
      };
    case locationsActionTypes.GET_LOCATIONS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        locations: action.payload.edges.map((item: any) => item.node),
        pageInfo: action.payload.pageInfo,
        errorMsg: null,
      };

    case locationsActionTypes.GET_MORELOCATIONS_REQUEST_SUCCESS:
      // Update pageInfo when concat companies array
      const { pageInfo } = state;
      const updatedPageInfo = {
        ...pageInfo,
        endCursor: action.payload.pageInfo.endCursor,
        hasNextPage: action.payload.pageInfo.hasNextPage,
      };

      return {
        ...state,
        loading: false,
        locations: state.locations.concat(
          action.payload.edges.map((item: any) => item.node)
        ),
        pageInfo: updatedPageInfo,
        errorMsg: null,
      };

    case locationsActionTypes.GET_LOCATIONS_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        locations: [],
        pageInfo: initPageInfo,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default locationsReducer;
