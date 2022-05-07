import { TUserState, USER_KEY } from './../actions/user.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserFeature = createFeatureSelector<TUserState>(USER_KEY);
export const selectUser = createSelector(selectUserFeature, (state) => state);
