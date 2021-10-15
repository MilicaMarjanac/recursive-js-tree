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

function createTree(data) {
  let treeList = document.createElement("ul");
  let tree = printList(data);
  treeList.appendChild(tree);

  let expandBtn = document.createElement("button");
  expandBtn.innerHTML = "Expand All";
  expandBtn.addEventListener("click", expand);

  let collapseBtn = document.createElement("button");
  collapseBtn.innerHTML = "Collapse All";
  collapseBtn.addEventListener("click", collapse);

  let buttons = document.createElement("div");
  buttons.append(expandBtn, collapseBtn);

  let treeListcontainer = document.createElement("div");
  treeListcontainer.appendChild(treeList);
  
  let container = document.createElement("div");
  container.append(buttons, treeListcontainer);
  document.body.appendChild(container);
  return treeList;
}

let treeData = createTree(TREE_DATA);

function expand() {
  expandIterator(treeData);
}

function expandIterator(data) {
  for (let child of data.children) {
    if (child.children[1].classList.contains("hide")) {
      child.children[1].classList.remove("hide");
      toggleIcon(child.children[1]);
    }
    expandIterator(child.children[1]);
  }
}

function collapse() {
  collapseIterator(treeData);
}

function collapseIterator(data) {
  for (let child of data.children) {
    child.children[1].classList.add("hide");
    if (child.children[1].previousSibling != null) {
      if (child.children[1].previousSibling.classList.contains("icon2")) {
        child.children[1].previousSibling.classList.remove("icon2");
        child.children[1].previousSibling.classList.add("icon1");
      }
    }
    collapseIterator(child.children[1]);
  }
}

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
// with object flattening
/*
function search() {
  let input = document.getElementById("searchBox");
  let entry = input.value.toUpperCase();
  let array = makeFlatArray()
  entry = startAutocomplete(input, array)
  iterate(treeData, entry);
}

function makeFlatArray() {
  let flatArray = [];
  function flatten(data) {
    for (let child of data.children) {
      flatArray.push(child.children[1].childNodes[0].textContent);
      flatten(child.children[1]);
    }
    return flatArray;
  }
  let arr = flatten(treeData);
  return arr;
}

function startAutocomplete(inputField, array) {
  removeRedundant();
  let selectContainer = document.createElement("select");
  inputField.parentNode.appendChild(selectContainer);
  let value = inputField.value;
  for (let item of array) {
    if (item.toUpperCase().indexOf(value.toUpperCase()) > -1) {
      let optContainer = document.createElement("option");
      optContainer.innerHTML = item;
      selectContainer.appendChild(optContainer);
    }
  }
  return inputField.value.toUpperCase();
}

function removeRedundant() {
  var list = document.getElementsByTagName("select");
  for (var i = 0; i < list.length; i++) {
    list[i].parentNode.removeChild(list[i]);
  }
}
*/

// alternative with original object 
function search() {
  let input = document.getElementById("searchBox");
  let entry = input.value.toUpperCase();
  entry = startAutocomplete(input, treeData)
  iterate(treeData, entry);
}

function startAutocomplete(inputField, data) {
  let selectContainer = document.createElement("select");
  inputField.parentNode.appendChild(selectContainer);
  let value = inputField.value;
  removeRedundant();
  let optionsList = [];
  iterateSelection(data, value, optionsList);
  for (let option of optionsList) {
    selectContainer.append(option);
  }
  selectContainer.addEventListener("change", () => {
    //inputField.value = this.value;
    inputField.value = selectContainer.value;
    iterate(treeData, inputField.value.toUpperCase());
  });
  if (inputField.value == "") {
    selectContainer.value = "";
  }
  return inputField.value.toUpperCase();
}

function iterateSelection(data, value, list) {
  for (let child of data.children) {
      if (child.children[1].childNodes[0].textContent.toUpperCase().indexOf(value.toUpperCase()) > -1) {
          let optContainer = document.createElement("option");
          optContainer.innerHTML = child.children[1].childNodes[0].textContent;
          list.push(optContainer)
      }
      iterateSelection(child.children[1], value, list)
  }
}

function removeRedundant() {
  var list = document.getElementsByTagName("select");
  for (var i = 0; i < list.length - 1; i++) {
    list[i].parentNode.removeChild(list[i]);
  }
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
    obj.classList.remove("hide");
    toggleIcon(obj);
  }
  return isAnyChildMatching;
}

function toggleIcon(item) {
  if (item.previousSibling != null) {
    if (item.previousSibling.classList.contains("icon1")) {
      item.previousSibling.classList.remove("icon1");
      item.previousSibling.classList.add("icon2");
    }
  }
}