function allowDrop(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "copy";
  console.log(
    "DRAGOVER: " +
      ev.dataTransfer.dropEffect +
      " allowed: " +
      ev.dataTransfer.effectAllowed
  );
}

function drag(ev) {
  ev.dataTransfer.effectAllowed = "copy";
  ev.dataTransfer.setData("text", ev.target.id);
  let grayOut = document.getElementById("gray-out");
  ev.target.style.border = "2px solid gray";
  grayOut.style.zIndex = 2;
  console.log(
    "DRAGSTART: " +
      ev.dataTransfer.dropEffect +
      " allowed: " +
      ev.dataTransfer.effectAllowed
  );
}
function dragEnd(ev) {
  ev.target.style.border = "";
  let grayOut = document.getElementById("gray-out");
  grayOut.style.zIndex = -1;
}
function enteredArea(ev) {
  ev.target.style.background = "teal";
}
function leftArea(ev) {
  ev.target.style.background = "white";
}

function drop(ev) {
  ev.preventDefault();
  // ev.dataTransfer.dropEffect = "copy";
  console.log(
    "DROP: " +
      ev.dataTransfer.dropEffect +
      " allowed: " +
      ev.dataTransfer.effectAllowed
  );
  var data = ev.dataTransfer.getData("text");
  let list = document.getElementById("courseList");
  let element = document.getElementById(data);
  let closeBtn = document.createElement("button");

  closeBtn.innerHTML = "X"; //add a X button on li
  closeBtn.setAttribute("class", "closeBtn"); //add X button classname
  ev.target.style.background = "white";
  element.appendChild(closeBtn);
  element.setAttribute("id", "");
  element.style.position = "relative";

  list.appendChild(element);
  addCloseBtnEventListener();
  // console.log(element);
}

function removeFromList(event) {
  let liElement = event.target.parentNode;
  liElement.remove();
}

function moveBackToKakaoList(element) {}
function addCloseBtnEventListener() {
  let closeBtns = document.getElementsByClassName("closeBtn");
  for (const closeBtn of closeBtns) {
    closeBtn.addEventListener("click", removeFromList);
  }
  console.log(closeBtns);
}
