export interface ISearchType {
  Users: string;
  Repositories: string;
  Issues: string;
}
export interface ISearchTypeResponse {
  loading: boolean;
  data: Array<any>;
  page: number;
  keyword: string | null;
  error: string | null;
  userDetails?: {
    followers?: number;
    following?: number;
    location?: string;
    name?: string;
    public_repos?: string;
    created_at?: string;
  };
  repos?: Array<any>;
}

export interface IUserType {
  id?: number;
  avatar_url?: string;
  login?: string;
  html_url?: string;
}

export interface IRepoType {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  forks: string;
  stargazers_count: string;
  open_issues: string;
}

export interface IIssueType {
  state: string;
  title: string;
  body: string;
  html_url: string;
  created_at: string;
  labels: Array<any>;
  user: {
    url: string;
    login: string;
  };
}

export enum ESearchType {
  Users = "users",
  Repositories = "repositories",
  Issues = "issues",
}
