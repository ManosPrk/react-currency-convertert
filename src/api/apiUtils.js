export async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  if (response.status === 400 || response.status === 401) {
    const error = await response.json();
    throw new Error(error.message || error.errorMessage);
  }

  throw new Error("Network response was not ok.");
}

export function handleError(error) {
  console.error("API call failed. " + error);
  throw error;
}
