import { createEffect, createEvent, createStore, sample } from 'effector';
import { request } from 'graphql-request';
import { SEARCH_REPOSITORIES } from '../../api/queries';

// Event for input change
export const inputChanged = createEvent();
export const fetchMore = createEvent();

// Store for inputValue
export const $inputValue = createStore('').on(inputChanged, (_, newValue) => newValue);

// Store for repositories
export const $repositories = createStore([]).reset(inputChanged);

export const fetchDataFromGithub = createEffect(async (query: any) => {
    const response: any = await request('https://api.github.com/graphql', SEARCH_REPOSITORIES, {
        query,
    }, {
        Authorization: 'Bearer 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',
    });
    return response.search;
});

sample({
    inputValue: $inputValue,
    clock: [inputChanged, fetchMore],
    target: fetchDataFromGithub,
});

$repositories.on(fetchDataFromGithub.doneData, (state, { edges }) => [...state, ...edges.map(edge => edge.node)]);