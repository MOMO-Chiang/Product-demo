import { UserFilePageAction } from './actions';
import { ActionType } from '.';
import { SelectOptionConfig } from '@shared/types';

export interface UserFileState {
  /** 案件下拉選單 */
  userFileNoOptions: SelectOptionConfig[];
  /** 案件下拉選單 */
  userFileNameOptions: SelectOptionConfig[];
  /** 案號 */
  userFile: string;
}

const DEFAULT_OPTION: SelectOptionConfig[] = [{ text: '--- 請選擇 ---', value: '' }];

/** LoginPage Redux initial state */
const initialState: UserFileState = {
  userFileNoOptions: DEFAULT_OPTION,
  userFileNameOptions: DEFAULT_OPTION,
  userFile: '',
};

export const userFileReducer = (state: UserFileState = initialState, action: UserFilePageAction): UserFileState => {
  switch (action.type) {
    case ActionType.FETCH_USERFILES_SUCCESS: {
      const { userFiles } = action.payload;

      return {
        ...state,
        userFileNoOptions: DEFAULT_OPTION.concat(userFiles.map((x) => ({ value: x.fileNo, text: x.fileNo }))),
        userFileNameOptions: DEFAULT_OPTION.concat(userFiles.map((x) => ({ value: x.fileNo, text: x.fileName }))),
      };
    }

    case ActionType.FETCH_USERFILES_FAILURE: {
      return initialState;
    }

    case ActionType.SELECT_USERFILE: {
      const { userFile } = action.payload;

      return {
        ...state,
        userFile: userFile,
      };
    }

    default:
      return state;
  }
};
