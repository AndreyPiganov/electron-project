import User from "../types/interfaces/User";
import isValidEmail from "../utils/isValidEmail.js";

const usersTable: HTMLTableSectionElement = document
  .getElementById("usersTable")!
  .getElementsByTagName("tbody")[0];
const addUserButton: HTMLButtonElement = document.getElementById(
  "addUserButton"
) as HTMLButtonElement;
const userForm: HTMLDivElement = document.getElementById(
  "userForm"
) as HTMLDivElement;
const submitUserButton: HTMLButtonElement = document.getElementById(
  "submitUserButton"
) as HTMLButtonElement;

const nameInput: HTMLInputElement = document.getElementById(
  "name"
) as HTMLInputElement;
const emailInput: HTMLInputElement = document.getElementById(
  "email"
) as HTMLInputElement;

let users: User[] = [];

addUserButton.addEventListener("click", (): void => {
  console.log('Кнопка "Добавить пользователя" нажата');
  userForm.style.display = userForm.style.display === "none" ? "block" : "none";
});

submitUserButton.addEventListener("click", (event: Event): void => {
  event.preventDefault();

  const name: string = nameInput.value.trim();
  console.log(`Имя: ${name}`);
  const email: string = emailInput.value.trim();

  if (name.length < 3) {
    alert("Имя должно содержать не менее 3 символов.");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Введите корректный email.");
    return;
  }

  users.push({ name, email });
  updateTable();

  nameInput.value = "";
  emailInput.value = "";
  userForm.style.display = "none";
});

function updateTable(): void {
  usersTable.innerHTML = "";

  users.forEach((user: User) => {
    const row: HTMLTableRowElement = usersTable.insertRow();
    const nameCell: HTMLTableCellElement = row.insertCell(0);
    const emailCell: HTMLTableCellElement = row.insertCell(1);

    nameCell.textContent = user.name;
    emailCell.textContent = user.email;
  });
}
