export function getKeyOfObject<Obj extends Object, Key extends keyof Obj>(
  object: Obj,
  value: Obj[Key]
): Key | null {
  return (
    (Object.keys(object) as Key[]).find((key) => {
      return object[key] === value;
    }) ?? null
  );
}
