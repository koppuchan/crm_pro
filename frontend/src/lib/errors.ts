export async function parseApiError(res: Response): Promise<string> {
  const body = await res.json().catch(() => null);

  if (body?.error?.sqlMessage) {
    return body.error.sqlMessage;
  }

  if (body?.message) {
    return body.message;
  }

  return `APIエラー (${res.status})`;
}
