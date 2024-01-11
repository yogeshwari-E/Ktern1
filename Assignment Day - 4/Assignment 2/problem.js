function findParentMostObject (data,inputID){
    result = [];
  function findParent(id){
    const item = data.find( obj => obj.id === id)

    if(item){
      result.unshift( {id: item.id, refTaskID : item.refTaskID, title: item.title } )
      let ref_id = item.refTaskID
      if( ref_id !== "" ){
          findParent(ref_id)
      }
     
    }
    
  }
  findParent(inputID);
  
  return result;
}

const data = [
  {id: "1", refTaskID: "", title: "First task"},
  {id: "2", refTaskID: "1", title: "Second task"},
  {id: "3", refTaskID: "2", title: "Third task"},
  {id: "4", refTaskID: "1", title: "Fourth task"},
  {id: "5", refTaskID: "1", title: "Fifth task"},
  {id: "6", refTaskID: "3", title: "Sixth task"},
  {id: "7", refTaskID: "4", title: "Seventh task"},
  {id: "8", refTaskID: "4", title: "Eighth task"},
  {id: "9", refTaskID: "8", title: "Ninth task"},
  {id: "10", refTaskID: "9", title: "Random task"},
  {id: "11", refTaskID: "8", title: "Random 2 task"},
  {id: "12", refTaskID: "5", title: "Random 3 task"},
  {id: "13", refTaskID: "1", title: "Random 4 task"}
];

const inputID = "10";

const output = findParentMostObject(data,inputID);
console.log(output)