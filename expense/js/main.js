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
                    class="border-4 text-zinc-400 border-orange-200 p-1 rounded-md hover:bg-orange-200 hover:text-zinc-900 cursor-pointer">
                    <i class="bi bi-pen text-2xl"></i>
                </button>
                <div class="flex-1 truncate">
                    ${t.description}
                </div>
                <div class="font-bold text-lg">R${t.amount}</div>
                <button
                    class="border-4 text-zinc-400 border-rose-300 p-1 rounded-md hover:bg-rose-300 hover:text-zinc-900 cursor-pointer">
                    <i class="bi bi-trash3 text-2xl"></i>
                </button>
            </div>
    `;
  }
}

showTotal();
renderTransaction();
