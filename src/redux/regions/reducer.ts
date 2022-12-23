import { regionsActionTypes } from './actions';

//initial pageInfo
const initPageInfo = {
  endCursor: null,
  hasNextPage: false,
  hasPreviousPage: false,
  startCursor: null,
};

const initialState = {
  loading: false,
  regions: [],
  pageInfo: initPageInfo,
  errorMsg: null,
};

const regionsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case regionsActionTypes.GET_REGIONS_REQUEST:
      return {
        ...state,
        loading: true,
        errorMsg: null,
      };
    case regionsActionTypes.GET_REGIONS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        regions: action.payload.edges.map((item: any) => item.node),
        pageInfo: action.payload.pageInfo,
        errorMsg: null,
      };

    case regionsActionTypes.GET_MOREREGIONS_REQUEST_SUCCESS:
      console.log(action.payload);

      // Update pageInfo when concat regions array
      const { pageInfo } = state;
      const updatedPageInfo = {
        ...pageInfo,
        endCursor: action.payload.pageInfo.endCursor,
        hasNextPage: action.payload.pageInfo.hasNextPage,
      };

      return {
        ...state,
        loading: false,
        regions: state.regions.concat(
          action.payload.edges.map((item: any) => item.node)
        ),
        pageInfo: updatedPageInfo,
        errorMsg: null,
      };

    case regionsActionTypes.GET_REGIONS_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        regions: [],
        pageInfo: initPageInfo,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default regionsReducer;
