const TREE_DATA = {
    name: "Plants",
    children: [{
            name: "Fruit",
            children: [{ name: "Apple" }, { name: "Banana" }, { name: "Fruitloops" }]
        },
        {
            name: "Vegetables",
            children: [{
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
 
    let toggleBtn = document.createElement("button");
    toggleBtn.innerHTML = "Toggle";
    toggleBtn.addEventListener("click", expCol);
    let buttons = document.createElement("div");
    buttons.setAttribute("class", "buttons");
    buttons.append(toggleBtn);

    let treeListcontainer = document.createElement("div");
    treeListcontainer.appendChild(treeList);
    let container = document.createElement("div");
    container.append(buttons, treeListcontainer);
    document.body.appendChild(container);
    return treeList;
}

let treeData = createTree(TREE_DATA);


function expCol() {
    expandCollapse(treeData);
}

function expandCollapse(data) {
    for (let child of data.children) {
        if (child.children[1].classList.contains("touched")) {
            child.children[1].classList.remove("hide");
            if (child.children[1].children.length != 0) {
                child.children[1].previousSibling.classList.add("icon2")
            }
        }
        else {
            if (child.children[1].classList.contains("hide")) {
                child.children[1].classList.remove("hide");
                if (child.children[1].children.length != 0) {
                    child.children[1].previousSibling.classList.add("icon2")
                }
                expandCollapse(child.children[1]);
            }
            else {
                child.children[1].classList.add("hide");
                if (child.children[1].children.length != 0) {
                    child.children[1].previousSibling.classList.remove("icon2");
                    child.children[1].previousSibling.classList.add("icon1")
                }
                expandCollapse(child.children[1]);
            }
        }
        expandCollapse(child.children[1]);
    }
}

function toggle(event) {
   if (event.target.nextElementSibling.classList.value === "hide" ||  
       event.target.nextElementSibling.classList.value === "hide touched" ||  
       event.target.nextElementSibling.classList.value === "touched hide") {
        event.target.nextElementSibling.classList.remove("hide");
        event.target.classList.add("icon2");
       
    } 
    else{
        event.target.nextElementSibling.classList.add("hide");
       event.target.nextElementSibling.classList.add("touched");
        event.target.classList.remove("icon2");
        event.target.classList.add("icon1");
    }
}

function search() {
    let input = document.getElementById("searchBox");
    let entry = input.value.toUpperCase();
    entry = startAutocomplete(input, treeData)
    iterate(treeData, entry);
}

function startAutocomplete(inputField, data) {
    let selectContainer = document.createElement("div");
    selectContainer.setAttribute("class", "autocomplete");
    selectContainer.setAttribute("id", "autocomplete");
    inputField.parentNode.appendChild(selectContainer);
    let value = inputField.value;
    removeRedundant();
    let optionsList = [];
    iterateSelection(data, value, optionsList);
    for (let option of optionsList) {
        option.innerHTML += "<input type='hidden' value='" + option.innerHTML + "'>";
        option.addEventListener("click", function (e) {
            inputField.value = this.getElementsByTagName("input")[0].value
            hideList()
            iterate(treeData, inputField.value.toUpperCase());
        })
        selectContainer.append(option);
    }
    if (inputField.value == "") {
        selectContainer.value = "";
        hideList()
    }
    document.addEventListener("click", function (e) {
        removeNotTargeted(e.target)
    });

    return inputField.value.toUpperCase();
}

let currentFocus = -1;

let globalInput = document.getElementById('searchBox')
globalInput.addEventListener("keydown", function (e) {
    var x = document.getElementById("autocomplete");
    if (x) x = x.getElementsByTagName("div");
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
})   

function addActive(x) {
    if (!x) return false;
    //  removeActive(x); wtf
    if (currentFocus >= x.length) {
        currentFocus = 0
    }
    if (currentFocus < 0) {
        currentFocus = (x.length - 1)
    }
    x[currentFocus].classList.add("autocomplete-active");
}

function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete-active");
  }
}

  function hideList() {
    let items = document.getElementsByClassName("autocomplete");
    for (let child of items[0].children) {
      child.style.display = "none";
    }
  }

  function removeNotTargeted(target) {
    let list = document.getElementsByClassName("autocomplete");
    let inp = document.getElementById("searchBox");
    for (var i = 0; i < list.length; i++) {
      if (list[i] != target.parentNode && inp != target) {
        hideList();
      }
    }
  }

  function iterateSelection(data, value, list) {
    for (let child of data.children) {
        if (child.children[1].childNodes[0].textContent.toUpperCase().indexOf(value.toUpperCase()) > -1) {
            let optContainer = document.createElement("div");
            optContainer.innerHTML = child.children[1].childNodes[0].textContent;
            list.push(optContainer)
        }
        iterateSelection(child.children[1], value, list)
    }
  }
  
function removeRedundant() {
    var list = document.getElementsByClassName("autocomplete");
    for (var i = 0; i < list.length - 1; i++) {
        list[i].parentNode.removeChild(list[i]);
    }
}

function iterate(obj, entry, forceShow) {
    let isAnyChildMatching = false;
    for (let child of obj.children) {
         if (
            child.children[1].childNodes[0].textContent.toUpperCase().indexOf(entry) >
            -1 || forceShow === true 
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