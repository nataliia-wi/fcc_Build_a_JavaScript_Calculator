// import { useState } from 'react';
// import './App.css';

//  function App() {
// const [display, setDisplay] = useState("0");
// const [lastInputWasOperator, setLastInputWasOperator] = useState(false); // Відстежуємо, чи був оператор останнім введеним символом

// const handleNumberClick =(symbol) => {
// console.log(symbol);
// if (display === "0") {
//   setDisplay(symbol)
// } else {
//   setDisplay(display + symbol)
// }
// }

// const handleOperatorClick = (symbol)=> {
//   setLastInputWasOperator(true);
// if (lastInputWasOperator) {
//   setDisplay(display.slice(0, -2) + symbol);
// }else {
//   setDisplay(`${display} ${symbol} `);
// }
// }
// const handleEqualsClick = ()=> {
//   setDisplay(eval(display));
//   setLastInputWasOperator(false);
// }
// const handleDecimalClick = ()=> {
//   const array = display.split(" ")
//   console.log(array);
//   const lastElement = array[array.length-1];
//   console.log(lastElement);
//   if (!lastElement.includes('.') && !isNaN(parseInt(lastElement))) {
//     setDisplay((prev) => {
//       console.log(prev);
//      return prev + '.'});
//     }
// }

// const handleNegativeClick = () => {
//   if (display) {
//  setDisplay((prev) => `-${prev}`);
// }
// }

// const handleClear = () => {
//   setDisplay("0");
// }
// return (
//       <div className="App">
//         <div className='h1'>
//           <h1>JavaScript Calculator</h1>
//         </div>
//         <div className="calculator">
//         <div id="display">{display}</div>
//           <button className="light-gray" onClick={handleClear} id="clear">AC</button>
//           <button className="light-gray" onClick={() => handleNegativeClick('negative')} id="negative">+/-</button>
//           <button className="light-gray" id="percentage">%</button>
//           <button className="yellow" onClick={() => handleOperatorClick('/')} id="divide">/</button>
//           <button className='dark-gray' onClick={() => handleNumberClick('7')} id="seven">7</button>
//           <button className='dark-gray' onClick={() => handleNumberClick('8')} id="eight">8</button>
//           <button className='dark-gray' onClick={() => handleNumberClick('9')} id="nine">9</button>
//           <button className='yellow'onClick={() => handleOperatorClick('*')} id="multiply">*</button>
//           <button className='dark-gray' onClick={() => handleNumberClick('4')} id="four">4</button>
//           <button className='dark-gray' onClick={() => handleNumberClick('5')} id="five">5</button>
//           <button className='dark-gray' onClick={() => handleNumberClick('6')} id="six">6</button>
//           <button className='yellow' onClick={() => handleOperatorClick('-')} id="subtract">-</button>
//           <button className='dark-gray' onClick={() => handleNumberClick('1')} id="one">1</button>
//           <button className='dark-gray' onClick={() => handleNumberClick('2')} id="two">2</button>
//           <button className='dark-gray' onClick={() => handleNumberClick('3')} id="three">3</button>
//           <button className='yellow' onClick={() => handleOperatorClick('+')} id="add">+</button>
//           <button className='dark-gray' onClick={() => handleNumberClick('0')} id="zero">0</button>
//           <button className='dark-gray' onClick={handleDecimalClick} id="decimal">.</button>
//           <button className='yellow' onClick={handleEqualsClick} id="equals">=</button>
//         </div>
//       </div>
//     );
//  }
// export default App;

import { useState } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState("0");
  const [lastInputWasOperator, setLastInputWasOperator] = useState(false);
  const [isEvaluated, setIsEvaluated] = useState(false);

  const calculate = (expression) => {
    try {
      return parseFloat(new Function('return ' + expression)().toFixed(10));
    } catch (e) {
      return "Error";
    }
  };

  const handleNumberClick = (symbol) => {
    if (isEvaluated) {
      setDisplay(symbol);
      setIsEvaluated(false);
    } else if (display === "0") {
      setDisplay(symbol);
    } else {
      setDisplay(display + symbol);
    }
    setLastInputWasOperator(false);
  };

  const handleOperatorClick = (symbol) => {
    setDisplay(`${display} ${symbol} `);
    // if (isEvaluated) {
    //   setIsEvaluated(false);
    //   setDisplay(display + ' ' + symbol + ' ');
    // } else if (lastInputWasOperator) {
    //   if (symbol === '-' && display[display.length - 2] !== '-') {
    //     setDisplay(display + ' ' + symbol);
    //   } else {
    //     setDisplay(display.slice(0, -2) + symbol);
    //   }
    // } else {
    //   setDisplay(`${display} ${symbol} `);
    // }
    // setLastInputWasOperator(true);
  };


  const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol)
  }


  const handleEqualsClick = () => {
// якщо останній символ виразу - оператор, функція нічого не робить
if (isOperator(display.trim().charAt(display.trim().length - 1))) return;

// Розбиває вираз на окремі частини, використовуючи пробіли як роздільники.
const parts = display.trim().split(" ");
const newParts = [];

// Перебираємо всі частини з кінця до початку
for (let i = parts.length - 1; i >= 0; i--) {
  // Якщо частина є оператором і попередня також оператор, залишаємо тільки останній оператор
  if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
    newParts.unshift(parts[i]);

    // Пропускаємо всі зайві оператори
    let j = 0;
    let k = i - 1;
    while (isOperator(parts[k])) {
      k--;
      j++;
    }
    i -= j;
  } else {
    // Додаємо частину до нового списку, якщо вона не є зайвим оператором
    newParts.unshift(parts[i]);
  }
}

// Створюємо новий вираз, об'єднуючи коректно відфільтровані частини
const newExpression = newParts.join(" ");

// Якщо перший символ нового виразу - оператор, додаємо його до існуючого результату
if (isOperator(newExpression.charAt(0))) {
  setDisplay(eval(display + newExpression));
} else {
  // Використовуємо eval для обчислення виразу і записуємо результат в state
  setDisplay(eval(newExpression));
}

// Очищаємо вираз після обчислення
// setExpression("");

    // const result = calculate(display);
    // setDisplay(result.toString());
    // setIsEvaluated(true);
    // setLastInputWasOperator(false);
  };

  const handleDecimalClick = () => {
    const array = display.split(" ");
    const lastElement = array[array.length - 1];
    if (!lastElement.includes('.') && !isNaN(parseInt(lastElement))) {
      setDisplay(display + '.');
    }
  };

  const handleNegativeClick = () => {
    const array = display.split(" ");
    const lastElement = array[array.length - 1];
    
    if (!isNaN(parseFloat(lastElement))) {
      array[array.length - 1] = lastElement.startsWith('-')
        ? lastElement.slice(1)
        : '-' + lastElement;

      setDisplay(array.join(" "));
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setLastInputWasOperator(false);
    setIsEvaluated(false);
  };

  return (
    <div className="App">
      <div className='h1'>
        <h1>JavaScript Calculator</h1>
      </div>
      <div className="calculator">
        <div id="display">{display}</div>
        <button className="light-gray" onClick={handleClear} id="clear">AC</button>
        <button className="light-gray" onClick={handleNegativeClick} id="negative">+/-</button>
        <button className="light-gray" id="percentage">%</button>
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
}

export default App;



//   const handleNumberClick = (number) => {
//     if (isEvaluated) {
//       setInput(number);
//       setIsEvaluated(false);
//       setExpression(number); // Якщо було завершено обчислення, починаємо новий вираз
//     } else {
//       if (input === '0') {
//         setInput(number);
//         setExpression(expression + number); // Додаємо число до виразу
//       } else {
//         setInput(input + number);
//         setExpression(expression + number); // Додаємо число до виразу
//       }
//     }
//   };

//   const handleOperatorClick = (nextOperator) => {
//     if (isEvaluated) {
//       setPreviousInput(input);
//       setOperator(nextOperator);
//       setIsEvaluated(false);
//       setExpression(input + nextOperator); // Починаємо новий вираз з результатом попереднього обчислення
//     } else {
//       if (operator) {
//         const result = evaluate();
//         setInput(result);
//         setPreviousInput(result);
//         setExpression(result + nextOperator); // Оновлюємо вираз після обчислення
//       } else {
//         setPreviousInput(input);
//         setExpression(expression + nextOperator); // Додаємо оператор до виразу
//       }
//       setOperator(nextOperator);
//     }
//   };

//   const handleDecimalClick = () => {
//     if (isEvaluated) {
//       setInput('0.');
//       setIsEvaluated(false);
//       setExpression('0.'); // Починаємо новий вираз з 0.
//     } else if (!input.includes('.')) {
//       setInput(input + '.');
//       setExpression(expression + '.'); // Додаємо десяткову крапку до виразу
//     }
//   };

//   const handleEqualsClick = () => {
//     if (previousInput && operator) {
//       const result = evaluate();
//       setInput(result);
//       setPreviousInput('');
//       setOperator(null);
//       setIsEvaluated(true);
//       setExpression(expression + ' = ' + result); // Додаємо результат до виразу
//     }
//   };

//     // Округлюємо результат до 10 знаків після коми для уникнення проблем з точністю
//     return result.toFixed(10).toString();
//   };
  

// function App() {
//   const [expression, setExpression] = useState(''); // Вираз, що вводиться користувачем
//   const [result, setResult] = useState('0'); // Результат обчислень
//   // const et = expression.trim();

//   const isOperator = (symbol) => {
//     return /[*/+-]/.test(symbol)
//   }

//   // Функція для обробки натискань на кнопки
//   const buttonPress = (button) => {
//     console.log(button);
//     if (button === 'clear') {
//       // Очищення екрану, скидаємо вираз та результат
//       setExpression('');
//       setResult('0');
//     } else if (button === '=') {
//       try {
//         // Використовуємо eval для обчислення виразу
//         const evaluatedResult = eval(expression.trim()); // eval обчислює рядок як математичний вираз
//         // const computingResult = computing()
//         setResult(evaluatedResult.toString());
//         setExpression(evaluatedResult.toString()); // Оновлюємо вираз результатом для подальших обчислень
//       } catch (error) {
//         setResult('Error'); // Якщо вираз не коректний, показуємо помилку
//       }
//     } else if (button === 'negative') {
//       // Зміна знаку поточного числа
//       if (expression === "") return;
//       setResult(
//         expression.toString().charAt(0) === "-" ? expression.slice(1) : "-" + expression
//       )
//       // if (expression) {
//       //   setExpression((prev) => `-${prev}`);
//       // }
//     } else if (button === 'percentage') {
//       if (expression === "") return;
//       // Розрахунок відсотка
//       if (expression) {
//         const percentageValue = eval(expression.trim()) / 100; // Вираховуємо відсоток
//         setExpression(percentageValue.toString());
//         setResult(percentageValue.toString());
//       }
//     } else if (isOperator(button)) {
//       setExpression(expression.trim() + " " + button + " ")
//     }
//     else if (button === '0' && expression === '0') {
//       // Заборона на введення кількох початкових нулів
//       return;
//     }
//     else if (button === '.') {
//       // Розділяємо вираз по операторам (+, -, *, /), щоб перевірити лише поточне число
//       const parts = expression.split(/[-+/*]/g).pop();
//       const currentNumber = parts[parts.length - 1];

//       // Додаємо десяткову точку тільки якщо в поточному числі її ще немає
//       if (!currentNumber.includes('.')) {
//         setExpression((prev) => prev + '.');
//       }
//     } else {
//       if (expression.charAt(0) === "0") {
//         setExpression(expression.slice(1) + button);
//       } else {
//         setExpression(expression + button);
//       };
//     }
//   };



//         <div id="display" className="row">
//           {expression || result} {/* Виводимо вираз або результат */}
//         </div>
//         <button className="light-gray row" onClick={() => buttonPress('clear')} id="clear">AC</button>
//         <button className="light-gray" onClick={() => buttonPress('negative')} id="negative">+/-</button>
//         <button className="light-gray" onClick={() => buttonPress('percentage')} id="percentage">%</button>
//         <button className="yellow" onClick={() => buttonPress('/')} id="divide">/</button>
//         <button className='dark-gray' onClick={() => buttonPress('7')} id="seven">7</button>
//         <button className='dark-gray' onClick={() => buttonPress('8')} id="eight">8</button>
//         <button className='dark-gray' onClick={() => buttonPress('9')} id="nine">9</button>
//         <button className='yellow' onClick={() => buttonPress('*')} id="multiply">*</button>
//         <button className='dark-gray' onClick={() => buttonPress('4')} id="four">4</button>
//         <button className='dark-gray' onClick={() => buttonPress('5')} id="five">5</button>
//         <button className='dark-gray' onClick={() => buttonPress('6')} id="six">6</button>
//         <button className='yellow' onClick={() => buttonPress('-')} id="subtract">-</button>
//         <button className='dark-gray' onClick={() => buttonPress('1')} id="one">1</button>
//         <button className='dark-gray' onClick={() => buttonPress('2')} id="two">2</button>
//         <button className='dark-gray' onClick={() => buttonPress('3')} id="three">3</button>
//         <button className='yellow' onClick={() => buttonPress('+')} id="add">+</button>
//         <button className='dark-gray' onClick={() => buttonPress('0')} id="zero">0</button>
//         <button className='dark-gray' onClick={() => buttonPress('.')} id="decimal">.</button>
//         <button className='yellow' onClick={() => buttonPress('=')} id="equals">=</button>

