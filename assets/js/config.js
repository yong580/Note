const userName = window.gUserName;
const repoName = window.gRepoName;

const repoLink = `https://github.com/${userName}/${repoName}`;
const repoFileLink = `${repoLink}/blob/master/`;
let docsifyPlugins = [];
let docsifyRender = { code: {} };
