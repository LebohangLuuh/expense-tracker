import {
  transactions,
  removeTranctionFn,
  addTranctionFn,
  total,
  calculateTotalFn,
} from "../js/script.js";

// mock data

const t1 = { id: 1, description: "salary", type: "income", amount: 10 };
const t2 = { id: 2, description: "rent", type: "expense", amount: 2 };
const t3 = { id: 3, description: "transport", type: "expense", amount: 3 };

// before each test

beforeEach(() => {
  transactions[0] = t1;
  transactions[1] = t2;
  transactions[2] = t3;
});

// after each test

afterEach(() => {
  transactions.length = 0;
});

// transactions array
describe("[transactions]", () => {
  test("should valid array", () => {
    expect(transactions).toBeDefined();
    expect(Array.isArray(transactions)).toBeTruthy();
    expect(typeof transactions).toBe("object");
  });
});

// remove transaction function

describe("[removeTranctionFn]", () => {
  test("should be a valid function", () => {
    expect(removeTranctionFn).toBeDefined();
    expect(typeof removeTranctionFn).toBe("function");
  });

  test("given a invalid index, it should throw an error", () => {
    const index = -1;
    expect(() => removeTranctionFn(index)).toThrow(/^Invalid index$/);
  });

  test("given a valid index, it remove an element from transactions", () => {
    const index = 0;
    removeTranctionFn(index);

    expect(transactions.length).toBe(2);
    expect(transactions[index]).toBe(t2);
    expect(transactions[transactions.length - 1]).toBe(t3);
  });
});

// add a new transaction function

describe("[addTranctionFn]", () => {
  test("should be a valid function", () => {
    expect(addTranctionFn).toBeDefined();
    expect(typeof addTranctionFn).toBe("function");
  });

  test("given an invalid transaction, it should throw an error", () => {
    const transaction = {
      id: 1,
      description: "Salary",
      type: "expe",
      amount: 10,
    };

    expect(() => addTranctionFn(transaction)).toThrow();
  });

  test("given a valid transaction, it should add a new transaction to transactions array", () => {
    const transaction = {
      id: 4,
      description: "groceries",
      type: "expense",
      amount: 4,
    };

    addTranctionFn(transaction);

    expect(transactions.length).toBe(4);
    expect(transactions[transactions.length - 1]).toBe(transaction);
  });
});

// total

describe("[total]", () => {
  test("a valid total is required ", () => {
    expect(total).toBeDefined();
    expect(typeof total.balance).toBe("number");
    expect(typeof total.income).toBe("number");
    expect(typeof total.expense).toBe("number");

    expect(total.balance).toBe(0);
    expect(total.income).toBe(0);
    expect(total.expense).toBe(0);
  });
});

// calculate total

describe("[calculateTotalFn]", () => {
  test("should a valid function", () => {
    expect(calculateTotalFn).toBeDefined();
    expect(typeof calculateTotalFn).toBe("function");
  });

  test("should calculate total", () => {
    calculateTotalFn();

    expect(total.income).toBe(10);
    expect(total.expense).toBe(5);
    expect(total.balance).toBe(5);
  });

  test("should throw an error when balance is less than 0", () => {
    let balance = -10;  
    expect(() => calculateTotalFn()).toThrow();
  })
});
