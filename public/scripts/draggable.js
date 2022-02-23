function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  let element = document.getElementById(data);
  console.log(element.innerText);
  console.log(element);
  ev.target.appendChild(element);
}
