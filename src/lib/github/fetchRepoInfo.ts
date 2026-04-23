export type RepoInfo = {
  descricao: string | null;
  tecnologias: string[];
  linguagemPrincipal: string | null;
  estrelas: number;
  ultimaAtualizacao: string; // ISO
};

function parseGitHubRepoFromUrl(repoUrl: string): { owner: string; repo: string } | null {
  const idx = repoUrl.indexOf("github.com/");
  if (idx === -1) return null;
  const rest = repoUrl.slice(idx + "github.com/".length);
  const [owner, repoRaw] = rest.split("/").filter(Boolean);
  if (!owner || !repoRaw) return null;
  const repo = repoRaw.replace(/\.git$/i, "");
  return { owner, repo };
}

export async function fetchRepoInfo(repoUrl: string, init?: RequestInit): Promise<RepoInfo | null> {
  const parsed = parseGitHubRepoFromUrl(repoUrl);
  if (!parsed) return null;

  const { owner, repo } = parsed;
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 60 * 60 * 12 },
  });

  if (!response.ok) return null;
  const data = (await response.json()) as {
    description: string | null;
    topics?: string[];
    language: string | null;
    stargazers_count: number;
    updated_at: string;
  };

  return {
    descricao: data.description ?? null,
    tecnologias: data.topics ?? [],
    linguagemPrincipal: data.language ?? null,
    estrelas: data.stargazers_count ?? 0,
    ultimaAtualizacao: data.updated_at,
  };
}

