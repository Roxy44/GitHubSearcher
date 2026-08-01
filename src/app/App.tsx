import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeComponent from '../pages/home/Home';
import RepositoryCardComponent from '../pages/repositoryCard/RepositoryCard';
import TokenGate from './TokenGate';

import { ApolloProvider } from '@apollo/client';
import client from '../api/apolloClient';
import { getGithubToken } from '../shared/lib/githubAuth';

import './App.css';

function App() {
    const [hasToken, setHasToken] = useState(() => Boolean(getGithubToken()));

    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <div className='main'>
                {!hasToken ? (
                    <TokenGate onSaved={() => setHasToken(true)} />
                ) : (
                    <ApolloProvider client={client}>
                        <Routes>
                            <Route path='/' element={<HomeComponent />} />
                            <Route path='/card' element={<RepositoryCardComponent />} />
                        </Routes>
                    </ApolloProvider>
                )}
            </div>
        </BrowserRouter>
    );
}

export default App;
