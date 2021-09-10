const TREE_DATA = {
  name: 'Plants',
  children:[
      {
        name: 'Fruit',
        children: [
          {name: 'Apple'},
          {name: 'Banana'},
          {name: 'Fruitloops'},
        ]
      },
       {
        name: 'Vegetables',
        children: [
          {
            name: 'Green',
            children: [
              {name: 'Broccoli'},
              {name: 'Brusselsprouts'},
            ]
          }, {
            name: 'Orange',
            children: [
              {name: 'Pumpkins'},
              {name: 'Carrots'},
            ]
          },
        ]
      },
    ]
  }
  
  let treeList = document.getElementById("list");
  function printList(obj) {
    let listItem = document.createElement("li");
    listItem.innerHTML = obj.name;
    listItem.style.marginLeft = "30px";
    for (let i in obj.children) {
      listItem.appendChild(printList(obj.children[i]));
    }
    return listItem;
  }
  treeList.appendChild(printList(TREE_DATA));

  printList(TREE_DATA);