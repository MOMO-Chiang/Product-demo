import React, { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
//import { javascript } from '@codemirror/lang-javascript';
import './demo-code-mirrow.scss';

export const DemoCodeMirrow = () => {
  const onChange = useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);
  return (
    <CodeMirror
      value=""
      height="200px"
      //extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
};
