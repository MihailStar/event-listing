export function cachingDecorator<Arg, Val>(
  func: (arg: Arg) => Val
): (param: Arg) => Val {
  const cache = new Map<Parameters<typeof func>[0], ReturnType<typeof func>>();

  return function (param: Arg): Val {
    if (cache.has(param)) {
      return cache.get(param) as Val;
    }

    const result = func(param);

    cache.set(param, result);

    return result;
  };
}
