var expenses = "";
var earnings = "";
let expensesSummary;
let earningsSummary;

function initialVarSet() {
  expenses = [
    { value: 2000, name: "Rachunki" },
    { value: 2000, name: "Leasing" },
    { value: 513, name: "Inne" },
  ];
  earnings = [
    { value: 3000, name: "Pensja" },
    { value: 500, name: "Sprzedaż na allegro" },
    { value: 2000, name: "Zlecenia" },
  ];
}
initialVarSet();

function refreshView() {
  function generateList(items) {
    let createListContent = "";
    items.forEach((item, i) => {
      let listName = items === expenses ? "expenses" : "earnings";

      createListContent += `<li id="li_${listName}_${i}">${i + 1}. ${
        item.name
      } - ${item.value}`;
      createListContent += `<div class="btns-container">
      <button class="btn-danger" id="delete_${listName}_${i}">Usuń</button>
      <button class="btn-primary" id="edit_${listName}_${i}">Edytuj</button>
      </div></li>`;

      setTimeout(() => {
        const deleteButton = document.getElementById(`delete_${listName}_${i}`);
        deleteButton.addEventListener("click", function () {
          deleteItem(items, i);
        });
      }, 0);
      setTimeout(() => {
        const editButton = document.getElementById(`edit_${listName}_${i}`);
        editButton.addEventListener("click", function () {
          edititem(items, i, listName);
        });
      }, 0);
    });

    expensesSummary = expenses.reduce(
      (accumulator, current) => accumulator + current.value,
      0
    );
    earningsSummary = earnings.reduce(
      (accumulator, current) => accumulator + current.value,
      0
    );

    if (items === expenses) {
      document.getElementById(
        "expensesListFooter"
      ).textContent = `Suma wydatków: ${expensesSummary} złotych`;
    } else {
      document.getElementById(
        "earningsListFooter"
      ).textContent = `Suma przychodów: ${earningsSummary} złotych`;
    }

    return createListContent;
  }

  document.getElementById("expensesList").innerHTML = "";
  document.getElementById("earningsList").innerHTML = "";
  document.getElementById("expensesList").innerHTML += generateList(expenses);
  document.getElementById("earningsList").innerHTML += generateList(earnings);

  const moneyLeft = document.getElementById("moneyLeft");
  let toSpent = earningsSummary - expensesSummary;
  if (toSpent < 0) {
    if (toSpent % 1 !== 0) {
      toSpent = toSpent.toFixed(2);
    }
    let debet = -toSpent;
    moneyLeft.textContent = `Hamuj z wydatkami! Jesteś pod kreską... aż ${debet} złotych`;
    return;
  } else if (toSpent === 0) {
    moneyLeft.textContent =
      "Jesteś na 0, nie poszalejesz... Lepiej planuj finansów!";
    return;
  }
  if (toSpent % 1 !== 0) {
    toSpent = toSpent.toFixed(2);
  }
  moneyLeft.textContent = `Możesz jeszcze wydać ${toSpent} złotych`;
}

initialVarSet();
refreshView();

function deleteItem(type, index) {
  type.splice(index, 1);
  refreshView();
}
function edititem(type, index, listName) {
  const li = document.getElementById(`li_${listName}_${index}`);
  li.innerHTML = `<input type="text" value="${type[index].name}">
<input type="text" value="${type[index].value}">`;
}
function addItem(type, name, value) {
  if (name.length < 3) {
    alert("nazwa jest zbyt krótka");
    return;
  } else if (value < 0.01) {
    alert("kwota jest zbyt mała");
    return;
  }
  type[type.length] = { name: name, value: value };
  refreshView();
}

// dodaj wydatek
document.getElementById("addNewExpense").addEventListener("click", function () {
  const expenseName = document.getElementById("newExpenseName").value;
  const expenseValue = Number(document.getElementById("newExpenseValue").value);
  addItem(expenses, expenseName, expenseValue);
});

// dodaj zarobek
document.getElementById("addNewEarning").addEventListener("click", function () {
  const earningName = document.getElementById("newEarningName").value;
  const earningValue = Number(document.getElementById("newEarningValue").value);
  addItem(earnings, earningName, earningValue);
});
