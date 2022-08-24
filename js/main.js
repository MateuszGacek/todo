let todoInput, errorInfo, addBtn, ulList, newTask;
let popup, popupInfo, todoToEdit, popupInput, popupAddBtn, popupCloseBtn;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	todoInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addBtn = document.querySelector(".btn-add");
	ulList = document.querySelector(".todolist ul");

	popup = document.querySelector(".popup");
	popupInfo = document.querySelector(".popup-info");
	popupInput = document.querySelector(".popup-input");
	popupAddBtn = document.querySelector(".accept");
	popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
	addBtn.addEventListener("click", addNewTask);
	ulList.addEventListener("click", checkClick);
	popupCloseBtn.addEventListener("click", closePopup);
	popupAddBtn.addEventListener("click", changeTodoText);
	todoInput.addEventListener("keyup", enterKeyAdd);
	popupInput.addEventListener("keyup", enterKeyEdit);
	document.addEventListener("keyup", enterKeyClose);
};
const addNewTask = () => {
	if (todoInput.value !== "") {
		newTask = document.createElement("li");
		newTask.textContent = todoInput.value;
		ulList.append(newTask);
		createBtn();
		todoInput.value = "";
		errorInfo.textContent = "";
	} else {
		errorInfo.textContent = "Wpisz treść zadania!";
	}
};

const createBtn = () => {
	const toolsPanel = document.createElement("div");
	let btnCheck = document.createElement("button");
	let btnEdit = document.createElement("button");
	let btnClose = document.createElement("button");

	btnCheck.setAttribute("class", "complete");
	btnCheck.innerHTML = '<i class="fas fa-check"></i>';

	btnEdit.setAttribute("class", "edit");
	btnEdit.textContent = "EDIT";

	btnClose.setAttribute("class", "delete");
	btnClose.innerHTML = '<i class="fas fa-times"></i>';

	toolsPanel.classList.add("tools");
	toolsPanel.appendChild(btnCheck);
	toolsPanel.appendChild(btnEdit);
	toolsPanel.appendChild(btnClose);

	newTask.append(toolsPanel);
};

const checkClick = (e) => {
	if (e.target.matches(".complete")) {
		e.target.closest("li").classList.toggle("completed");
	} else if (e.target.matches(".edit")) {
		editTodo(e);
	} else if (e.target.matches(".delete")) {
		deleteTask(e);
	}
};

const editTodo = (e) => {
	todoToEdit = e.target.closest("li");

	popupInput.value = todoToEdit.firstChild.textContent;
	popup.style.display = "flex";
};
const closePopup = () => {
	popup.style.display = "none";
	popupInfo.textContent = "";
};

const changeTodoText = () => {
	if (popupInput.value !== "") {
		todoToEdit.firstChild.textContent = popupInput.value;
		popup.style.display = "none";
		popupInfo.textContent = "";
	} else {
		popupInfo.textContent = "Wpisz treść zadania";
	}
};
const deleteTask = (e) => {
	e.target.closest("li").remove();
	const allTodos = ulList.querySelectorAll("li");

	if (allTodos.length === 0) {
		errorInfo.textContent = "Brak zadań na liście.";
	}
};

const enterKeyAdd = (e) => {
	if (e.key === "Enter") {
		addNewTask();
	}
};
const enterKeyEdit = (e) => {
	if (e.key === "Enter") {
		changeTodoText();
	}
};

const enterKeyClose = (e) => {
	if (e.key === "Escape") {
		closePopup();
	}
};

document.addEventListener("DOMContentLoaded", main);
