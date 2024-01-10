
let count = 1;
let maxCount = 1;
const arr = [3, 25, 6, 7, 8, 9, 10, 3, 45, 2, 44, 4445, 432];

for (let i = 0; i < arr.length - 1; i++) {
  if (arr[i] < arr[i + 1]) {
    count++;
    if (count > maxCount) {
      maxCount = count;
    }
  } else {
    count = 1;
  }
}

console.log(maxCount);

