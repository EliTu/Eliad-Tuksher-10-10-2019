import {
	SearchResult,
	SEARCH_REQUEST_INIT,
	SEARCH_REQUEST_SUCCESS,
	SEARCH_REQUEST_FAIL,
	SearchResultActionTypes,
} from './types';
import { Action, ActionCreator } from 'redux';
import setSearchGetRequest from '../../../../utilities/urls/urls';
import axios from 'axios';

export const searchRequestInit: ActionCreator<
	Action
> = (): SearchResultActionTypes => {
	return {
		type: SEARCH_REQUEST_INIT,
	};
};

export const searchRequestSuccess: ActionCreator<Action> = (
	searchResults: SearchResult
): SearchResultActionTypes => {
	return {
		type: SEARCH_REQUEST_SUCCESS,
		results: searchResults,
	};
};

export const searchRequestFail: ActionCreator<Action> = (
	error: string
): SearchResultActionTypes => {
	return {
		type: SEARCH_REQUEST_FAIL,
		error: error,
	};
};

// Thunk async action creator:
export const fireSearchHttpRequest = (searchInputValue: string) => {
	return async (dispatch: any) => {
		dispatch(searchRequestInit());
		try {
			const result = await setSearchGetRequest(
				searchInputValue,
				'search'
			);
			const dataList: any[] = result.data.slice(0, 5);

			dispatch(searchRequestSuccess(dataList));
		} catch (error) {
			console.log(error);
			dispatch(searchRequestFail(error.message));
		}
	};
};
