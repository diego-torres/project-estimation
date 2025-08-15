import { Octokit } from '@octokit/rest';
import { ProjectTemplate, OpportunityInfo } from '../models/types';

export interface RepoRef {
  owner: string;
  repo: string;
  ref?: string;
}

const DEFAULT_FILES = [
  'complexity-matrix.json',
  'outcomes.json',
  'tasks.json',
  'risks.json',
  'out-of-scope.json',
  'prereqs.json',
  'training.json',
  'team-roles.json',
  'team-modeling.json',
];

async function fetchJson<T>(octokit: Octokit, repo: RepoRef, path: string): Promise<T> {
  const res = await octokit.repos.getContent({ ...repo, path });
  if (!('content' in res.data)) throw new Error('Not a file');
  const content = Buffer.from(res.data.content, res.data.encoding as BufferEncoding).toString();
  return JSON.parse(content) as T;
}

export async function loadTemplate(octokit: Octokit, repo: RepoRef): Promise<ProjectTemplate> {
  return fetchJson<ProjectTemplate>(octokit, repo, 'template.json');
}

export async function loadOpportunity(octokit: Octokit, repo: RepoRef): Promise<OpportunityInfo> {
  return fetchJson<OpportunityInfo>(octokit, repo, 'opportunity.json');
}

export async function copyTemplateToRepo(
  octokit: Octokit,
  source: RepoRef,
  dest: RepoRef,
  files: string[] = DEFAULT_FILES,
): Promise<void> {
  for (const path of files) {
    const res = await octokit.repos.getContent({ ...source, path });
    if (!('content' in res.data)) continue;
    await octokit.repos.createOrUpdateFileContents({
      ...dest,
      path,
      message: `chore: add ${path}`,
      content: res.data.content,
    });
  }
}

