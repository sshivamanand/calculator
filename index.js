let expression = "";
const buttonValues = [
  null,
  null,
  "(",
  ")",
  "÷",
  "7",
  "8",
  "9",
  "x",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
];

$(document).ready(() => {
  function evaluate() {
    let new_exp = "";

    for (let i = 0; i < expression.length; i++) {
      if (expression[i] === "x") {
        new_exp += "*";
      } else if (expression[i] === "÷") {
        new_exp += "/";
      } else {
        new_exp += expression[i];
      }
    }
    expression = new_exp;

    let arr = expression.split("");
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] === "(") {
        if (
          arr[i - 1] !== "+" &&
          arr[i - 1] !== "-" &&
          arr[i - 1] !== "*" &&
          arr[i - 1] !== "/" &&
          arr[i - 1] !== "("
        ) {
          arr.splice(i, 0, "*");
        }
      }
    }

    expression = arr.join("");

    try {
      let result = eval(expression);

      if (result !== Infinity || result !== -Infinity) {
        if (result.toString().length >= 10 && (result % 1 !== 0)) {
          result = result.toFixed(3);
          expression = result.toString();
        } else if (result.toString().length >= 10 && (result % 1 === 0)) {
          result = result.toExponential(1);
          expression = result.toString();
        } else {
          setTimeout(() => {
            $(".literals").html("Infinity");
            setTimeout(() => {
              $(".literals").html("");
            }, 1500);
          }, 1);
          expression = "";
        }
      }
    } catch (error) {
      setTimeout(() => {
        $(".literals").html("Error");
        setTimeout(() => {
          $(".literals").html("");
        }, 1500);
      }, 1);
      expression = "";
    }

    $(".literals").text(expression);
  }

  $(".calculator div:not(.display)").on("click", function () {
    $(this).addClass("pressed");
    setTimeout(() => {
      $(this).removeClass("pressed");
    }, 50);

    let box = $(this).attr("class").split(" ")[0];
    let box_num = parseInt(box.replace("box", ""));

    if (box_num === 1) {
      if (expression.length) {
        expression = expression.slice(0, expression.length - 1);
      }
    } else if (box_num === 19) {
      evaluate();
    } else {
      expression += buttonValues[box_num];
    }
    $(".literals").text(expression);
  });
});
