import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeComponent from '../pages/home/Home';
import RepositoryCardComponent from '../pages/repositoryCard/RepositoryCard';

import { ApolloProvider } from '@apollo/client';
import client from '../api/apolloClient';

import './App.css';

function App() {
    return (
        <BrowserRouter basename='/'>
            <div className='main'>
                <ApolloProvider client={client}>
                    <Routes>           
                        <Route path='/' element={<HomeComponent />} />
                        <Route path='/card' element={<RepositoryCardComponent />} />
                    </Routes>
                </ApolloProvider>
            </div>
        </BrowserRouter>
    );
}

export default App;
