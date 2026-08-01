import { createStore, createEvent, createEffect, sample } from 'effector';
import { request } from 'graphql-request';
import { GET_REPOSITORY_INFO } from '../../api/queries';
import { getGithubAuthHeaders } from '../lib/githubAuth';

export type RepositoryInfo = {
    name: string;
    stargazerCount: number;
    pushedAt: string;
    description: string | null;
    owner: {
        login: string;
        avatarUrl: string;
        url: string;
    };
    languages: {
        nodes: { name: string }[];
    };
};

export const ownerChanged = createEvent<string>();
export const repoChanged = createEvent<string>();
export const searchRepository = createEvent();

export const $repository = createStore<RepositoryInfo | null>(null);

const $owner = createStore('').on(ownerChanged, (_, payload) => payload);
const $repo = createStore('').on(repoChanged, (_, payload) => payload);

export const fetchRepositoryInfo = createEffect(async ({ owner, repo }: { owner: string, repo: string }) => {
    const response: { repository: RepositoryInfo } = await request(
        'https://api.github.com/graphql',
        GET_REPOSITORY_INFO,
        { owner, name: repo },
        getGithubAuthHeaders(),
    );
    return response.repository;
});

sample({
    source: { owner: $owner, repo: $repo },
    clock: searchRepository,
    target: fetchRepositoryInfo,
});

$repository.on(fetchRepositoryInfo.doneData, (_, repo) => repo);