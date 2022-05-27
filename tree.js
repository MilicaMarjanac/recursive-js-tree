const TREE_DATA = {
  name: "Plants",
  children: [
    {
      name: "Fruit",
      children: [{ name: "Apple" }, { name: "Banana" }, { name: "Fruitloops" }],
    },
    {
      name: "Vegetables",
      children: [
        {
          name: "Green",
          children: [{ name: "Broccoli" }, { name: "Brusselsprouts" }],
        },
        {
          name: "Orange",
          children: [{ name: "Pumpkins" }, { name: "Carrots" }],
        },
      ],
    },
  ],
};

// create tree object
function createTree(obj) {
  let wrapper = document.createElement("div");
  wrapper.classList.add("wrap");

  let listItem = document.createElement("li");
  let itemIcon = document.createElement("div");

  wrapper.appendChild(itemIcon);
  wrapper.appendChild(listItem);

  listItem.innerHTML = obj.name;
  listItem.style.marginLeft = "10px";
  if (obj.children) {
    for (let i in obj.children) {
      itemIcon.classList.add("icon2");
      listItem.appendChild(createTree(obj.children[i]));
    }
  }
  itemIcon.addEventListener("click", toggle);
  return wrapper;
}

// attach tree to document.body, add expand/collapse buttons
function exportTree(data) {
  let treeList = document.createElement("ul");
  let tree = createTree(data);
  treeList.appendChild(tree);

  let expandBtn = document.createElement("button");
  expandBtn.innerHTML = "Expand All";
  expandBtn.addEventListener("click", expand);

  let collapseBtn = document.createElement("button");
  collapseBtn.innerHTML = "Collapse All";
  collapseBtn.addEventListener("click", collapse);

  let buttons = document.createElement("div");
  buttons.setAttribute("class", "buttons");
  buttons.append(expandBtn, collapseBtn);

  let treeListcontainer = document.createElement("div");
  treeListcontainer.appendChild(treeList);

  let container = document.createElement("div");
  container.append(buttons, treeListcontainer);
  document.body.appendChild(container);
  return treeList;
}

let treeData = exportTree(TREE_DATA);

function expand() {
  expandIterator(treeData);
}
function collapse() {
  collapseIterator(treeData);
}

// expand button
function expandIterator(data) {
  for (let child of data.children) {
    if (child.children[1].classList.contains("hide")) {
      child.children[1].classList.remove("hide");
      switchIcon(child.children[1], "icon1", "icon2");
    }
    expandIterator(child.children[1]);
  }
}

// collapse button
function collapseIterator(data) {
  for (let child of data.children) {
    child.children[1].classList.add("hide");
    switchIcon(child.children[1], "icon2", "icon1");
    collapseIterator(child.children[1]);
  }
}

// toggle +/- icons and toggle tree items
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

function search(e) {
  if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13) return;
  let input = document.getElementById("searchBox");
  let entry = input.value.toUpperCase();
  entry = startAutocomplete(input, treeData);
  iterate(treeData, entry);
}

function startAutocomplete(inputField, data) {
  let currentFocus = -1;
  let selectContainer = document.createElement("div");
  selectContainer.classList.add("autocomplete");
  inputField.parentNode.appendChild(selectContainer);
  let value = inputField.value;
  let list = document.getElementsByClassName("autocomplete");
  for (let i = 0; i < list.length - 1; i++) {
    list[i].parentNode.removeChild(list[i]);
  }

  let optionsList = [];
  showAutocompleteList(data, value, optionsList);
  for (let option of optionsList) {
    option.innerHTML +=
      "<input type='hidden' value='" + option.innerHTML + "'>";
    option.addEventListener("click", function (e) {
      inputField.value = this.getElementsByTagName("input")[0].value;
      hideNotSelected(e.target);
      iterate(treeData, inputField.value.toUpperCase());
    });
    selectContainer.append(option);
  }

  if (inputField.value == "") {
    selectContainer.value = "";
    for (let child of list[0].children) {
      child.style.display = "none";
    }
  }

  document.addEventListener("click", function (e) {
    hideNotSelected(e.target);
  });

  let inputBox = document.getElementById("searchBox");
  inputBox.addEventListener("keydown", function (e) {
    let x = optionsList;
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });

  // add class/style for active item
  function addActive(x) {
    if (x.length < 1) return false;
    removeActive(x);
    if (currentFocus >= x.length) {
      currentFocus = 0;
    }
    if (currentFocus < 0) {
      currentFocus = x.length - 1;
    }
    x[currentFocus].classList.add("autocomplete-active");
  }

  return inputField.value.toUpperCase();
}

// hide autocomplete list if clicked outside of list
function hideNotSelected(target) {
  let input = document.getElementById("searchBox");
  if (input != target) {
    let items = document.getElementsByClassName("autocomplete");
    for (let child of items[0].children) {
      child.style.display = "none";
    }
  }
}

function showAutocompleteList(data, value, list) {
  for (let child of data.children) {
    if (
      child.children[1].childNodes[0].textContent
        .toUpperCase()
        .indexOf(value.toUpperCase()) > -1
    ) {
      let optContainer = document.createElement("div");
      optContainer.innerHTML = child.children[1].childNodes[0].textContent;
      list.push(optContainer);
    }
    showAutocompleteList(child.children[1], value, list);
  }
}

// remove class/style from item
function removeActive(x) {
  for (let i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete-active");
  }
}

// tree search
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
    switchIcon(obj, "icon1", "icon2");
  }
  return isAnyChildMatching;
}

function switchIcon(item, icon1, icon2) {
  if (item.previousSibling != null) {
    if (item.previousSibling.classList.contains(icon1)) {
      item.previousSibling.classList.remove(icon1);
      item.previousSibling.classList.add(icon2);
    }
  }
}
