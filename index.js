let expression = "";

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
      if (result !== Infinity && result !== -Infinity) {
        if (result.toString().length >= 11) {
          result = result.toFixed(3);
        }
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

    switch (box_num) {
      case 1:
        if (expression.length)
          expression = expression.slice(0, expression.length - 1);
        break;
      case 2:
        expression += "(";
        break;
      case 3:
        expression += ")";
        break;
      case 4:
        expression += "÷";
        break;
      case 5:
        expression += "7";
        break;
      case 6:
        expression += "8";
        break;
      case 7:
        expression += "9";
        break;
      case 8:
        expression += "x";
        break;
      case 9:
        expression += "4";
        break;
      case 10:
        expression += "5";
        break;
      case 11:
        expression += "6";
        break;
      case 12:
        expression += "+";
        break;
      case 13:
        expression += "1";
        break;
      case 14:
        expression += "2";
        break;
      case 15:
        expression += "3";
        break;
      case 16:
        expression += "-";
        break;
      case 17:
        expression += "0";
        break;
      case 18:
        expression += ".";
        break;
      case 19:
        evaluate();
        break;
    }
    $(".literals").text(expression);
  });
});
