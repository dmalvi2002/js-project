/**
 * DONE: Update the text in the "Formatted Text" section as a user types in the textarea
 * DONE: Add a .bold, .italic classes to "Formatted Text" when the appropriate button is clicked
 * DONE: Add an .underline class to "Formatted Text" when Underline button is clicked
 * TODO: Toggle the align style for "Formatted Text" when the appropriate button is clicked
 */
// Selectors
const textInput = document.getElementById("text-input");
const textOutput = document.getElementById("text-output");
const btnBold = document.getElementById("bold");
const btnItalic = document.getElementById("italic");
const btnUnderline = document.getElementById("underline");
const btnLeft = document.getElementById("left-align");
const btnCenter = document.getElementById("center-align");
const btnRight = document.getElementById("right-align");

// Event listeners
textInput.addEventListener("input", updateText);
btnBold.addEventListener("click", makeBold);
btnItalic.addEventListener("click", makeItalic);
btnUnderline.addEventListener("click", makeUnderline);
/**
 * Update the output text as a user types in the textarea
 * HINT: Use the onkeydown function inside HTML
 */
function updateText() {
  // CODE GOES HERE
  textOutput.innerText = textInput.value;
}

/**
 * Toggle the bold class for the output text
 * HINT: Use the onclick function insite HTML
 * HINT: Look into using this keyword
 * HINT: Use the classList property
 * HINT: Toggle .active class for the button
 */
function makeBold() {
  textOutput.classList.toggle("bold");
  btnBold.classList.toggle("active");
}

/**
 * Toggle the italic class for the output text
 */
function makeItalic() {
  textOutput.classList.toggle("italic");
  btnItalic.classList.toggle("active");
}

/**
 * Toggle the underline class for the output text
 * HINT: Toggle the .active class for the button
 * HINT: Use the classList property
 * HINT: Use contains, remove, and add functions
 */
function makeUnderline() {
  //CODE GOES HERE
  textOutput.classList.toggle("underline");
  btnUnderline.classList.toggle("active");
}

/**
 * Toggle the style textAlign attribute
 * Toggle the active state for the align butttons
 * HINT: Use the style property of the element
 * HINT: Make sure to untoggle the active state for all other align buttons
 */
function alignText(elem, alignType) {
  // CODE GOES HERE
}
