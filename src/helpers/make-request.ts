const HTTP_RESPONSE_STATUS_CODES = { OK: 200 } as const;

/** @throws */
export async function makeRequest<Type>(
  url: string,
  options?: RequestInit
): Promise<Type> {
  const response = await fetch(url, options);

  if (response.status !== HTTP_RESPONSE_STATUS_CODES.OK) {
    const text = await response.text();

    throw new Error(text);
  }

  const json = response.json();

  return json as Promise<Type>;
}
