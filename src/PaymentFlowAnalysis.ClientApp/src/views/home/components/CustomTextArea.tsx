import React, { useCallback, useState } from 'react';
import './custom-textarea.scss';

export const CustomTextArea = () => {
  const [lineCount, setLineCount] = useState(1);

  const [textareaValue, setTextareaValue] = useState('');

  const handleChange = useCallback(
    (value) => {
      setTextareaValue(value);
      setLineCount(value.split('\n').length);
    },
    [lineCount],
  );

  return (
    <div className="editor">
      <div className="line-numbers">
        {Array.from(Array(lineCount)).map((item, index) => (
          <span key={index}></span>
        ))}
      </div>
      {/* <Textarea name="code" className="aaa" value={textareaValue} onChange={handleChange}></Textarea> */}
      <textarea
        className="line-numbers-textarea"
        id="code"
        name="code"
        wrap="off"
        value={textareaValue}
        onChange={(e) => handleChange(e.target.value)}
      ></textarea>
    </div>
  );
};
