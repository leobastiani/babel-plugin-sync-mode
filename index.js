function getFirstWord(name) {
  const match = name.match(/^([a-z]+)/);
  if (match) {
    return match[1];
  }
  return "";
}

function getSyncLabel(path) {
  path = path.parentPath;
  while (path) {
    if (path.node.type == "LabeledStatement") {
      const word = getFirstWord(path.node.label.name);
      if (word === "sync" || word === "async") {
        return word;
      }
    }
    path = path.parentPath;
  }
  return "";
}

function replace(path, t) {
  const label = getSyncLabel(path);
  if (label === "sync") {
    if (path.parent.type !== "AwaitExpression") {
      path.replaceWith(t.awaitExpression(path.node));
    }
  }
}
module.exports = function ({ types: t }) {
  return {
    name: "sync-mode",
    visitor: {
      Function: function (path) {
        if (path.node.async) {
          path.traverse({
            CallExpression: function (path) {
              replace(path, t);
            },
            TaggedTemplateExpression: function (path) {
              replace(path, t);
            },
            Function: function (path) {
              if (!path.node.async) {
                path.skip();
              }
            },
          });
        }
      },
    },
  };
};
