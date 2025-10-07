const BASE_URL = 'http://localhost:5173/public/api';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => {
    if (!response.ok) {
      throw new Error(
        `Failed to fetch goods: ${response.status} ${response.statusText}`,
      );
    }

    return response.json();
  });
}
