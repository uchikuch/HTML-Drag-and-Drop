const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");

draggableElements.forEach((elem) => {
  elem.addEventListener("dragstart", dragStart);
  // elem.addEventListener("drag", drag)
  // elem.addEventListener("dragend", dragEnd)
});

droppableElements.forEach((elem) => {
  elem.addEventListener("dragenter", dragEnter);
  elem.addEventListener("dragover", dragOver);
  elem.addEventListener("dragleave", dragLeave);
  elem.addEventListener("drop", drop);
});

// Drag and Drop Functions

function dragStart(event) {
  /* each drag event has a dataTransfer property that holds the event's data
    This property also has methods to manage the event's data */
  event.dataTransfer.setData("text", event.target.id);
}

function dragEnter(event) {
  if (!event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragLeave(event) {
  if (!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function dragOver(event) {
  if (!event.target.classList.contains("dropped")) {
    event.preventDefault();
  }
}

function drop(event) {
  event.preventDefault();
  event.target.classList.remove("droppable-hover");
  const draggableElementData = event.dataTransfer.getData("text");
  const droppableElementData = event.target.getAttribute("data-draggable-id");
  if (draggableElementData === droppableElementData) {
    event.target.classList.add("dropped");
    const draggableElement = document.getElementById(draggableElementData);
    event.target.style.backgroundColor = draggableElement.style.color;
    // event.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    event.target.insertAdjacentHTML(
      "afterbegin",
      `<i class="fas fa-${draggableElementData}"></i>`
    );
  }
}
