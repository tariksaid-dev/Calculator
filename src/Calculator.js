import { SESSIONSTORAGE_KEY } from "./constants";
import { getFromSession, saveInSession } from "./utils";

export class Calculator {
  constructor(screen, ansScreen) {
    this.screen = screen;
    this.ansScreen = ansScreen;
    this.response = {
      exp: "",
      result: "",
    };
  }

  /**
   * Calculates the factorial of a non-negative integer.
   * @param {number} num The number for which the factorial will be calculated.
   * @returns {number} The result of the factorial calculation.
   */
  factorialResolve(num) {
    var result = num;
    if (num === 0 || num === 1) return 1;
    while (num > 1) {
      num--;
      result *= num;
    }
    return result;
  }

  /**
   * Parses a string to find a number preceding the factorial symbol '!' and extracts it.
   * @param {string} str The string to search for the factorial number.
   * @returns {number | null} The extracted number or null if not found.
   */
  parseFactorialNumber(str) {
    const regex = /(\d+)!/;
    const matches = str.match(regex);

    if (matches && matches[1]) {
      return matches[1]; // 5
    }
    return null;
  }

  /**
   * Parses a mathematical expression to find and resolve factorial expressions represented by the '!' symbol.
   */
  parseFactorial() {
    let exp = this.response.exp;

    while (exp.includes("!")) {
      exp = exp.replace(
        this.parseFactorialNumber(exp).concat("!"),
        this.factorialResolve(this.parseFactorialNumber(exp))
      );
    }
    this.response.result = exp;
  }

  /**
   * Resolves the mathematical expression, considering factorial calculations if present, and updates the Calculator's response accordingly.
   * Also, stores the result in session storage.
   */
  resolve() {
    this.update();
    if (this.response.exp.includes("!")) {
      this.parseFactorial();
    }
    try {
      if (!this.response.exp.includes("!")) {
        this.response.result = eval(this.response.exp);
        this.screen.value = this.response.result;
      }
    } catch (error) {
      this.response.result = "ERR! CHECK SYNTAXIS";
    }
    this.ansScreen.value = "Ans =  " + this.response.result;
    saveInSession(SESSIONSTORAGE_KEY, this.response);
  }

  /**
   * Updates the Calculator's response object with the current mathematical expression from the input screen.
   */
  update() {
    this.response.exp = this.screen.value;
  }

  /**
   * Appends the last result from session storage to the input screen.
   */
  writeAns() {
    const lastResult = getFromSession(SESSIONSTORAGE_KEY).slice(-1)[0].result;
    this.screen.value += lastResult;
  }

  lastKeyPressed() {
    
  }
}
