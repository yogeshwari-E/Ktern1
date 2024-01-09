const Number_array = [ 1, 2, 3, 4, 5]
let Product = 1;

function getProduct( Number_array ){
  // console.log(Number_array)
  for(let i = 0;  i< Number_array.length; i++){
    Product = Product * Number_array[i]
    // console.log(Product)
  }

  // console.log(Product)
  return Product
  
}

value = (getProduct(Number_array))

// console.log(value)

Output_array = [];

for(let i = 0; i < Number_array.length; i++) {

  Output_array.push( value/Number_array[i] )

}

console.log(Output_array)