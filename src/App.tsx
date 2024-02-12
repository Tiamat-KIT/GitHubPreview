import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import 'virtual:windi.css';

type GitHubApiUrl = `${
  | 'https://api.github.com'
  | 'http://api.github.com'}/${string}`;

interface User {
  avatar_url: GitHubApiUrl;
  bio: string | null;
  blog: string; // 更新: 単純な文字列型に変更
  company: string | null;
  created_at: string;
  email: string | null;
  events_url: GitHubApiUrl;
  followers: number;
  followers_url: GitHubApiUrl;
  following: number;
  following_url: GitHubApiUrl;
  gists_url: GitHubApiUrl;
  gravatar_id: string;
  hireable: boolean | null;
  html_url: GitHubApiUrl;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: GitHubApiUrl;
  public_gists: number;
  public_repos: number;
  received_events_url: GitHubApiUrl;
  repos_url: GitHubApiUrl;
  site_admin: boolean;
  starred_url: GitHubApiUrl;
  subscriptions_url: GitHubApiUrl;
  twitter_username: string | null;
  type: string;
  updated_at: string;
  url: GitHubApiUrl;
}

interface Repository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: User | User[];
  html_url: GitHubApiUrl;
  description: string | null;
  fork: boolean;
  url: GitHubApiUrl;
  forks_url: GitHubApiUrl;
  keys_url: GitHubApiUrl;
  collaborators_url: GitHubApiUrl;
  teams_url: GitHubApiUrl;
  hooks_url: GitHubApiUrl;
  issue_events_url: GitHubApiUrl;
  events_url: GitHubApiUrl;
  assignees_url: GitHubApiUrl;
  branches_url: GitHubApiUrl;
  tags_url: GitHubApiUrl;
  blobs_url: GitHubApiUrl;
  git_tags_url: GitHubApiUrl;
  git_refs_url: GitHubApiUrl;
  trees_url: GitHubApiUrl;
  statuses_url: GitHubApiUrl;
  languages_url: GitHubApiUrl;
  stargazers_url: GitHubApiUrl;
  contributors_url: GitHubApiUrl;
  subscribers_url: GitHubApiUrl;
  subscription_url: GitHubApiUrl;
  commits_url: GitHubApiUrl;
  git_commits_url: GitHubApiUrl;
  comments_url: GitHubApiUrl;
  issue_comment_url: GitHubApiUrl;
  contents_url: GitHubApiUrl;
  compare_url: GitHubApiUrl;
  merges_url: GitHubApiUrl;
  archive_url: GitHubApiUrl;
  downloads_url: GitHubApiUrl;
  issues_url: GitHubApiUrl;
  pulls_url: GitHubApiUrl;
  milestones_url: GitHubApiUrl;
  notifications_url: GitHubApiUrl;
  labels_url: GitHubApiUrl;
  releases_url: GitHubApiUrl;
  deployments_url: GitHubApiUrl;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: string | null;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

function App() {
  const [GitData, setGitData] = useState<User | null>(null);
  const [RepoList, setRepoList] = useState<Repository[]>([]);
  const BaseFetch = () => {
    const request = axios.create({
      baseURL: 'https://api.github.com',
    });
    request.get('/users/Tiamat-KIT').then((res) => {
      setGitData(res.data);
    });
    request.get('/users/Tiamat-KIT/repos').then((res) => {
      setRepoList(res.data as Repository[]);
    });
  };
  useEffect(() => {
    BaseFetch();
  }, []);
  return (
    <main>
      {GitData !== null && <a href={GitData!.html_url}>{GitData!.login}</a>}
      <div
        style={{
          display: 'flex',
          flex: 'row',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        {RepoList !== null &&
          RepoList.map((data, idx) => {
            return (
              <div key={idx} style={{ flexBasis: '50%' }}>
                <a href={data.url}>{data.name}</a>
              </div>
            );
          })}
      </div>
      <button
        type="button"
        onClick={() => {
          /* BaseFetch(); */
          setTimeout(() => {
            console.log(GitData, RepoList);
          }, 750);
        }}
      >
        クリックで取得
      </button>
    </main>
  );
}

export default App;
