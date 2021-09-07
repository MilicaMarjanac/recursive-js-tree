const TREE_DATA = [
    {
      name: 'Fruit',
      children: [
        {name: 'Apple'},
        {name: 'Banana'},
        {name: 'Fruit loops'},
      ]
    }, {
      name: 'Vegetables',
      children: [
        {
          name: 'Green',
          children: [
            {name: 'Broccoli'},
            {name: 'Brussel sprouts'},
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
  ];

let treeList = document.getElementById("list");
function printList(list) {
  list.forEach(element => {
    if (element.children) {
        let listItem = document.createElement("li");
        itemName = document.createTextNode(element.name)
        listItem.appendChild(itemName);
        treeList.appendChild(listItem);
        printList(element.children);
    } else {
        let listItem = document.createElement("li");
        itemName = document.createTextNode("___"+element.name)
        listItem.appendChild(itemName);
        treeList.appendChild(listItem);
    }
  });
}
printList(TREE_DATA);