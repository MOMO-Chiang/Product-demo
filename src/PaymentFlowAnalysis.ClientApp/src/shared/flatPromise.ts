type PromiseFunc<TArgs extends Array<any>, TResolveData> = {
  (...args: TArgs): Promise<TResolveData>;
};

const flatPromise =
  <TArgs extends Array<any>, TResolveData>(fn: PromiseFunc<TArgs, TResolveData>) =>
  (...args: TArgs) => {
    let result: TResolveData | null = null;
    let error: unknown = null;

    return fn(...args)
      .then((data) => {
        result = data;
      })
      .catch((err) => {
        error = err;
      })
      .then(() => ({ result, error }));
  };

export default flatPromise;
