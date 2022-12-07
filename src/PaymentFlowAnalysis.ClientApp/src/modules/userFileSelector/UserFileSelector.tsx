import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@app/store';
import { Label, Select } from '@app/components/form';
import { getLoginInfo } from '@shared/auth';
import { fetchUserFilesActionCreator, selectUserFileActionCreator } from '.';

// function getUserFileNos() {
//   const loginInfo = getLoginInfo();

//   return loginInfo && loginInfo.userFiles ? loginInfo.userFiles.map((x) => ({ value: x.fileNo, text: x.fileNo })) : [];
// }

// function getUserFileNames() {
//   const loginInfo = getLoginInfo();

//   return loginInfo && loginInfo.userFiles ? loginInfo.userFiles.map((x) => ({ value: x.fileNo, text: x.fileName })) : [];
// }

export const UserFileSelector = () => {
  /** 案件案號 */
  const userFile = useSelector((state: AppState) => state.userFile.userFile);

  const userFileNoOptions = useSelector((state: AppState) => state.userFile.userFileNoOptions);

  const userFileNameOptions = useSelector((state: AppState) => state.userFile.userFileNameOptions);

  /** Redux dispatch function */
  const dispatch = useDispatch();

  const handleSelectUserFile = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault();
      dispatch(selectUserFileActionCreator(e.target.value));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(fetchUserFilesActionCreator());
  }, [dispatch]);

  return (
    <>
      <div className="nav-item fileSelectContainer">
        <Label htmlFor="userFileNo" className="fileSelect">
          案號
        </Label>
        <Select
          id="userFileNo"
          name="userFileNo"
          options={userFileNoOptions}
          onChange={handleSelectUserFile}
          value={userFile}
        />
      </div>
      <div className="nav-item ms-2 fileSelectContainer">
        <Label htmlFor="userFileNo" className="fileSelect">
          案名
        </Label>
        <Select
          id="userFileName"
          name="userFileName"
          options={userFileNameOptions}
          onChange={handleSelectUserFile}
          value={userFile}
        />
      </div>
    </>
  );
};
