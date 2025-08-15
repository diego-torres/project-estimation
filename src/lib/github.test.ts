import { copyTemplateToRepo } from './github';

const encodedEmpty = Buffer.from('{}').toString('base64');

describe('copyTemplateToRepo', () => {
  it('uses provided branch when dest.ref specified', async () => {
    const getContent = jest.fn().mockResolvedValue({ data: { content: encodedEmpty, encoding: 'base64' } });
    const createOrUpdateFileContents = jest.fn().mockResolvedValue({});
    const repos = { getContent, createOrUpdateFileContents, get: jest.fn() };
    await copyTemplateToRepo(
      { repos } as any,
      { owner: 'src', repo: 'tmpl' },
      { owner: 'dest', repo: 'repo', ref: 'main' },
      ['template.json'],
    );
    expect(createOrUpdateFileContents).toHaveBeenCalledWith({
      owner: 'dest',
      repo: 'repo',
      path: 'template.json',
      message: 'chore: add template.json',
      content: encodedEmpty,
      branch: 'main',
    });
    expect(repos.get).not.toHaveBeenCalled();
  });

  it('defaults to repo default branch when none specified', async () => {
    const getContent = jest.fn().mockResolvedValue({ data: { content: encodedEmpty, encoding: 'base64' } });
    const createOrUpdateFileContents = jest.fn().mockResolvedValue({});
    const get = jest.fn().mockResolvedValue({ data: { default_branch: 'dev' } });
    const repos = { getContent, createOrUpdateFileContents, get };
    await copyTemplateToRepo(
      { repos } as any,
      { owner: 'src', repo: 'tmpl' },
      { owner: 'dest', repo: 'repo' },
      ['template.json'],
    );
    expect(get).toHaveBeenCalledWith({ owner: 'dest', repo: 'repo' });
    expect(createOrUpdateFileContents).toHaveBeenCalledWith({
      owner: 'dest',
      repo: 'repo',
      path: 'template.json',
      message: 'chore: add template.json',
      content: encodedEmpty,
      branch: 'dev',
    });
  });
});
