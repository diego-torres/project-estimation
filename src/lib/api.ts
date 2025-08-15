import { loadOpportunity, loadTemplate, copyTemplateToRepo, RepoRef } from './github';
import { loadMeta, saveMeta, UserMeta } from './persistence';
import { ProjectTemplate, OpportunityInfo } from '../models/types';

export interface API {
  getTemplate(repo: RepoRef): Promise<ProjectTemplate>;
  getOpportunity(repo: RepoRef): Promise<OpportunityInfo>;
  copyTemplate(src: RepoRef, dest: RepoRef, files?: string[]): Promise<void>;
  loadMeta(): Promise<UserMeta>;
  saveMeta(update: Partial<UserMeta>): Promise<void>;
}

let octokit: any;
async function getOctokit() {
  if (!octokit) {
    const mod = await import('@octokit/rest');
    octokit = new mod.Octokit();
  }
  return octokit;
}

export const api: API = {
  getTemplate: async (repo) => loadTemplate(await getOctokit(), repo),
  getOpportunity: async (repo) => loadOpportunity(await getOctokit(), repo),
  copyTemplate: async (src, dest, files) => copyTemplateToRepo(await getOctokit(), src, dest, files),
  loadMeta,
  saveMeta,
};

