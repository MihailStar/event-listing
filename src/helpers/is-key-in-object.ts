export function isKeyInObject<Obj extends object>(
  key: unknown,
  object: Obj
): key is keyof Obj {
  return (key as keyof Obj) in object;
}
