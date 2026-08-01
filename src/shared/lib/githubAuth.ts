const TOKEN_STORAGE_KEY = 'github_token';

export const getGithubToken = (): string => {
  return localStorage.getItem(TOKEN_STORAGE_KEY)?.trim() ?? '';
};

export const setGithubToken = (token: string): void => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token.trim());
};

export const clearGithubToken = (): void => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const getGithubAuthHeaders = (): Record<string, string> => {
  const token = getGithubToken();

  if (!token) {
    console.warn('GitHub token is not set. GraphQL requests will fail.');
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};
