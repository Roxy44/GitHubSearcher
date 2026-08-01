import { createEffect, createEvent, createStore, sample } from 'effector';
import { request } from 'graphql-request';
import { SEARCH_REPOSITORIES } from '../../api/queries';
import { getGithubAuthHeaders } from '../lib/githubAuth';

const SEARCH_DEBOUNCE_MS = 1000;

export const inputChanged = createEvent<string>();
export const changeSelectedPage = createEvent<number>();

const searchRequested = createEvent<string>();

export const $selectedPage = createStore(Number(localStorage.getItem('selectedPage')) || 1)
    .on(changeSelectedPage, (_, newValue) => newValue);

export const $inputValue = createStore(localStorage.getItem('inputValue') || '')
    .on(inputChanged, (_, newValue) => newValue);

export const $repositories = createStore<object[]>([])
    .reset(searchRequested);

let latestRequestId = 0;
let debounceTimer: ReturnType<typeof setTimeout> | undefined;

export const fetchDataFromGithub = createEffect(async (query: string) => {
    const requestId = ++latestRequestId;
    const response: { search: { edges: { node: object }[] } } = await request(
        'https://api.github.com/graphql',
        SEARCH_REPOSITORIES,
        { query },
        getGithubAuthHeaders(),
    );

    if (requestId !== latestRequestId) {
        throw new Error('Stale search request');
    }

    return response.search;
});

inputChanged.watch((value) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        searchRequested(value);
    }, SEARCH_DEBOUNCE_MS);
});

sample({
    clock: searchRequested,
    target: fetchDataFromGithub,
});

$repositories.on(fetchDataFromGithub.doneData, (_, { edges }) => edges.map(edge => edge.node));

$inputValue.watch((value) => localStorage.setItem('inputValue', value));
$selectedPage.watch((value) => localStorage.setItem('selectedPage', value.toString()));
