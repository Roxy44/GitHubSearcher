import { FormEvent, useState } from 'react';
import { getGithubToken, setGithubToken } from '../shared/lib/githubAuth';
import './TokenGate.css';

type TokenGateProps = {
  onSaved: () => void;
};

const TokenGate = ({ onSaved }: TokenGateProps) => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!token.trim()) {
      setError('Вставьте GitHub Personal Access Token');
      return;
    }

    setGithubToken(token);
    onSaved();
  };

  return (
    <div className="token-gate">
      <h1>GH Searcher</h1>
      <p>
        Для запросов к GitHub GraphQL API нужен Personal Access Token
        (classic, scope <code>public_repo</code>).
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Personal Access Token"
          value={token}
          onChange={(event) => {
            setToken(event.target.value);
            setError('');
          }}
          autoComplete="off"
        />
        {error ? <p className="token-gate-error">{error}</p> : null}
        <button type="submit">Сохранить и продолжить</button>
      </form>
      <p className="token-gate-hint">
        Токен хранится только в localStorage этого браузера.
        {getGithubToken() ? ' Можно заменить текущий токен.' : ''}
      </p>
    </div>
  );
};

export default TokenGate;
