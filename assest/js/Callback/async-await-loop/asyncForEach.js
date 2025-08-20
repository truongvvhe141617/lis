
Array.prototype.myForEach = function(callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[index], index, this);
    }
}

// Example usage: custom forEach

Array.prototype.asyncForEach = async function (callback) {
    for(let i = 0; i < this.length; i++) {
        await callback(this[i], i, this);
    }
}
const arr = [1, 2, 3, 4, 5];

async function processArray() {
    await arr.asyncForEach(async (item, index) => {
        console.log(`Processing item ${item} at index ${index}`);
        // Simulate an asynchronous operation
        await new Promise(resolve => setTimeout(resolve, 1000));
    })
}

const numbers = [1, 2, 3, 4, 5];
async function someFunction(number) {
    numbers.asyncForEach(async (item, index) => {
        const res = await someAPICall(item);
        console.log(`Result for item ${item} at index ${index}: ${res}`);
    })
}

function someAPICall(number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("number: " + number);
    }, 1000);
  });
}


someFunction(numbers);