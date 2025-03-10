import React, { useState } from "react";
import axios from "axios";
import "./App.css";

interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  bio: string | null;
  followers: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
}

const GitHubUserSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setUsers([]);
    setSelectedUser(null);
    setRepos([]);

    try {
      const response = await axios.get<{ items: GitHubUser[] }>(
        `https://api.github.com/search/users?q=${query}&per_page=5`
      );
      setUsers(response.data.items);
    } catch (err) {
      setError(
        "Gagal mengambil data pengguna. Pastikan koneksi internet stabil."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = async (username: string) => {
    setLoading(true);
    setError("");
    setSelectedUser(null);
    setRepos([]);

    try {
      const [userResponse, repoResponse] = await Promise.all([
        axios.get<GitHubUser>(`https://api.github.com/users/${username}`),
        axios.get<GitHubRepo[]>(
          `https://api.github.com/users/${username}/repos`
        ),
      ]);

      setSelectedUser(userResponse.data);
      setRepos(repoResponse.data);
    } catch (err) {
      setError("Gagal mengambil detail pengguna atau repositori.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>GitHub repositories explorer</h2>
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Masukkan username"
          aria-label="Cari pengguna GitHub"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          aria-label="Cari Pengguna"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <div className="content-wrapper">
        <ul className="dropdown">
          {users.map((user) => (
            <li key={user.id} onClick={() => handleUserClick(user.login)}>
              {user.login}
            </li>
          ))}
        </ul>

        {selectedUser && (
          <div className="user-detail animate">
            <h3>{selectedUser.login}</h3>
            <p className="bio">{selectedUser.bio || "Tidak ada deskripsi"}</p>
            <p className="followers">
              <strong>Followers:</strong> {selectedUser.followers}
            </p>
            <img
              src={selectedUser.avatar_url}
              alt={`Avatar of ${selectedUser.login}`}
              className="avatar"
            />
            <h4>Repositories:</h4>
            <ul className="repo-list">
              {repos.map((repo) => (
                <li key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                  <p>{repo.description || "Tidak ada deskripsi"}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubUserSearch;
