/**
 * js2flowchart
 */

(function () {
  const langId = "js2flowchart";

  const theme = {
    light: {
      strokeColor: "#555",
      defaultFillColor: "#fff",
      textColor: "#333",
      arrowFillColor: "#444",
      rectangleFillColor: "#bbdefb",
      rectangleDotFillColor: "#ede7f6",
      functionFillColor: "#c8e6c9",
      rootCircleFillColor: "#fff9c4",
      loopFillColor: "#d1c4e9",
      conditionFillColor: "#e1bee7",
      destructedNodeFillColor: "#ffecb3",
      classFillColor: "#b2dfdb",
      debuggerFillColor: "#ffcdd2",
      exportFillColor: "#b3e5fc",
      throwFillColor: "#ffccbc",
      tryFillColor: "#FFE082",
      objectFillColor: "#d1c4e9",
      callFillColor: "#dcedc8",
      debugModeFillColor: "#666",
    },
    dark: {
      strokeColor: "#555",
      defaultFillColor: "#fff",
      textColor: "#333",
      arrowFillColor: "#ccc",
      rectangleFillColor: "#bbdefb",
      rectangleDotFillColor: "#ede7f6",
      functionFillColor: "#c8e6c9",
      rootCircleFillColor: "#fff9c4",
      loopFillColor: "#d1c4e9",
      conditionFillColor: "#e1bee7",
      destructedNodeFillColor: "#ffecb3",
      classFillColor: "#b2dfdb",
      debuggerFillColor: "#ffcdd2",
      exportFillColor: "#b3e5fc",
      throwFillColor: "#ffccbc",
      tryFillColor: "#FFE082",
      objectFillColor: "#d1c4e9",
      callFillColor: "#dcedc8",
      debugModeFillColor: "#666",
    },
  };

  function getTheme() {
    if (window?.matchMedia("(prefers-color-scheme: dark)").matches) {
      return theme.dark;
    } else {
      return theme.light;
    }
  }

  function main(code) {
    // const svg = convertCodeToSvg(code);
    const { createSVGRender, convertCodeToFlowTree } = window.js2flowchart;

    const flowTree = convertCodeToFlowTree(code),
      svgRender = createSVGRender();

    //applying another theme for render
    svgRender.applyDefaultTheme();

    svgRender.applyColorBasedTheme(getTheme());

    const svg = svgRender.buildShapesTree(flowTree).print();
    return svg;
  }

  function install() {
    docsifyRender.code[langId] = main;
  }

  install();
})();
