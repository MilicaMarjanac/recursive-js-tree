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
    let wrapper = document.createElement("div");
    wrapper.classList.add("wrap");

    let listItem = document.createElement("li");
    let ItemIcon = document.createElement("div");

    wrapper.appendChild(ItemIcon);
    wrapper.appendChild(listItem);

    listItem.innerHTML = obj.name;
    listItem.style.marginLeft = "10px";

    for (let i in obj.children) {
      if (obj.children) {
        ItemIcon.classList.add("icon2");
      }
      listItem.appendChild(printList(obj.children[i]));
    }

    ItemIcon.addEventListener("click", toggle);
    return wrapper;
  }
  
  treeList.appendChild(printList(TREE_DATA));
  printList(TREE_DATA);

  function toggle(event) {
    if (event.target.nextElementSibling.classList.value === "hide") {
      event.target.nextElementSibling.classList.remove("hide");
      event.target.classList.add("icon2");
    } else {
      event.target.nextElementSibling.classList.add("hide");
      event.target.classList.remove("icon2");
      event.target.classList.add("icon1");
    }
  }