/**
 * 添加 edit on github 按钮, 跳转到 github repos
 */
(function () {
  function main(hook, vm) {
    hook.beforeEach(function (html) {
      const fileUrl = repoFileLink + vm.route.file;
      const editHtml = "[:memo: EDIT DOCUMENT](" + fileUrl + ")\n\n";
      return editHtml + html;
    });
  }

  function install() {
    docsifyPlugins.push(main);
  }

  install();
})();
