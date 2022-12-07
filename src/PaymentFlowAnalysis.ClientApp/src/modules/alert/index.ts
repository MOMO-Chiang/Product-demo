import Swal from 'sweetalert2';

const CustomSwal = Swal.mixin({});

enum AlertType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
  Question = 'question',
}

enum ButtonType {
  Primary = 'Primary',
  Success = 'Success',
  Warning = 'Warning',
  Danger = 'Danger',
  Cancel = 'Cancel',
  Info = 'Info',
}

enum ButtonTypeColor {
  Primary = '#7367f0',
  Success = '#28c76f',
  Warning = '#ff9f43',
  Danger = '#ea5455',
  Cancel = '#82868b',
  Info = '#00cfe8',
}

export type AlertOptions = {
  /** AlertType */
  type: AlertType;
  /** 標題 */
  title?: string;
  /**
   * 內文
   * @example
   * { ..., text: '錯誤訊息第一行 \n 錯誤訊息第二行', ... }
   */
  text?: string;
  /** 確認按鈕的類型 */
  confirmButtonType?: ButtonType;
  /** 取消按鈕的類型 */
  cancelButtonType?: ButtonType;
  /** 確認按鈕文字 */
  confirmButtonText?: string;
  /** 取消按鈕文字 */
  cancelButtonText?: string;
  /** 是否顯示確認按鈕 */
  showConfirmButton?: boolean;
  /** 是否顯示取消按鈕 */
  showCancelButton?: boolean;
  /** 指定秒數(ms)後自動消失 */
  timer?: number;
};

export const Alert = {
  AlertType,
  ButtonType,
  show: async (options?: AlertOptions) => {
    const result = await CustomSwal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      icon: (options && options.type) || AlertType.Warning,
      title: (options && options.title) || '',
      html: (options && options.text && options.text.replaceAll('\n', '<br/>')) || '',
      timer: options && options.timer,

      // Confirm Button
      showConfirmButton: options && typeof options.showConfirmButton !== 'undefined' ? options.showConfirmButton : true,
      confirmButtonText: (options && options.confirmButtonText) || '確定',
      confirmButtonColor:
        options && options.confirmButtonType
          ? ButtonTypeColor[options.confirmButtonType]
          : ButtonTypeColor[ButtonType.Primary],

      // Cancel Button
      showCancelButton: options && typeof options.showCancelButton !== 'undefined' ? options.showCancelButton : true,
      cancelButtonText: (options && options.cancelButtonText) || '取消',
      cancelButtonColor:
        options && options.cancelButtonType
          ? ButtonTypeColor[options.cancelButtonType]
          : ButtonTypeColor[ButtonType.Cancel],
    });

    return result.isConfirmed;
  },
};
