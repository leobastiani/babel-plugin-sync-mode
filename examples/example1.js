async function test() {
  sync: {
    console.log("I should be awaited 1");
    console.log`I should be awaited 2`;
    // a await goes here
    console.log(
      // a await goes here as well
      (() => {
        console.log("I should not be awaited 3");
      })()
    );
    // a await goes here
    console.log(
      // a await goes here as well
      (async () => {
        console.log("I should not be awaited 4");
      })()
    );
    async: {
      console.log("I should not be awaited 5");
      sync_: {
        console.log(
          async () => {
            console.log("I should be awaited 6");
          },
          () => {
            console.log("I should not be awaited 7");
          }
        );
      }
    }
  }
  console.log("I should not be awaited 8");
}

sync: {
  console.log("I should not be awaited 9");
  (() => {
    console.log("I should not be awaited 10");
  })();
  (async () => {
    console.log("I should be awaited 111");
  })();
}

(async () => {
  console.log("I should not be awaited 112");
})();
