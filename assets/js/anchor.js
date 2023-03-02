/**
 * 将 <a href="#xxx">xxx</a> 转换为 <a href="url#xxx">xxx</a>, 使得docsify 正常渲染
 */
(function () {
  function main(hook, vm) {
    hook.beforeEach(function (html) {
      return html.replace(
        /<a\s+(?:[^>]*?\s+)?href\s*=\s*(["'])#(.*?)\1.*?>/g,
        (m, g1, g2) => m.replace(g2, vm.route.path + "#" + g2)
      );
    });
  }

  function install() {
    docsifyPlugins.push(main);
  }

  install();
})();
