export function getUniqueValuesOfObjects<
  Obj extends Object,
  Key extends keyof Obj
>(
  objects: Obj[],
  keys: Key[],
  converters: (((value: Obj[Key]) => Obj[Key]) | null)[] = []
): Array<Array<Obj[Key]>> {
  const results = Array.from({ length: keys.length }, () => {
    return new Set<Obj[Key]>();
  });

  objects.forEach((object) => {
    keys.forEach((key, index) => {
      const value = object[key];
      const converter = converters[index];

      results[index]?.add(
        converter instanceof Function ? converter(value) : value
      );
    });
  });

  return results.map((result) => {
    return Array.from(result).sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
  });
}
