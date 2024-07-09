import React, { useEffect, useState } from 'react';  

import { Link } from 'react-router-dom';

import Pagginator from './components/Pagginator';

import { useUnit } from 'effector-react';
import { 
    $inputValue, 
    $repositories,
    inputChanged,
    fetchMore,
    fetchDataFromGithub
} from '../../shared/store/store';

import './Home.css';

const HomeComponent = () => {
    const [selectedPage, setSelectedPage] = useState(1);

    const [inputValue, repositories, isLoading] = useUnit([
        $inputValue, 
        $repositories, 
        fetchDataFromGithub.pending, 
    ]);

    useEffect(() => {
        setSelectedPage(1);
    }, [repositories]); 

    const handleChange = (event: any) => {
        inputChanged(event.target.value);
    };

    return (
        <div className='home-container'>

            <input 
                className='search-field'
                placeholder='Search for repositories...'
                type='text'
                value={inputValue} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => !isLoading && handleChange(e)}   
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
                                <p>Name: <Link to='/card'>{item.name}</Link></p>
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

            <Pagginator repositories={repositories} selectedPage={selectedPage} setSelectedPage={setSelectedPage} fetchMore={fetchMore} />
        </div>
    );
};

export default HomeComponent;