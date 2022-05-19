import { TUserState, USER_KEY, USER_SEARCH } from './../actions/user.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserFeature = createFeatureSelector<TUserState>(USER_KEY);
export const selectUser = createSelector(selectUserFeature, (state) => state);
export const selectAllUserFeature = createFeatureSelector<TUserState>(USER_SEARCH);
export const selectUsers = createSelector(selectUserFeature, (state) => state);
