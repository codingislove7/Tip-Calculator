// select Button to add text
const btn = document.querySelector(".add");
// select input to get text
const input = document.querySelector("input");
// select For to get text
const forInput = document.querySelector(".forInput");
// select percent to get value
const percent = document.querySelector(".percent");
// select range value
const range = document.querySelector("#customRange2");

// answer
const answer = document.querySelector(".answer");
// answer value
const answerValue = Number(answer.innerText);
// select ul to add text
let ul = document.querySelector("ul");

// listen to click on button to add text to the list
btn.addEventListener("click", addToList);
// listen to Enter key on input to add text to the list
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    // code for enter
    addToList();
  }
});
forInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    // code for enter
    addToList();
  }
});
// add text to the list
function addToList() {
  // create li tag
  let li = document.createElement("li");
  //Percent value
  const percentValue = parseInt(percent.innerText, 10);

  //Price value
  const PriceValue = Number(input.value);
  // calculate percent
  const Answer = separate(((percentValue / 100) * PriceValue).toFixed(1));
  // get time
  const today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let text = date + " $" +separate(Answer)+ " for " + forInput.value;

  console.log(forInput.value);
  // create a text node from input value
  let textB = document.createTextNode(text);

  // add the text to li tag
  li.appendChild(textB);
  // add bootstrap class to li tag
  li.classList.add(
    "list-group-item",
    "border",
    "my-1",
    "border-light",
    "bg-secondary",
    "bg-gradient"
  );

  // 1. Create the  Delete button
  const remove = document.createElement("button");
  remove.classList.add("btn", "btn-light", "float-right");
  remove.innerHTML = "Delete";

  // 2. Append to list
  li.appendChild(remove);

  // 3. Add event handler
  remove.addEventListener("click", function () {
    this.parentNode.remove();
    localStorage.setItem("listItems", ul.innerHTML);
  });

  // check to input value is not empty
  if (input.value !== "" && forInput.value !== "") {
    answer.innerText = Answer;
    // add li to ul tag
    ul.appendChild(li);
    // clear the input value to add more text
    input.value = "";
    forInput.value = "";
  } else if (input.value !== "" && forInput.value == "") {
    // focus in input to user enter a text
    forInput.focus();
  } else if (input.value == "" && forInput.value !== "") {
    // focus in input to user enter a text
    input.focus();
  } else {
    input.focus();
  }

  // Save the list to localStorage
  localStorage.setItem("listItems", ul.innerHTML);
}
// Check for saved list items
var saved = localStorage.getItem("listItems");

// If there are any saved items, update our list
if (saved) {
  ul.innerHTML = saved;
}

// Add event listener to delete and Done button
// select the buttons
const remove = document.querySelectorAll(".btn-light");
// 3. Add event handler
remove.forEach((e) => {
  e.addEventListener("click", function () {
    this.parentNode.remove();
    // Save the list to localStorage
    localStorage.setItem("listItems", ul.innerHTML);
  });
});

//update range percent
range.addEventListener("mousemove", () => {
  percent.innerText = range.value + " %";
});

function separate(Number) {
  Number += "";
  Number = Number.replace(",", "");
  x = Number.split(".");
  y = x[0];
  z = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
  return y + z;
}
