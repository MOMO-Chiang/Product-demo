/**
 * 延遲指定秒數
 *
 * @param ms 延遲毫秒
 */
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export default delay;
