const Number_array = [ 1, 2, 3, 4, 5]
let Product;

function getProduct( Number_array, index ){
  Product = 1;
  // console.log(Number_array)
  for(let j = 0;  j< Number_array.length; j++)
  {
    if( index != j)
    {
      Product = Product * Number_array[j]
    }

      // console.log(Product)
  }

  // console.log(Product)
  return Product
  
}



// console.log(value)

let Output_array = [];

for(let i = 0; i < Number_array.length; i++) {

  value = (getProduct(Number_array, i))
  Output_array.push(value);
  console.log(value);

}

console.log(Output_array)