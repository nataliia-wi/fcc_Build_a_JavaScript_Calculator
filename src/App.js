import { useState } from 'react';
import './App.css';

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("0");

  const isOperator = (symbol) => {
    return /[-+/*]/.test(symbol);
  };

  const handleClear = () => {
    setAnswer("");
    setExpression("0");
  }

  const handlePercentageClick = () => {
    if (answer === "") return;
    setAnswer((parseFloat(answer) / 100).toString());
  }

  const handleOperatorClick = (symbol) => {
    setExpression(expression.trim() + " " + symbol + " ");
  }

  const handleNumberClick = (symbol) => {
    if (expression.charAt(0) === "0") {
      setExpression(expression.slice(1) + symbol);
    } else {
      setExpression(expression + symbol);
    }
  }

  const handleDecimalClick = (symbol) => {
    // const array = expression.trim().split(" ");
    // const lastElement = array[array.length - 1];
    // if (!lastElement.includes('.') && !isNaN(parseInt(lastElement))) {
    //   setExpression(expression + symbol);
    // }

    const lastNumber = expression.split(/[-+/*]/g).pop();
    if (!lastNumber) return;
    console.log("lastNumber :>> ", lastNumber);
    // if last number already has a decimal, don't add another
    if (lastNumber?.includes(".")) return;
    setExpression(expression + '.');
  }

  const handleEqualsClick = () => {
    if (isOperator(expression.trim().charAt(expression.trim().length - 1))) return;
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = expression.trim().split(" ");
    const newParts = [];

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression));
    } else {
      setAnswer(eval(newExpression));
    }
    setExpression("");
  }

  const handleNegativeClick = () => {
    if (answer === "") return;
    setAnswer(
      answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
    );
  }

  return (
    <div className="App">
      <div className='h1'>
        <h1>JavaScript Calculator</h1>
      </div>
      <div className="calculator">
        <div id="display">{answer || expression}</div>
        <button className="light-gray" onClick={handleClear} id="clear">AC</button>
        <button className="light-gray" onClick={handleNegativeClick} id="negative">+/-</button>
        <button className="light-gray" onClick={handlePercentageClick} id="percentage">%</button>
        <button className="yellow" onClick={() => handleOperatorClick('/')} id="divide">/</button>
        <button className='dark-gray' onClick={() => handleNumberClick('7')} id="seven">7</button>
        <button className='dark-gray' onClick={() => handleNumberClick('8')} id="eight">8</button>
        <button className='dark-gray' onClick={() => handleNumberClick('9')} id="nine">9</button>
        <button className='yellow' onClick={() => handleOperatorClick('*')} id="multiply">*</button>
        <button className='dark-gray' onClick={() => handleNumberClick('4')} id="four">4</button>
        <button className='dark-gray' onClick={() => handleNumberClick('5')} id="five">5</button>
        <button className='dark-gray' onClick={() => handleNumberClick('6')} id="six">6</button>
        <button className='yellow' onClick={() => handleOperatorClick('-')} id="subtract">-</button>
        <button className='dark-gray' onClick={() => handleNumberClick('1')} id="one">1</button>
        <button className='dark-gray' onClick={() => handleNumberClick('2')} id="two">2</button>
        <button className='dark-gray' onClick={() => handleNumberClick('3')} id="three">3</button>
        <button className='yellow' onClick={() => handleOperatorClick('+')} id="add">+</button>
        <button className='dark-gray' onClick={() => handleNumberClick('0')} id="zero">0</button>
        <button className='dark-gray' onClick={handleDecimalClick} id="decimal">.</button>
        <button className='yellow' onClick={handleEqualsClick} id="equals">=</button>
      </div>
    </div>
  );
} export default App;