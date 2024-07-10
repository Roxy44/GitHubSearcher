import React from 'react';

import { Link } from 'react-router-dom';

import { useUnit } from 'effector-react';
import { $repository, fetchRepositoryInfo } from '../../shared/store/repositoryStore';

import './RepositoryCard.css';

export const RepositoryCardCompoenent = () => {

    const [repo, isLoading] = useUnit([
        $repository,
        fetchRepositoryInfo.pending, 
    ]);

    return (
        <div className='repo-container'>

            {isLoading ? <p>Loading...</p> 
                :
                <>
                    <Link className='forward-back' to='/'>{'< Назад '}</Link>
                    <h1 className='header'>{repo.name}</h1>
                    <div className='stars-commit-block'>
                        <div>{'Stars: ' + repo.stargazerCount}</div>
                        <div>{'Last commit: ' + repo.pushedAt}</div>
                    </div>
                    <div className='owner-block'>
                        <img src={repo.owner.avatarUrl} alt='Owner avatar' />
                        <span>Owner: <a href={repo.owner.url} target='_blank'>{repo.owner.login}</a></span>
                    </div>
                    <div className='languages-block'>
                        <h2>Languages</h2>
                        <ol>{repo.languages.nodes.map((item: { name: string }) => <li key={item.url}>{item.name}</li>)}</ol>
                    </div>
                    <div className='description-block'>
                        <h2>Description</h2>
                        {repo.description}
                    </div>
                </>
            }
        </div>
    );
};

export default RepositoryCardCompoenent;
