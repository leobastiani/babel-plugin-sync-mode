function getFirstWord(name) {
  const match = name.match(/^([a-z]+)/);
  if (match) {
    return match[1];
  }
  return "";
}

export default function ({ types: t }) {
  return {
    name: "sync-mode",
    visitor: {
      Function: function (path) {
        if (!path.node.async) {
          path.skip();
        }
      },
      LabeledStatement: function (path) {
        if (getFirstWord(path.node.label.name) === "sync") {
          path.traverse({
            CallExpression: function (path) {
              if (path.parent.type !== "AwaitExpression") {
                path.replaceWith(t.awaitExpression(path.node));
              }
            },
            TaggedTemplateExpression: function (path) {
              if (path.parent.type !== "AwaitExpression") {
                path.replaceWith(t.awaitExpression(path.node));
              }
            },
            Function: function (path) {
              if (!path.node.async) {
                path.skip();
              }
            },
            LabeledStatement: function (path) {
              if (getFirstWord(path.node.label.name) === "async") {
                path.skip();
              }
            },
          });
        }
      },
    },
  };
}
