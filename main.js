/**
 * @author Tarik Said
 * @description Crea una calculadora científica en JavaScript. Define una clase Calculadora con métodos para realizar operaciones matemáticas como suma, resta, multiplicación, división y operaciones avanzadas como raíz cuadrada y potenciación.
 */

import { PI, SESSIONSTORAGE_KEY } from "./src/constants";
import { Calculator } from "./src/Calculator";
import { getFromSession } from "./src/utils";

// DOM ELEMENTS
const screen = document.getElementById("screen");
const ansScreen = document.getElementById("ans-screen");
const history = document.getElementById("icon");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const allButtons = Array.from(document.getElementsByTagName("button"));

// OBJECT
const calc = new Calculator(screen, ansScreen);

/**
 * Imperative function that updates the screen based on the button pressed. Modifies the content if the button contains special characters.
 * @param {HTMLElement} btn The button that triggers the onClick action.
 */
function handleClick(btn) {
  switch (btn.textContent) {
    // FUNCTIONALITY
    case "AC":
      screen.value = "";
      break;
    case "C":
      screen.value = screen.value.substring(0, screen.value.length - 1);
      break;
    case "ANS":
      calc.writeAns();
      break;

    // MATH EXPRESSIONS
    case "cos":
      screen.value += "Math.cos(";
      break;
    case "log":
      screen.value += "Math.log(";
      break;
    case "tan":
      screen.value += "Math.tan(";
      break;
    case "sin":
      screen.value += "Math.sin(";
      break;
    case "√":
      screen.value += "Math.sqrt(";
      break;
    case "EXP":
      screen.value += " * 10 ** ";
      break;
    case "^":
      screen.value += "**";
      break;

    // CONSTANTS
    case "𝝅":
      screen.value += PI;
      break;

    // RESOLVE
    case "=":
      calc.resolve();
      break;

    // NUMBER IN SCREEN CASE
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
    case "(":
    case ")":
      if (
        // lastKeyPressed() -> guarda en session la última tecla pulsada y comprueba si es un igual y hace cosas
        (!isNaN(screen.value.slice(-1))) ||
        screen.value.slice(-1) === "!"
      ) {
        screen.value = btn.textContent;
      } else {
        screen.value += btn.textContent;
      }
      break;

    // PRINT
    default:
      screen.value += btn.textContent;
  }
}

// BUTTONS LISTENERS
allButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    handleClick(btn);
  });
});

// MODAL MANIPULATION & LISTENERS
history.addEventListener("click", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  if (modal.classList.contains("hidden")) {
    modal.classList.replace("hidden", "block");
  } else {
    modal.classList.replace("block", "hidden");
  }
  modal.style.left = `${x}px`;
  modal.style.top = `${y}px`;

  const sessionStorageData = getFromSession(SESSIONSTORAGE_KEY);

  if (!Array.isArray(sessionStorageData)) {
    if (typeof sessionStorageData === "object") {
      modalContent.innerHTML = "El historial aún no está listo";
    } else {
      modalContent.innerHTML = sessionStorageData;
    }
  } else {
    modalContent.innerHTML = sessionStorageData
      .map((el) => {
        return `<div class="flex items-center font-bold gap-2"><span class="font-bold px-4 py-2 border rounded-md bg-[#111827] border-[#4b5563] cursor-pointer">${el.exp}</span> = <span class="cursor-pointer font-bold px-4 py-2 border rounded-md bg-[#111827] border-[#4b5563]">${el.result}</span></div>`;
      })
      .join("");
  }
});

document.addEventListener("click", (e) => {
  if (e.target !== modal && e.target !== history && !modal.contains(e.target)) {
    modal.classList.contains("block") &&
      modal.classList.replace("block", "hidden");
  }
});

modalContent.addEventListener("click", (e) => {
  const target = e.target;
  screen.value = target.innerText;
});
