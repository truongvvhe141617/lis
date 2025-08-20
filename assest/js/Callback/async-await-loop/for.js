const numbers = [1, 2, 3, 4, 5];

async function someFunction(numbers) {
    for(var i=0; i< numbers.length; i++) {
        const res = await someAPICall(numbers[i]);
        console.log(`Result for item ${numbers[i]} at index ${i}: ${res}`);
    }
}

function someAPICall(number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("number: " + number);
    }, 1000);
  })
};

someFunction(numbers);