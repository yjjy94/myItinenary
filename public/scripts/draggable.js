function allowDrop(ev) {
  ev.preventDefault();
}

function dragEnd(ev) {
  ev.target.style.border = "";
  const grayOut = document.getElementById("gray-out");
  const dropBtn = document.getElementById("dropBtn");
  grayOut.style.zIndex = -1;
  dropBtn.innerText = "SAVE COURSE";
  dropBtn.classList.toggle("animationPlay");
}
function enteredArea(ev) {
  ev.target.style.background = "rgb(105, 215, 235)";
}
function leftArea(ev) {
  ev.target.style.background = "white";
}

function drag(ev) {
  ev.dataTransfer.effectAllowed = "copy";
  ev.dataTransfer.setData("text", ev.target.id);
  const grayOut = document.getElementById("gray-out");
  const dropBtn = document.getElementById("dropBtn");
  ev.target.style.border = "2px solid gray";
  grayOut.style.zIndex = 2;
  dropBtn.innerText = "DROP HERE";
  dropBtn.classList.toggle("animationPlay");
}

function drop(ev) {
  ev.preventDefault();
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
}

function addToDataList() {
  const form = document.getElementById("courseListForm");
  const places = form.getElementsByClassName("place");

  if (!places || places.length <= 0) {
    return alert("NO LIST TO SAVE!");
  }
  const locations = form.getElementsByClassName("location");
  const urls = form.getElementsByClassName("placeurl");
  const longXs = form.getElementsByClassName("longx");
  const latYs = form.getElementsByClassName("laty");
  const courseListData = document.getElementById("courseListData");

  let data = [];

  for (let i = 0; i < places.length; i++) {
    data.push({
      placeName: places[i].innerText,
      placeLocation: locations[i].innerText,
      placeUrl: urls[i].value,
      longX: longXs[i].value,
      latY: latYs[i].value,
    });
  }
  courseListData.value = JSON.stringify(data);
  console.log(courseListData.value);
  form.submit();
}

function removeFromList(event) {
  let liElement = event.target.parentNode;
  liElement.remove();
}

function addCloseBtnEventListener() {
  let closeBtns = document.getElementsByClassName("closeBtn");
  for (const closeBtn of closeBtns) {
    closeBtn.addEventListener("click", removeFromList);
  }
}
