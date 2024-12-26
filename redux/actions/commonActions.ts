import { Action } from 'redux';

// Define action types
export const SET_DELETE_MODE = 'SET_DELETE_MODE';

// Define action interfaces
interface SetDeleteModeAction extends Action<typeof SET_DELETE_MODE> {
    payload: boolean;
}

// Combine action types using a union
export type CommonActions = SetDeleteModeAction;

// Define action creators
export const setDeleteMode = (isDeleteMode: boolean): SetDeleteModeAction => ({
    type: SET_DELETE_MODE,
    payload: isDeleteMode,
});
