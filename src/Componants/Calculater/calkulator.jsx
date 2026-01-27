import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [memory, setMemory] = useState(0);
  const [isShift, setIsShift] = useState(false);
  const [isAlpha, setIsAlpha] = useState(false);
  const [history, setHistory] = useState([]);
  const [angleMode, setAngleMode] = useState('DEG'); // DEG, RAD, GRAD

  // Enhanced trigonometric functions with angle mode support
  const trigFuncs = {
    sin: (x) => {
      const angle = convertAngle(x, angleMode);
      return Math.sin(angle);
    },
    cos: (x) => {
      const angle = convertAngle(x, angleMode);
      return Math.cos(angle);
    },
    tan: (x) => {
      const angle = convertAngle(x, angleMode);
      return Math.tan(angle);
    },
    asin: (x) => {
      const result = Math.asin(x);
      return convertFromRadians(result, angleMode);
    },
    acos: (x) => {
      const result = Math.acos(x);
      return convertFromRadians(result, angleMode);
    },
    atan: (x) => {
      const result = Math.atan(x);
      return convertFromRadians(result, angleMode);
    }
  };

  const convertAngle = (angle, mode) => {
    switch(mode) {
      case 'DEG': return angle * Math.PI / 180;
      case 'GRAD': return angle * Math.PI / 200;
      case 'RAD': return angle;
      default: return angle;
    }
  };

  const convertFromRadians = (radians, mode) => {
    switch(mode) {
      case 'DEG': return radians * 180 / Math.PI;
      case 'GRAD': return radians * 200 / Math.PI;
      case 'RAD': return radians;
      default: return radians;
    }
  };

  // Handle button press
  const handleButtonPress = (value) => {
    if (value === 'SHIFT') {
      setIsShift(!isShift);
      setIsAlpha(false); // SHIFT and ALPHA are mutually exclusive
      return;
    }
    
    if (value === 'ALPHA') {
      setIsAlpha(!isAlpha);
      setIsShift(false); // SHIFT and ALPHA are mutually exclusive
      return;
    }

    // Handle shift-modified buttons
    let actualValue = value;
    if (isShift) {
      const shiftMap = {
        'sin(': 'asin(',
        'cos(': 'acos(',
        'tan(': 'atan(',
        'log(': '10**', // Inverse log
        'ln(': 'e**',   // Inverse ln
        '√(': '³√(',   // Cube root
        '²': 'x^y',    // Power
        '³': 'y√x',    // Nth root
        '!': 'nPr',    // Permutation
        'nPr': 'nCr',  // Combination
        'Pol(': 'Rec(', // Polar to rectangular
        'Rec(': 'Pol(', // Rectangular to polar
        '(-)': '±',    // Plus-minus
        'π': 'τ',      // Tau (2π)
        'Ans': 'PreAns', // Previous answer
        'Rnd': 'Fix',  // Fix decimal
        'Ran#': 'RanInt', // Random integer
      };
      actualValue = shiftMap[value] || value;
    }

    // Handle alpha-modified buttons (if needed)
    if (isAlpha) {
      const alphaMap = {
        'A': 'A',
        'B': 'B',
        'C': 'C',
        // Add more alpha characters as needed
      };
      actualValue = alphaMap[value] || value;
    }

    if (actualValue === 'DRG>') {
      // Cycle through angle modes
      const modes = ['DEG', 'RAD', 'GRAD'];
      const currentIndex = modes.indexOf(angleMode);
      const nextIndex = (currentIndex + 1) % modes.length;
      setAngleMode(modes[nextIndex]);
      setDisplay(modes[nextIndex]);
      setTimeout(() => setDisplay('0'), 1000);
      return;
    }

    if (actualValue === 'AC') {
      setDisplay('0');
      setExpression('');
      return;
    }

    if (actualValue === 'DEL') {
      if (display.length === 1) {
        setDisplay('0');
      } else {
        setDisplay(display.slice(0, -1));
      }
      return;
    }

    if (actualValue === '=') {
      try {
        // Replace display symbols with actual operators
        let calcExpression = display
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/π/g, Math.PI.toString())
          .replace(/τ/g, (2 * Math.PI).toString())
          .replace(/mod/gi, '%')
          .replace(/³√\(/g, 'Math.cbrt(')
          .replace(/√\(/g, 'Math.sqrt(')
          .replace(/√/g, 'Math.sqrt(')
          .replace(/sin\(/g, 'trigFuncs.sin(')
          .replace(/cos\(/g, 'trigFuncs.cos(')
          .replace(/tan\(/g, 'trigFuncs.tan(')
          .replace(/asin\(/g, 'trigFuncs.asin(')
          .replace(/acos\(/g, 'trigFuncs.acos(')
          .replace(/atan\(/g, 'trigFuncs.atan(')
          .replace(/log\(/g, 'Math.log10(')
          .replace(/ln\(/g, 'Math.log(')
          .replace(/abs\(/g, 'Math.abs(')
          .replace(/Ans/g, display)
          .replace(/\^/g, '**')
          .replace(/x\^y/g, '**')
          .replace(/y√x/g, 'Math.pow(x, 1/y)');

        // Handle factorial
        if (calcExpression.includes('!')) {
          calcExpression = calcExpression.replace(/(\d+)!/g, (match, num) => {
            let n = parseInt(num);
            let result = 1;
            for (let i = 2; i <= n; i++) {
              result *= i;
            }
            return result.toString();
          });
        }

        // Handle MOD operation
        if (calcExpression.toLowerCase().includes('mod')) {
          const parts = calcExpression.split(/mod/i);
          if (parts.length === 2) {
            const a = eval(parts[0]);
            const b = eval(parts[1]);
            calcExpression = `(${a} % ${b})`;
          }
        }

        // Handle power operations
        calcExpression = calcExpression.replace(/(\d+)\*\*(\d+)/g, 'Math.pow($1, $2)');

        // Close any open parentheses
        const openParens = (calcExpression.match(/\(/g) || []).length;
        const closeParens = (calcExpression.match(/\)/g) || []).length;
        if (openParens > closeParens) {
          calcExpression += ')'.repeat(openParens - closeParens);
        }

        // Evaluate the expression
        const result = eval(calcExpression);
        const roundedResult = Math.round(result * 100000000) / 100000000;
        
        // Add to history
        setHistory(prev => [...prev.slice(-4), `${display} = ${roundedResult}`]);
        
        setDisplay(roundedResult.toString());
        setExpression(display);
        
        // Auto turn off shift after calculation
        setIsShift(false);
      } catch (error) {
        console.log(error);
        setDisplay('Error');
        setTimeout(() => setDisplay('0'), 1000);
      }
      return;
    }

    if (actualValue === 'M+') {
      setMemory(memory + parseFloat(display) || 0);
      return;
    }

    if (actualValue === 'M-') {
      setMemory(memory - parseFloat(display) || 0);
      return;
    }

    if (actualValue === 'MR') {
      setDisplay(memory.toString());
      return;
    }

    if (actualValue === 'MC') {
      setMemory(0);
      return;
    }

    if (actualValue === 'Ans') {
      setDisplay(expression);
      return;
    }

    if (actualValue === '(-)') {
      if (display.startsWith('-')) {
        setDisplay(display.slice(1));
      } else {
        setDisplay('-' + display);
      }
      return;
    }

    if (actualValue === '±') {
      setDisplay('±' + display);
      return;
    }

    // Handle MOD button
    if (actualValue === 'mod') {
      setDisplay(display === '0' ? 'mod' : display + 'mod');
      return;
    }

    // Handle parentheses
    if (actualValue === '(' || actualValue === ')') {
      setDisplay(display === '0' ? actualValue : display + actualValue);
      return;
    }

    // Handle special functions that need parentheses
    const functionsNeedingParentheses = [
      'sin(', 'cos(', 'tan(', 'asin(', 'acos(', 'atan(', 
      'log(', 'ln(', 'abs(', 'Pol(', 'Rec(', 'Math.round(',
      'Math.exp(', 'Math.sqrt(', 'Math.cbrt('
    ];
    
    if (functionsNeedingParentheses.includes(actualValue)) {
      setDisplay(display === '0' ? actualValue : display + actualValue);
      return;
    }

    // Handle numbers and operators
    if (display === '0' && !isNaN(actualValue) && actualValue !== '0') {
      setDisplay(actualValue);
    } else {
      setDisplay(display + actualValue);
    }
  };

  // Enhanced button configuration with shift labels
  const getButtonConfig = () => {
    const baseButtons = [
      // First row
      { 
        label: 'SHIFT', 
        shiftLabel: 'SHIFT',
        value: 'SHIFT', 
        className: 'func shift', 
        color: 'blue' 
      },
      { 
        label: 'ALPHA', 
        shiftLabel: 'ALPHA',
        value: 'ALPHA', 
        className: 'func alpha', 
        color: 'red' 
      },
      { 
        label: '√', 
        shiftLabel: '³√',
        value: '√(', 
        className: 'func' 
      },
      { 
        label: 'x²', 
        shiftLabel: 'x^y',
        value: '²', 
        className: 'func' 
      },
      { 
        label: 'x³', 
        shiftLabel: 'y√x',
        value: '³', 
        className: 'func' 
      },
      { 
        label: 'log', 
        shiftLabel: '10^x',
        value: 'log(', 
        className: 'func' 
      },
      { 
        label: 'ln', 
        shiftLabel: 'e^x',
        value: 'ln(', 
        className: 'func' 
      },
      { 
        label: 'sin', 
        shiftLabel: 'sin⁻¹',
        value: 'sin(', 
        className: 'func' 
      },
      { 
        label: 'cos', 
        shiftLabel: 'cos⁻¹',
        value: 'cos(', 
        className: 'func' 
      },
      { 
        label: 'tan', 
        shiftLabel: 'tan⁻¹',
        value: 'tan(', 
        className: 'func' 
      },
      { 
        label: '(-)', 
        shiftLabel: '±',
        value: '(-)', 
        className: 'func' 
      },
      { 
        label: 'M+', 
        shiftLabel: 'M+',
        value: 'M+', 
        className: 'func' 
      },
      
      // Second row
      { 
        label: 'MODE', 
        shiftLabel: 'MODE',
        value: 'MODE', 
        className: 'func', 
        disabled: false,
        action: () => {
          // Add mode switching logic here
          setDisplay('MODE MENU');
          setTimeout(() => setDisplay('0'), 1000);
        }
      },
      { 
        label: 'SETUP', 
        shiftLabel: 'SETUP',
        value: 'SETUP', 
        className: 'func', 
        disabled: false 
      },
      { 
        label: 'ON', 
        shiftLabel: 'OFF',
        value: 'ON', 
        className: 'func power' 
      },
      { 
        label: 'Abs', 
        shiftLabel: 'Abs',
        value: 'abs(', 
        className: 'func' 
      },
      { 
        label: 'x!', 
        shiftLabel: 'nPr',
        value: '!', 
        className: 'func' 
      },
      { 
        label: 'nPr', 
        shiftLabel: 'nCr',
        value: 'nPr', 
        className: 'func' 
      },
      { 
        label: 'nCr', 
        shiftLabel: 'nCr',
        value: 'nCr', 
        className: 'func',
        disabled: true 
      },
      { 
        label: 'Pol', 
        shiftLabel: 'Rec',
        value: 'Pol(', 
        className: 'func' 
      },
      { 
        label: 'Rec', 
        shiftLabel: 'Pol',
        value: 'Rec(', 
        className: 'func' 
      },
      { 
        label: '%', 
        shiftLabel: '%',
        value: '%', 
        className: 'func' 
      },
      { 
        label: 'RCL', 
        shiftLabel: 'ENG',
        value: 'MR', 
        className: 'func' 
      },
      { 
        label: 'ENG', 
        shiftLabel: 'ENG',
        value: 'ENG', 
        className: 'func', 
        disabled: true 
      },
      
      // MOD button added
      { 
        label: 'mod', 
        shiftLabel: 'mod',
        value: 'mod', 
        className: 'func' 
      },
    ];

    // Add more buttons as needed...

    return baseButtons;
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        {/* Display */}
        <div className="calculator-display">
          <div className="status-indicators">
            <div className="memory-indicator">
              {memory !== 0 && 'M'}
            </div>
            <div className="angle-indicator">
              {angleMode}
            </div>
            <div className="shift-indicator">
              {isShift && 'S'}
              {isAlpha && 'A'}
            </div>
          </div>
          <div className="display-text">{display}</div>
        </div>

        {/* History */}
        <div className="history-display">
          {history.map((item, idx) => (
            <div key={idx} className="history-item">{item}</div>
          ))}
        </div>

        {/* Keyboard */}
        <div className="calculator-keyboard">
          {getButtonConfig().map((btn, index) => (
            <button
              key={index}
              className={`calculator-btn ${btn.className} ${isShift ? 'shift-active' : ''}`}
              onClick={() => {
                if (btn.action) {
                  btn.action();
                } else {
                  handleButtonPress(isShift && btn.shiftValue ? btn.shiftValue : btn.value);
                }
              }}
              disabled={btn.disabled}
              style={btn.color ? { backgroundColor: btn.color, color: 'white' } : {}}
            >
              {isShift && btn.shiftLabel ? btn.shiftLabel : btn.label}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="calculator-footer">
          <div className="memory-display">
            Memory: {memory.toFixed(6)}
          </div>
          <div className="instructions">
            SHIFT: Alternate functions | ALPHA: Letters | MODE: Settings
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;