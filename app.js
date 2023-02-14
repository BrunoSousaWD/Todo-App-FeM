// switch active links
let active = document.getElementById('nav');
if (active) {
    let linkItem = document.querySelectorAll('a');
    for (let i = 0; i < linkItem.length; i++) {
        linkItem[i].addEventListener('click', function () {
            if (!this.classList.contains('selected')) {
                if (linkItem) {
                    for (i = 0; i < linkItem.length; i++) {
                        linkItem[i].classList.remove('selected');
                    }
                }
                this.classList.toggle('selected');
            }
        })
    }
}


//show All
function showAll() {
    let listItem = document.querySelectorAll('li');
    for (let i = 0; i < listItem.length; i++)
        listItem[i].style.display = 'grid';
}

//show Active
function showActive() {
    let listItem = document.querySelectorAll('li');
    for (let i = 0; i < listItem.length; i++)
        if (listItem[i].classList.contains('checked')) {
            listItem[i].style.display = 'none';
        } else {
            listItem[i].style.display = 'grid';
        }
}

//show completed
function showComplete() {
    let listItem = document.querySelectorAll('li');
    for (let i = 0; i < listItem.length; i++)
        if (listItem[i].classList.contains('checked')) {
            listItem[i].style.display = 'grid';
        } else {
            listItem[i].style.display = 'none';
        }
}


//clear completed
function clearCompleted() {
    let listItem = document.querySelectorAll('.checked');
    for (let i = 0; i < listItem.length; i++) {
        listItem[i].remove();
    }
}

//add count
let count = 0;
function addCount() {
    count += 1;
    document.getElementById('items-count').innerHTML = count;
}
//remove count
function removeCount() {
    count -= 1;
    document.getElementById('items-count').innerHTML = count;
}


//append to list
const listItems = [];
let innitialPosition;

function addListItem() {
    let todoList = document.getElementById("todo-list");
    const li = document.createElement('li');
    li.setAttribute('draggable', true);
    li.classList.add('draggable');

    let inputValue = document.getElementById('input-value').value;
    let text = document.createTextNode(inputValue);

    //set checkbox
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    // set close div
    let close = document.createElement('div');
    let img = document.createElement('img');
    img.setAttribute("src", "images/icon-cross.svg");
    close.appendChild(img);

    // add item
    if (inputValue === '') {
        let error = document.getElementById('error')
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
        if (document.body.classList == 'darkmode') {
            li.classList.add('darkmode');
        }
        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(close);
        listItems.push(li);
        todoList.appendChild(li);
        document.getElementById("input-value").value = "";
        addCount();
    }
    // assign a position to each li
    let item = document.querySelectorAll('li');

    for (let k = 0; k < item.length; k++) {
        item[k].setAttribute('list-pos', k);
    }

    //complete
    complete(checkbox);
    //clear item
    deleteItem(close);

    //drag and drop
    dragAndDrop();
}

//dragAndDrop
function dragStart() {
    innitialPosition = this.getAttribute('list-pos');
}
function dragEnter() {
    this.classList.add('dragging');
}
function dragLeave() {
    this.classList.remove('dragging');
}
function dragOver(e) {
    e.preventDefault();
}
function dragDrop() {
    this.classList.remove('dragging');

    const dropPosition = this.getAttribute('list-pos');

    swapItem(innitialPosition, dropPosition);
}
//swap listItems
function swapItem(startPos, dropPos) {
    //save the dropItem
    const dropItem = listItems[dropPos].innerHTML;

    //swap the drop item with the drag item
    listItems[dropPos].innerHTML = listItems[startPos].innerHTML;
    listItems[startPos].innerHTML = dropItem;
}

function dragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const container = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })

    container.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}

//complete
function complete(box) {
    box.addEventListener('click', function () {
        let div = this.parentElement;

        if (!div.classList.contains('checked')) {
            div.classList.add('checked');
            removeCount();

        } else {
            div.classList.remove('checked');
            addCount();
        }
    })
}

//delete item
function deleteItem(close) {
    close.onclick = function () {
        var listItem = this.parentElement;
        listItem.remove();

        let div = this.parentElement;
        if (!div.classList.contains('checked')) {
            removeCount();
        }
    }
}

//Darkmode
let darkMode = document.getElementById("dark-switch");
let lightMode = document.getElementById("light-switch");

//darkmode turn on
darkMode.addEventListener('click', function () {
    document.body.classList.add('darkmode');
    document.getElementById('light-bg').style.display = 'none';

    document.getElementById('dark-bg').style.display = 'block';

    document.getElementById('dark-switch').style.display = 'none';
    document.getElementById('light-switch').style.display = 'block';

    document.getElementById('todo-input').classList.add('darkmode');
    document.getElementById('add-input').classList.add('darkmode');
    document.getElementById('mobile-footer-nav').classList.add('darkmode');
    document.getElementById('list').classList.add('darkmode');


    let li = document.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
        li[i].classList.add('darkmode');
    }

    document.querySelector('footer').classList.add('darkmode');
})

//light mode turn on
lightMode.addEventListener('click', function () {
    document.body.classList.remove('darkmode');
    document.getElementById('light-bg').style.display = 'block';

    document.getElementById('dark-bg').style.display = 'none';
    document.getElementById('dark-switch').style.display = 'block';
    document.getElementById('light-switch').style.display = 'none';

    document.getElementById('todo-input').classList.remove('darkmode');
    document.getElementById('add-input').classList.remove('darkmode');
    document.getElementById('mobile-footer-nav').classList.remove('darkmode');
    document.getElementById('list').classList.remove('darkmode');

    let li = document.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++)
        li[i].classList.remove('darkmode');

    document.querySelector('footer').classList.remove('darkmode');
})

