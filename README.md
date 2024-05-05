# WebCalc

A basic web-based calculator with computation history - written in JavaScript, HTML, and CSS.

## Requirements & Constraints

_The following requirements and constraints were listed along with the assignment._

The calculator itself should behave as all basic calculators do (e.g., you may want to include a `+/-` button to change the sign of a value). There is a `C` button that will reset the state of the calculator to start a new calculation. Input to the calculator can be provided either by pressing the buttons or by typing numbers (including decimal numbers) into the calculation text field.

There will also be a clickable "history" list in your app that will record values of intermediate computations for later use. An entry will be created in the following situations:

* **When you press the = button after a calculation.** For example, with the sequence of buttons `1 + 2 =` on a new calculation the list will have a new entry with value 3. But pressing the `=` button again will have no effect in this case until further calculations are performed.
* **When you press an operation button as part of a longer calculation.** For example, when performing a calculation with the sequence `1 + 1 + 1`, the second `+` will execute the first `1 + 1` with a partial result of `2`. This `2` should be added to the list. Note that pressing an operation button immediately after another operation button will override the previous operation selection. For example, these two sequences are equivalent:  `1 + 1` and `1 - + 1`.

Clicking on an element in the history list should serve as input to the calculator when it is in a state ready to accept a new number. These states are

* First input to a calculation when the calculator is launched or after pressing the `clear (C)" button.
* When waiting for the second operand of a calculation, but before any number has been entered via buttons or typing.

Clicking on list items will otherwise have no effect. There will also be a "Clear History" button that, as the name suggests, will remove all elements in the history list.

These are additional constraints your implementation must follow:

* You can place UI elements anywhere you want in your page. Just make sure it’s usable and intuitive.
* Use CSS to give your calculator a polished look.
* Valid input consists of only numbers and operations. Typed input should be restricted to valid characters (i.e., the calculator will ignore input that is not valid).
* Perform, at least, all basic arithmetic operations shown above, but you can implement others if you want.
* Handle invalid operations properly and display the word `Error` as the result when this happens (e.g., no printing NaN or Infinity). When the calculator is in an error state, the user must press `C` before it can be used again.
* You will have a single HTML file called `index.html`.
* Your CSS and JavaScript should be in external files. No embedded or inline CSS/JS.
* You can use CSS fonts if you would like. No other external JavaScript or CSS is allowed.
* Use of `eval()` is not allowed. Parsing arithmetic expressions is not required, and attempting to do so will make your implementation harder. See test cases below.
* Use flexbox or CSS grid as appropriate to construct the layout of your calculator. Do not use a `<table>` for layout.
