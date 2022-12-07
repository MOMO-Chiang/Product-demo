import { UserFile } from '@shared/types';

/** Enum of action's type */
export enum ActionType {
  /** 取得案件列表 */
  FETCH_USERFILES = '@UserFilePage/FETCH_USERFILES',

  /** 取得案件列表 - 成功 */
  FETCH_USERFILES_SUCCESS = '@UserFilePage/FETCH_USERFILES_SUCCESS',

  /** 取得案件列表 - 失敗 */
  FETCH_USERFILES_FAILURE = '@UserFilePage/FETCH_USERFILES_FAILURE',

  /** 選取案號 */
  SELECT_USERFILE = '@UserFilePage/SELECT_USERFILE',
}

/** UserFilePage Action */
export type UserFilePageAction =
  | FetchUserFilesAction
  | FetchUserFilesSuccessAction
  | FetchUserFilesFailureAction
  | SelectUserFileAction;

/** 取得案件列表 */
export interface FetchUserFilesAction {
  type: ActionType.FETCH_USERFILES;
}

/** 取得案件列表 - 成功 */
export interface FetchUserFilesSuccessAction {
  type: ActionType.FETCH_USERFILES_SUCCESS;
  payload: { userFiles: UserFile[] };
}

/** 取得案件列表 - 失敗 */
export interface FetchUserFilesFailureAction {
  type: ActionType.FETCH_USERFILES_FAILURE;
}

/** 選取案號 */
export interface SelectUserFileAction {
  type: ActionType.SELECT_USERFILE;
  payload: { userFile: string };
}

/** 取得案件列表 */
export const fetchUserFilesActionCreator = (): FetchUserFilesAction => ({
  type: ActionType.FETCH_USERFILES,
});

/** 取得案件列表 - 成功 */
export const fetchUserFilesSuccessActionCreator = (userFiles: UserFile[]): FetchUserFilesSuccessAction => ({
  type: ActionType.FETCH_USERFILES_SUCCESS,
  payload: { userFiles },
});

/** 取得案件列表 - 失敗 */
export const fetchUserFilesFailureActionCreator = (): FetchUserFilesFailureAction => ({
  type: ActionType.FETCH_USERFILES_FAILURE,
});

/** 選取案號 */
export const selectUserFileActionCreator = (userFile: string): SelectUserFileAction => ({
  type: ActionType.SELECT_USERFILE,
  payload: { userFile },
});
