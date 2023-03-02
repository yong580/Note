/**
 * <a class="Repos" target="_blank" href="../example/animation/static-anim/js/main.js">code</a> -> 指向github repos
 * <a class="Pages" target="_blank" href="../example/animation/static-anim/js/main.js">code</a> -> 指向github pages
 */
(function () {
  let reposFileURL;
  let pagesFileURL;
  function hack(hook, vm) {
    const reposURL = repoFileLink; // github 需要最后的/, 而live server 不需要, 无妨
    hook.beforeEach(function (html) {
      reposFileURL = reposURL + vm.route.file;
      pagesFileURL =
        window.location.origin +
        window.location.pathname.slice(
          0,
          window.location.pathname.lastIndexOf("/") + 1
        ) +
        vm.route.file;
      return html;
    });
    hook.doneEach(function () {
      modifyReposLink();
      modifyPagesLink();
      modifyImageLink();
    });
  }

  function modifyReposLink() {
    const links = document.querySelectorAll("a.Repos");
    links.forEach((link) => {
      const relative = link.attributes.href.value;
      const rootPath = reposFileURL.slice(0, reposFileURL.lastIndexOf("/") + 1);
      link.href = rootPath + relative;
    });
  }
  function modifyPagesLink() {
    const links = document.querySelectorAll("a.Pages");
    links.forEach((link) => {
      const relative = link.attributes.href.value;
      const rootPath = pagesFileURL.slice(0, pagesFileURL.lastIndexOf("/") + 1);
      link.href = rootPath + relative;
    });
  }
  function modifyImageLink() {
    const links = document.querySelectorAll("img.Pages");
    links.forEach((link) => {
      const relative = link.attributes.src.value;
      const rootPath = pagesFileURL.slice(0, pagesFileURL.lastIndexOf("/") + 1);
      link.src = rootPath + relative;
    });
  }

  function install() {
    docsifyPlugins.push(hack);
  }

  install();
})();
