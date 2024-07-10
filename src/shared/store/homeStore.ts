import { createEffect, createEvent, createStore, sample } from 'effector';
import { request } from 'graphql-request';
import { SEARCH_REPOSITORIES } from '../../api/queries';

// Event for input change
export const inputChanged = createEvent<string>();

export const changeSelectedPage = createEvent<number>();

// Store for selectedPage
export const $selectedPage = createStore(Number(localStorage.getItem('selectedPage')) || 1).on(changeSelectedPage, (_, newValue) => newValue);

// Store for inputValue
export const $inputValue = createStore(localStorage.getItem('inputValue') || '').on(inputChanged, (_, newValue) => newValue);

// Store for repositories
export const $repositories = createStore<object[]>([]).reset(inputChanged);

export const fetchDataFromGithub = createEffect(async (query: string) => {
    const response: { search: { edges: { node: object }[] } } = await request('https://api.github.com/graphql', SEARCH_REPOSITORIES, {
        query,
    }, {
        Authorization: 'Bearer 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',
    });
    return response.search;
});

sample({
    inputValue: $inputValue,
    clock: inputChanged,
    target: fetchDataFromGithub,
});

$repositories.on(fetchDataFromGithub.doneData, (state, { edges }) => [...state, ...edges.map(edge => edge.node)]);

$inputValue.watch((value) => localStorage.setItem('inputValue', value));
$selectedPage.watch((value) => localStorage.setItem('selectedPage', value.toString()));