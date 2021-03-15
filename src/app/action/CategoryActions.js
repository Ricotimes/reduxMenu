import * as types from '../constants/CategoryTypes';

export const setActive = (categoryActive) => ({
	type: types.SET_ACTIVE,
    active:categoryActive
})
