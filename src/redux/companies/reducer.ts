import { companiesActionTypes } from './actions';
import { cookies } from 'api/httpClient';

//initial pageInfo
const initPageInfo = {
  endCursor: null,
  hasNextPage: false,
  hasPreviousPage: false,
  startCursor: null,
};

const initialState = {
  loading: false,
  companies: [],
  pageInfo: initPageInfo,
  errorMsg: null,
};

const companiesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case companiesActionTypes.GET_COMPANIES_REQUEST:
      return {
        ...state,
        loading: true,
        errorMsg: null,
      };
    case companiesActionTypes.GET_COMPANIES_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        companies: action.payload.edges,
        pageInfo: action.payload.pageInfo,
        errorMsg: null,
      };

    case companiesActionTypes.GET_MORECOMPANIES_REQUEST_SUCCESS:
      console.log(action.payload);

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
        companies: state.companies.concat(action.payload.edges),
        pageInfo: updatedPageInfo,
        errorMsg: null,
      };

    case companiesActionTypes.GET_COMPANIES_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        companies: [],
        pageInfo: initPageInfo,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default companiesReducer;
