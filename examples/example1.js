async function test() {
  sync: {
    console.log("I should be awaited");
    // a await goes here
    console.log(
      // a await goes here as well
      (() => {
        console.log("I should not be awaited");
      })()
    );
    // a await goes here
    console.log(
      // a await goes here as well
      (async () => {
        console.log("I should not be awaited");
      })()
    );
    async: {
      console.log("I should not be awaited");
      sync_: {
        console.log(
          async () => {
            console.log("I should be awaited");
          },
          () => {
            console.log("I should not be awaited");
          }
        );
      }
    }
  }
  console.log("I should not be awaited");
}
