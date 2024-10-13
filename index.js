let expenses = [];
let earnings = [];
let expensesSummary = "";
let earningsSummary = "";

/*function initialVarSet() {
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
}*/
//initialVarSet();

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
        let editButton = document.getElementById(`edit_${listName}_${i}`);
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
      //zaokrąglam konwertując na numer tylko gdy podsumowanie ma jakieś grosze
      if (
        (expensesSummary % 1 !== 0 && expensesSummary > 1) ||
        expensesSummary < 1
      ) {
        expensesSummary = parseFloat(expensesSummary.toFixed(2));
      }
      document.getElementById(
        "expensesListFooter"
      ).textContent = `Suma wydatków: ${expensesSummary} złotych`;
    } else {
      //zaokrąglam konwertując na numer tylko gdy podsumowanie ma jakieś grosze
      if (
        (earningsSummary % 1 !== 0 && earningsSummary > 1) ||
        1 > earningsSummary < 1
      ) {
        earningsSummary = parseFloat(earningsSummary.toFixed(2));
      }
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
  if (earnings.length === 0 && expenses.length === 0) {
    moneyLeft.textContent =
      "Nie ma podano jeszcze żadnych przychodów, ani wydatków, ale możesz dodać i miej finanse pod kontrolą!";
    return;
  } else if (toSpent < 0) {
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

//initialVarSet();
refreshView();

function deleteItem(type, index) {
  type.splice(index, 1);
  refreshView();
}
// dodaj wydatek
document.getElementById("addNewExpense").addEventListener("click", function () {
  const expenseName = document.getElementById("newExpenseName").value;
  const expenseValue = Number(document.getElementById("newExpenseValue").value);
  console.log(expenses);
  addItem(expenses, expenseName, expenseValue);
});
// dodaj zarobek
document.getElementById("addNewEarning").addEventListener("click", function () {
  const earningName = document.getElementById("newEarningName").value;
  const earningValue = Number(document.getElementById("newEarningValue").value);
  addItem(earnings, earningName, earningValue);
});
function edititem(type, index, listName) {
  //alert("Nowa nazwa będzie musiała mieć minimum 3 znaki, a kwota 1 grosz");
  function saveChanges(type, index, newEarningName, newValue) {
    if (newEarningName.length < 3) {
      alert("nazwa jest zbyt krótka");
      return;
    } else if (newValue < 0.01) {
      alert("kwota jest zbyt mała");
      return;
    }
    type[index].name = newEarningName;
    type[index].value = parseFloat(newValue.replace(",", "."));
    li.innerHTML = `${index + 1}. ${type[index].name} - ${type[index].value}`;
    refreshView();
  }
  const li = document.getElementById(`li_${listName}_${index}`);
  li.innerHTML = `<input type="text" id="edit-input_name_${listName}_${index}" value="${type[index].name}">
<input type="text" id="edit-input_value_${listName}_${index}" value="${type[index].value}">
<button class="btn-success" id="save_${listName}_${index}">Zapisz</button>
<button class="btn-warning" id="cancel_${listName}_${index}">Anuluj</button>`;

  document
    .getElementById("save_" + listName + "_" + index)
    .addEventListener("click", function () {
      let changedName = document.getElementById(
        "edit-input_name_" + listName + "_" + index
      ).value;
      let changedValue = document.getElementById(
        "edit-input_value_" + listName + "_" + index
      ).value;
      saveChanges(type, index, changedName, changedValue);
    });
  document
    .getElementById("cancel_" + listName + "_" + index)
    .addEventListener("click", function () {
      refreshView();
    });
}
function addItem(type, name, value) {
  console.log({ type, name, value });
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
