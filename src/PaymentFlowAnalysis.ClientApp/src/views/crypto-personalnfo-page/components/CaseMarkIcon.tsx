import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isCaseMarkActionCreator } from '../actions';

export function CaseMarkIcon(props: any) {
  const [toggleThisElement, setToggleThisElement] = useState(props.value == 'True' ? true : false);

  /** Redux dispatch function */
  const dispatch = useDispatch();

  /** 本案相關帳戶 */
  const handleIsCaseMark = useCallback(
    (PersonalInfoId, isCaseMark) => {
      dispatch(isCaseMarkActionCreator(PersonalInfoId, isCaseMark));
    },
    [dispatch],
  );

  return toggleThisElement ? (
    <div
      onClick={() => setCaseMark(!toggleThisElement)}
      style={{ width: '30px', height: '30px', margin: 'auto', cursor: 'pointer', fill: 'rgb(11, 94, 215)' }}
      key={props.id}
    >
      <svg
        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-hj1pze"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="PersonSearchIcon"
      >
        <circle cx="10" cy="8" r="4"></circle>
        <path d="M10.35 14.01C7.62 13.91 2 15.27 2 18v2h9.54c-2.47-2.76-1.23-5.89-1.19-5.99zm9.08 4.01c.36-.59.57-1.28.57-2.02 0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4c.74 0 1.43-.22 2.02-.57L20.59 22 22 20.59l-2.57-2.57zM16 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
      </svg>
    </div>
  ) : (
    <div
      onClick={() => setCaseMark(!toggleThisElement)}
      style={{ width: '30px', height: '30px', margin: 'auto', cursor: 'pointer', fill: 'rgb(11, 94, 215)' }}
    >
      <svg
        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-suy6hi"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="RemoveIcon"
      >
        <path d="M19 13H5v-2h14v2z"></path>
      </svg>
    </div>
  );

  function setCaseMark(flag: boolean) {
    setToggleThisElement(flag);
    console.log(flag);

    handleIsCaseMark(props.PersonalInfoId, flag);
  }
}
