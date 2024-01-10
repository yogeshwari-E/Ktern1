let array = [3, 25, 6, 7, 8, 3, 45, 2, 44, 4445, 432];
let start = -1, end = -1, current_check, temp;
let longest_count = 0;

for (let i = 0; i < array.length - 1; i++) {
  let current_count = 0;
  start = i;
  temp = i;
  for (let j = i + 1; j < array.length; j++) {
    if (array[temp] < array[j]) {
      current_count++;
      temp++;
    } else {
      // Update the longest sequence if the current sequence is longer
      if (current_count > longest_count) {
        end = temp; // Update the end index
        longest_count = current_count;
      }
      // Reset current_count for the next sequence
      current_count = 0;
      // Move on to the next i without breaking the outer loop
      break;
    }
  }
}

// Check for the longest sequence at the end of the array
if (current_count > longest_count) {
  end = temp; // Update the end index
  longest_count = current_count;
}

console.log(array.slice(start, end + 1));
console.log("Length:", longest_count + 1);
