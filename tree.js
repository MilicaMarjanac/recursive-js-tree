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
    let itemIcon = document.createElement("div");

    wrapper.appendChild(itemIcon);
    wrapper.appendChild(listItem);

    listItem.innerHTML = obj.name;
    listItem.style.marginLeft = "10px";

    for (let i in obj.children) {
      if (obj.children) {
        itemIcon.classList.add("icon2");
      }
      listItem.appendChild(printList(obj.children[i]));
    }

    itemIcon.addEventListener("click", toggle);
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

//let liList = treeList.getElementsByTagName("li");


function search() { 
  let input = document.getElementById("searchBox");
  let entry = input.value.toUpperCase();
  iterate(treeList, entry /* ,forceShow */  );
}



//ne radi ovo al cisto da vidis kako sam razmisljala
function iterate(obj, entry, forceshow) {
  for (let child of obj.children) {
      console.log('A', child)
      if (
          child.children[1].innerText.toUpperCase().indexOf(entry) > -1 || forceshow === true) {
          console.log('B', child)
          lastChild = child.children[1].children
          for (let c of lastChild) {
              //console.log('lastchild',c.children[1].children.length)
              last = c.children[1].children.length
              if (last == 0) {
                  console.log('C', child)
                  iterate(child.children[1], entry, true)
              }
          }
          iterate(child.children[1], entry)
      } else {
          if (child.children[1].children.length == 0) {
              console.log('Ca', child)
              child.style.display = ' '
          }
          else {
              child.style.display = 'none'
              console.log('E', child)
          }
      }
  }
}