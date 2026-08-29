import fs from 'fs';

const TOKEN = process.env.GITHUB_TOKEN || '';
const REPO = 'couto-wlp/site-03-volta-redonda';

async function githubApi(method, endpoint, body) {
  const url = `https://api.github.com/repos/${REPO}${endpoint}`;
  const res = await fetch(url, {
    method,
    headers: {
      'Authorization': `token ${TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Error on ${method} ${url}: ${res.status} ${res.statusText}`);
    console.error(errorText);
    throw new Error('API Request Failed');
  }
  return res.json();
}

async function run() {
  try {
    console.log("Fetching repo info...");
    const ref = await githubApi('GET', '/git/refs/heads/main');
    const commitSha = ref.object.sha;

    const commit = await githubApi('GET', `/git/commits/${commitSha}`);
    const baseTreeSha = commit.tree.sha;

    const sitemapContent = fs.readFileSync('public/sitemap.xml', 'utf8');

    const treePayload = {
      base_tree: baseTreeSha,
      tree: [
        {
          path: 'public/sitemap.xml',
          mode: '100644',
          type: 'blob',
          content: sitemapContent
        }
      ]
    };

    console.log("Creating new tree...");
    const newTree = await githubApi('POST', '/git/trees', treePayload);

    console.log("Creating commit...");
    const newCommit = await githubApi('POST', '/git/commits', {
      message: 'Adiciona sitemap.xml',
      tree: newTree.sha,
      parents: [commitSha]
    });

    console.log("Updating ref...");
    await githubApi('PATCH', '/git/refs/heads/main', {
      sha: newCommit.sha
    });

    console.log("Success! Sitemap pushed to GitHub.");
  } catch (error) {
    console.error("Failed to update GitHub:", error);
  }
}

run();
