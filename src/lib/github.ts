import { Octokit } from "@octokit/rest";
import { Buffer } from "buffer";
import { ProjectTemplate, OpportunityInfo } from "../models/types";

export interface RepoRef {
  owner: string;
  repo: string;
  ref?: string;
}

const DEFAULT_FILES = [
  "complexity-matrix.json",
  "outcomes.json",
  "tasks.json",
  "risks.json",
  "out-of-scope.json",
  "prereqs.json",
  "training.json",
  "team-roles.json",
  "team-modeling.json",
];

async function fetchJson<T>(
  octokit: Octokit,
  repo: RepoRef,
  path: string,
): Promise<T> {
  try {
    const res = await octokit.repos.getContent({ ...repo, path });
    if (!("content" in res.data)) throw new Error("Not a file");
    const content = Buffer.from(
      res.data.content,
      res.data.encoding as BufferEncoding,
    ).toString();
    return JSON.parse(content) as T;
  } catch (err: any) {
    if (err.status === 404) {
      // File doesn't exist yet
      return {} as T;
    }
    throw err;
  }
}

export async function loadTemplate(
  octokit: Octokit,
  repo: RepoRef,
): Promise<ProjectTemplate> {
  return fetchJson<ProjectTemplate>(octokit, repo, "template.json");
}

export async function loadOpportunity(
  octokit: Octokit,
  repo: RepoRef,
): Promise<OpportunityInfo> {
  return fetchJson<OpportunityInfo>(octokit, repo, "opportunity.json");
}

export async function isRepoEmpty(
  octokit: Octokit,
  repo: RepoRef,
): Promise<boolean> {
  try {
    await octokit.repos.listCommits({
      owner: repo.owner,
      repo: repo.repo,
      per_page: 1,
    });
    return false;
  } catch (err: any) {
    if (err.status === 409) return true; // Git Repository is empty
    if (err.status === 404) return true; // repo not initialized
    throw err;
  }
}

export async function initTemplateRepo(
  octokit: Octokit,
  repo: RepoRef,
  template: ProjectTemplate,
): Promise<void> {
  const branch = repo.ref || "main";
  const content = Buffer.from(JSON.stringify(template, null, 2)).toString(
    "base64",
  );
  const readme = Buffer.from(
    "# Estimation Template\n\nThis repository stores a project estimation template.",
  ).toString("base64");
  await octokit.repos.createOrUpdateFileContents({
    owner: repo.owner,
    repo: repo.repo,
    path: "template.json",
    message: "chore: add template.json",
    content,
    branch,
  });
  await octokit.repos.createOrUpdateFileContents({
    owner: repo.owner,
    repo: repo.repo,
    path: "README.md",
    message: "docs: add template README",
    content: readme,
    branch,
  });
}

export async function copyTemplateToRepo(
  octokit: Octokit,
  source: RepoRef,
  dest: RepoRef,
  files: string[] = DEFAULT_FILES,
): Promise<void> {
  const { owner, repo } = dest;
  let branch = dest.ref;
  if (!branch) {
    try {
      const repoInfo = await octokit.repos.get({ owner, repo });
      branch = repoInfo.data.default_branch || "main";
    } catch {
      branch = "main";
    }
  }
  for (const path of files) {
    const res = await octokit.repos.getContent({ ...source, path });
    if (!("content" in res.data)) continue;
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: `chore: add ${path}`,
      content: res.data.content,
      branch,
    });
  }
}
