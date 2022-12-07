import React, { useState } from 'react';
import cx from 'classnames';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import * as DateFns from 'date-fns';
import zhtw from 'date-fns/locale/zh-TW';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('zh-TW', zhtw);

export interface DatePickerProps {
  /** input id */
  id?: string;
  /** input name */
  name?: string;
  /** validation invalid */
  invalid?: boolean;
  /** class name */
  className?: string;
  /** date format, default: yyyy/MM/dd */
  format?: string;
  /** date locale, default: 'zh-TW' */
  locale?: string;
  /** input value */
  value?: string;
  /** disabled */
  disabled?: boolean;
  /** hint text, default: 年/月/日 */
  placeholder?: string;
  /** ShowTime input */
  timeInput?: boolean;
  /** autoComplete input */
  autoComplete?: boolean;

  /**
   * change event
   * @argument date 當前日期
   */
  onChange?: (date: string) => void;
}

/**
 * 日期選擇元件
 * @returns DatePicker
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  id,
  name,
  className,
  invalid,
  format,
  locale,
  value,
  disabled,
  placeholder,
  timeInput,
  autoComplete,
  onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? parseStringToDate(value) : null);
  const dateFormat = format || 'yyyy/MM/dd';
  const datePickerLocale = locale || 'zh-TW';
  const inputClassName = cx('form-control', className || '', {
    'is-invalid': invalid,
  });
  const placeholderText = placeholder || '年/月/日';
  const showTimeInput = timeInput || false;
  const autoCompleteSet = autoComplete ? 'on' : 'off';
  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    if (onChange) onChange((date && DateFns.format(date, dateFormat)) || '');
  };

  return (
    <ReactDatePicker
      id={id}
      name={name}
      dateFormat={dateFormat}
      locale={datePickerLocale}
      selected={selectedDate}
      onChange={handleChange}
      className={inputClassName}
      value={value}
      placeholderText={placeholderText}
      disabled={disabled}
      showTimeInput={showTimeInput}
      autoComplete={autoCompleteSet}
    />
  );
};

/**
 * string 轉 Date
 * @returns Date | null
 */
function parseStringToDate(str: string) {
  if (!str) return null;

  try {
    const dateMsec = Date.parse(str);
    const result = DateFns.toDate(dateMsec);
    return result;
  } catch (error) {
    return null;
  }
}
