import axios from 'axios';

const GITHUB_USERNAME = 'bilaldeveloper56-rgb';
const CACHE_KEY = 'github_profile_cache';
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours in ms

export const getGitHubData = async () => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  try {
    // Attempt concurrent API fetches
    const [profileRes, reposRes, eventsRes] = await Promise.all([
      axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`),
      axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`),
      axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=5`)
    ]);

    const data = {
      profile: profileRes.data,
      repos: reposRes.data,
      events: eventsRes.data
    };

    // Cache the data
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
    return data;
  } catch (err) {
    console.warn('GitHub API rate limited or offline. Using local fallback mock data.', err);
    if (cached) {
      return JSON.parse(cached).data;
    }
    return getFallbackData();
  }
};

const getFallbackData = () => {
  return {
    profile: {
      login: GITHUB_USERNAME,
      name: 'Muhammad Bilal Khan',
      followers: 124,
      following: 48,
      public_repos: 36,
      bio: 'Senior MERN Stack Engineer & SaaS Architect'
    },
    repos: [
      { id: 1, name: 'saas-core-boilerplate', html_url: 'https://github.com', description: 'Robust boilerplate with Auth, Stripe, and RBAC.', stargazers_count: 54, language: 'TypeScript' },
      { id: 2, name: 'react-virtual-scroll', html_url: 'https://github.com', description: 'Zero-dependency virtual list component rendering 100k rows at 60 FPS.', stargazers_count: 32, language: 'JavaScript' },
      { id: 3, name: 'node-clean-architecture', html_url: 'https://github.com', description: 'Express API structure utilizing Dependency Injection and SOLID patterns.', stargazers_count: 24, language: 'JavaScript' },
      { id: 4, name: 'sliding-window-limiter', html_url: 'https://github.com', description: 'Redis-based sliding window rate-limiting middleware.', stargazers_count: 18, language: 'TypeScript' }
    ],
    events: [
      { id: '1', type: 'PushEvent', repo: { name: 'saas-core-boilerplate' }, created_at: new Date().toISOString() },
      { id: '2', type: 'CreateEvent', repo: { name: 'sliding-window-limiter' }, created_at: new Date(Date.now() - 7200000).toISOString() },
      { id: '3', type: 'WatchEvent', repo: { name: 'react-virtual-scroll' }, created_at: new Date(Date.now() - 86400000).toISOString() }
    ]
  };
};
