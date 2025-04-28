const transactions = [];
const transactionTypes = ["income", "expense"];
const total = {
  balance: 0,
  income: 0,
  expense: 0,
};

// remove transaction function

function removeTranctionFn(index) {
  if (typeof index != "number" || index < 0 || index >= transactions.length) {
    throw new Error("Invalid index");
  }

  transactions.splice(index, 1);
}

// add a new transaction function

function addTranctionFn(transaction) {
  if (
    typeof transaction.description != "string" ||
    transaction.description.trim().length == 0 ||
    typeof transaction.amount != "number" ||
    transaction.amount <= 0 ||
    !transactionTypes.includes(transaction.type)
  ) {
    throw new Error("Invalid transaction");
  }

  transactions.push(transaction);
}

// calculate total

function calculateTotalFn() {
  let income = 0;
  let expense = 0;

  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];

    if (t.type === "income") {
      income += t.amount;
    }

    if (t.type === "expense") {
      expense += t.amount;
    }
  }

  total.income = income;
  total.expense = expense;

  if (total.income < total.balance) {
    throw new Error("you have Insuficient balance");
  }

  total.balance = income - expense;

}

export {
  transactions,
  removeTranctionFn,
  addTranctionFn,
  total,
  calculateTotalFn,
};
