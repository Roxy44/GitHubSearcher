export const getGithubAuthHeaders = (): Record<string, string> => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  if (!token) {
    console.warn("VITE_GITHUB_TOKEN is not set. GitHub GraphQL requests will fail.");
  }

  return {
    Authorization: `Bearer ${token ?? ""}`,
  };
};
