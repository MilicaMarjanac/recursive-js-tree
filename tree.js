const TREE_DATA = {
  name: "Plants",
  children: [
    {
      name: "Fruit",
      children: [{ name: "Apple" }, { name: "Banana" }, { name: "Fruitloops" }]
    },
    {
      name: "Vegetables",
      children: [
        {
          name: "Green",
          children: [{ name: "Broccoli" }, { name: "Brusselsprouts" }]
        },
        {
          name: "Orange",
          children: [{ name: "Pumpkins" }, { name: "Carrots" }]
        }
      ]
    }
  ]
};

//let treeList = document.getElementById("list");

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

function createTree() {
  let treeList = document.createElement("ul");
  let tree = printList(TREE_DATA);
  treeList.appendChild(tree);
  let container = document.createElement("div");
  container.appendChild(treeList);
  document.body.appendChild(container);
  return treeList;
}

let treeData = createTree();
/* nisam sigurna jesam li te dobro skontala, je li poenta bila da ne pravim nijednu globalnu varijablu 
ili samo ono ul da ne bude globalno/u html-u? */

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

function search() {
  let input = document.getElementById("searchBox");
  let entry = input.value.toUpperCase();
  iterate(treeData, entry);
}

function iterate(obj, entry, forceShow) {
  let isAnyChildMatching = false;
  for (let child of obj.children) {
    if (
      child.children[1].childNodes[0].textContent.toUpperCase().indexOf(entry) >
        -1 ||
      forceShow === true
    ) {
      isAnyChildMatching = true;
      if (isAnyChildMatching === true) {
        child.style.display = "flex";
      }
      iterate(child.children[1], entry, true);
    } else {
      child.style.display = "none";
      let childrenMatched = iterate(child.children[1], entry);
      if (childrenMatched === true) {
        isAnyChildMatching = true;
      }
    }
  }
  if (isAnyChildMatching === true) {
    obj.parentNode.style.display = "flex";
  }
  return isAnyChildMatching;
}
