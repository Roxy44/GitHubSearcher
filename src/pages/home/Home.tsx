import React, { useEffect } from 'react';  

import { Link } from 'react-router-dom';

import Pagginator from './components/Pagginator';

import { useUnit } from 'effector-react';
import { 
    $inputValue, 
    $repositories,
    $selectedPage,
    changeSelectedPage,
    inputChanged,
    fetchDataFromGithub,
} from '../../shared/store/homeStore';
import {
    ownerChanged,
    repoChanged,
    searchRepository
} from '../../shared/store/repositoryStore';

import './Home.css';

const HomeComponent = () => {
    const [inputValue, repositories, selectedPage, isLoading] = useUnit([
        $inputValue, 
        $repositories, 
        $selectedPage,
        fetchDataFromGithub.pending, 
    ]);

    useEffect(() => {
        inputChanged(localStorage.getItem('inputValue') || '');
    }, []);
    
    const handleChange = (value: string) => {
        inputChanged(value);
    };

    const fetchRepository = (owner: string, repo: string) => {
        ownerChanged(owner);
        repoChanged(repo);
        searchRepository();
    };

    return (
        <div className='home-container'>

            <input 
                className='search-field'
                placeholder='Search for repositories...'
                type='text'
                value={inputValue} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => !isLoading && handleChange(e.target.value)}   
            />

            <ul className='search-results' style={{display: repositories.length !== 0 ? 'block  ' : 'none'}}>
                {repositories.map((item: any, index: number) => (
                    (index >= (selectedPage - 1) * 10) && (index < selectedPage * 10) && <li 
                        className='search-result-item' 
                        key={item.url}
                    >
                        <div>
                            <p>{index + 1}</p>
                            <div>
                                <p>Name: <Link to='/card' onClick={() => fetchRepository(item.owner.login, item.name)}>{item.name}</Link></p>
                                <p>{`Stars: ${item.stargazerCount}`}</p>
                            </div>
                        </div>
                        <div>
                            <p>{`Last commit: ${item.pushedAt}`}</p>
                            <p>Url: <a href={item.url} target='_blank'>{item.url}</a></p>
                        </div>
                    </li>
                ))}
            </ul>

            {isLoading ? <p>Loading...</p> : <p>Results: {repositories.length}</p>}

            <Pagginator repositories={repositories} selectedPage={selectedPage} changeSelectedPage={changeSelectedPage} />
        </div>
    );
};

export default HomeComponent;