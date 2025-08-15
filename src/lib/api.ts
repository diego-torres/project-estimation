import { loadOpportunity, loadTemplate, copyTemplateToRepo, RepoRef, isRepoEmpty, initTemplateRepo, saveTemplateRepo } from './github';
import { loadMeta, saveMeta, UserMeta } from './persistence';
import { ProjectTemplate, OpportunityInfo } from '../models/types';

export interface API {
  getTemplate(repo: RepoRef): Promise<ProjectTemplate>;
  getOpportunity(repo: RepoRef): Promise<OpportunityInfo>;
  copyTemplate(src: RepoRef, dest: RepoRef, files?: string[]): Promise<void>;
  isRepoEmpty(repo: RepoRef): Promise<boolean>;
  initTemplate(repo: RepoRef, template: ProjectTemplate): Promise<void>;
  saveTemplate(repo: RepoRef, template: ProjectTemplate): Promise<void>;
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
  isRepoEmpty: async (repo) => isRepoEmpty(await getOctokit(), repo),
  initTemplate: async (repo, template) => initTemplateRepo(await getOctokit(), repo, template),
  saveTemplate: async (repo, template) => saveTemplateRepo(await getOctokit(), repo, template),
  loadMeta,
  saveMeta,
};

