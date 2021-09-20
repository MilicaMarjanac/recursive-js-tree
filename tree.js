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

  
  function iterate(list) {
    for (let child of list.children) {
    
      console.log(child.children[1])
      iterate(child.children[1])
      
    }
  }
  iterate(treeList);
  
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

let liList = treeList.getElementsByTagName("li");



//ovo radi ali ima bug, ako trazis npr "Vegetables", izlista Vegetables ali ne i njihovu djecu
function search() { 
  let input = document.getElementById("searchBox");
  let entry = input.value.toUpperCase();
  
  for (i = 0; i < liList.length; i++) {
    let text = liList[i].innerHTML;

    if (text.toUpperCase().indexOf(entry) > -1) {
      liList[i].style.display = "";
      liList[i].previousSibling.style.display = "";
    } else {
      liList[i].style.display = "none";
      liList[i].previousSibling.style.display = "none";
    }
  }
}

/* pa sam pokusavala da napravim funkciju buildTree(TREE_DATA, entry) iz koje bih na osnovu entry-ja 
filtrirala trazeni objekat(ukljucujuci i djecu) 
i pozvala je iz search funkcije da ponovo izgenerise drvo, ali ne uspijevam */
