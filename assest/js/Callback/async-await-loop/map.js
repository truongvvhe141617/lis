const arr = [1, 2, 3, 4, 5];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function promises() {
  const unresolved = arr.map(async (item) => {
    await sleep(1000 * item);
    console.log("---> ", item);
    return item;
  });

  const result = await Promise.all(unresolved);
  console.log("Done:", result);
}