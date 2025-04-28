import {
  transactions,
  removeTranctionFn,
  addTranctionFn,
  total,
  calculateTotalFn,
} from "./script.js";

// init
const addTransactionBox = document.querySelector("#addTransactionBox");

const toggleAddTransactionBox = document.querySelector(
  "#toggleAddTransactionBox"
);

const addTransactionBtn = document.querySelector("#addTransactionBtn");

const removeTransactionBtn = document.querySelector("#removeTransactionBtn");

// event listeners
toggleAddTransactionBox.addEventListener("click", () => {
  addTransactionBox.classList.toggle("hidden");
});

addTransactionBtn.addEventListener("click", () => {
  const transactionType = document.querySelector(
    "input[name='transactionType']:checked"
  )?.value;

  const descriptionInput = document.querySelector("#descriptionInput").value;
  const amountInput = document.querySelector("#amountInput").value;

  const transaction = {
    id: Date.now(),
    description: descriptionInput,
    type: transactionType,
    amount: Number(amountInput),
  };

  try {
    addTranctionFn(transaction);
    showTotal();
    renderTransaction();
    document.querySelector("#descriptionInput").value = "";
    document.querySelector("#amountInput").value = "";
    addTransactionBox.classList.toggle("hidden");
  } catch (error) {
    alert(error.message);
  }
});

// functions

removeTransactionBtn.addEventListener("click", () => {
  const index = document.querySelector("#indexInput").value;
  try {
    removeTranctionFn(index);
    showTotal();
    renderTransaction();
    document.querySelector("#indexInput").value = "";
  } catch (error) {
    alert(error.message);
  }
});

function showTotal() {
  calculateTotalFn();
  const showIncome = document.querySelector("#showIncome");
  const showExpense = document.querySelector("#showExpense");
  const showBalance = document.querySelector("#showBalance");

  showIncome.innerHTML = "R" + total.income;
  showExpense.innerHTML = "R" + total.expense;
  showBalance.innerHTML = "R" + total.balance;
}

function renderTransaction() {
  const showTransactions = document.querySelector("#showTransactions");
  showTransactions.innerHTML = "";

  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];

    showTransactions.innerHTML += `
     <div class="flex gap-4 items-center p-4 shadow-sm">
                <button
                    class="border-2 text-white border-blue-400 p-1 rounded-md hover:bg-blue-600 hover:border-blue-600 hover:text-white cursor-pointer">
                    <i class="bi bi-pen text-xl"></i>
                </button>
                <div class="flex-1 text-white truncate">
                    ${t.description}
                </div>
                <div class="flex-1 text-white truncate">
                    ${t.type}
                </div>
                <div class="font-bold text-white text-lg">R${t.amount}</div>
                <button
                    class="border-2 text-white border-blue-400 p-1 rounded-md hover:bg-blue-700 hover:border-blue-700 hover:text-white cursor-pointer">
                    <i class="bi bi-trash3 text-xl"></i>
                </button>
            </div>
    `;
  }
}

showTotal();
renderTransaction();
