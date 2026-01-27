import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [memory, setMemory] = useState(0);
  const [isShift, setIsShift] = useState(false);
  const [isAlpha, setIsAlpha] = useState(false);
  const [history, setHistory] = useState([]);

  // Handle button press
  const handleButtonPress = (value) => {
    if (value === 'SHIFT') {
      setIsShift(!isShift);
      return;
    }
    
    if (value === 'ALPHA') {
      setIsAlpha(!isAlpha);
      return;
    }

    if (value === 'AC') {
      setDisplay('0');
      setExpression('');
      return;
    }

    if (value === 'DEL') {
      if (display.length === 1) {
        setDisplay('0');
      } else {
        setDisplay(display.slice(0, -1));
      }
      return;
    }

    if (value === '=') {
      try {
        // Replace display symbols with actual operators
        let calcExpression = display
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/π/g, Math.PI.toString())
          .replace(/√\(/g, 'sqrt(')
          .replace(/√/g, 'Math.sqrt(')
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(')
          .replace(/log\(/g, 'Math.log10(')
          .replace(/ln\(/g, 'Math.log(')
          .replace(/Ans/g, display);

        // Close any open parentheses for sqrt
        if ((calcExpression.match(/Math\.sqrt\(/g) || []).length > 
            (calcExpression.match(/\)/g) || []).length) {
          calcExpression += ')';
        }

        // Evaluate the expression
        const result = eval(calcExpression);
        const roundedResult = Math.round(result * 100000000) / 100000000;
        
        // Add to history
        setHistory(prev => [...prev.slice(-4), `${display} = ${roundedResult}`]);
        
        setDisplay(roundedResult.toString());
        setExpression(display);
      } catch (error) {
        console.log(error);
        setDisplay('Error');
        setTimeout(() => setDisplay('0'), 1000);
      }
      return;
    }

    if (value === 'M+') {
      setMemory(memory + parseFloat(display) || 0);
      return;
    }

    if (value === 'M-') {
      setMemory(memory - parseFloat(display) || 0);
      return;
    }

    if (value === 'MR') {
      setDisplay(memory.toString());
      return;
    }

    if (value === 'MC') {
      setMemory(0);
      return;
    }

    if (value === 'Ans') {
      setDisplay(expression);
      return;
    }

    if (value === '(-)') {
      if (display.startsWith('-')) {
        setDisplay(display.slice(1));
      } else {
        setDisplay('-' + display);
      }
      return;
    }

    // Handle parentheses
    if (value === '(' || value === ')') {
      setDisplay(display === '0' ? value : display + value);
      return;
    }

    // Handle numbers and operators
    if (display === '0' && !isNaN(value) && value !== '0') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      
      // Number keys
      if (key >= '0' && key <= '9') {
        handleButtonPress(key);
      }
      
      // Operators
      if (key === '+') handleButtonPress('+');
      if (key === '-') handleButtonPress('-');
      if (key === '*') handleButtonPress('×');
      if (key === '/') handleButtonPress('÷');
      if (key === '.') handleButtonPress('.');
      if (key === 'Enter' || key === '=') handleButtonPress('=');
      if (key === 'Escape') handleButtonPress('AC');
      if (key === 'Backspace') handleButtonPress('DEL');
      if (key === '(') handleButtonPress('(');
      if (key === ')') handleButtonPress(')');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display]);

  // Calculator buttons configuration
  const buttons = [
    // First row
    { label: 'SHIFT', value: 'SHIFT', className: 'func shift', color: 'blue' },
    { label: 'ALPHA', value: 'ALPHA', className: 'func alpha', color: 'red' },
    { label: '√', value: '√(', className: 'func' },
    { label: 'x²', value: '²', className: 'func' },
    { label: 'x³', value: '³', className: 'func' },
    { label: 'log', value: 'log(', className: 'func' },
    { label: 'ln', value: 'ln(', className: 'func' },
    { label: 'sin', value: 'sin(', className: 'func' },
    { label: 'cos', value: 'cos(', className: 'func' },
    { label: 'tan', value: 'tan(', className: 'func' },
    { label: '(-)', value: '(-)', className: 'func' },
    { label: 'M+', value: 'M+', className: 'func' },
    
    // Second row
    { label: 'MODE', value: 'MODE', className: 'func', disabled: true },
    { label: 'SETUP', value: 'SETUP', className: 'func', disabled: true },
    { label: 'ON', value: 'ON', className: 'func power' },
    { label: 'Abs', value: 'abs(', className: 'func' },
    { label: 'x!', value: '!', className: 'func' },
    { label: 'nPr', value: 'nPr', className: 'func' },
    { label: 'nCr', value: 'nCr', className: 'func' },
    { label: 'Pol', value: 'Pol(', className: 'func' },
    { label: 'Rec', value: 'Rec(', className: 'func' },
    { label: '%', value: '%', className: 'func' },
    { label: 'RCL', value: 'MR', className: 'func' },
    { label: 'ENG', value: 'ENG', className: 'func', disabled: true },
    
    // Third row
    { label: '(', value: '(', className: 'normal' },
    { label: ')', value: ')', className: 'normal' },
    { label: ',', value: ',', className: 'normal' },
    { label: 'S⇔D', value: 'S⇔D', className: 'func', disabled: true },
    { label: 'M-', value: 'M-', className: 'func' },
    { label: '7', value: '7', className: 'number' },
    { label: '8', value: '8', className: 'number' },
    { label: '9', value: '9', className: 'number' },
    { label: 'DEL', value: 'DEL', className: 'func del' },
    { label: 'AC', value: 'AC', className: 'func ac' },
    
    // Fourth row
    { label: 'Ran#', value: 'Math.random()', className: 'func' },
    { label: 'RanInt', value: 'RanInt', className: 'func', disabled: true },
    { label: 'π', value: 'π', className: 'func' },
    { label: 'e', value: Math.E.toString(), className: 'func' },
    { label: 'DRG>', value: 'DRG>', className: 'func', disabled: true },
    { label: '4', value: '4', className: 'number' },
    { label: '5', value: '5', className: 'number' },
    { label: '6', value: '6', className: 'number' },
    { label: '×', value: '×', className: 'operator' },
    { label: '÷', value: '÷', className: 'operator' },
    
    // Fifth row
    { label: 'STAT', value: 'STAT', className: 'func stat', disabled: true },
    { label: 'Rnd', value: 'Math.round(', className: 'func' },
    { label: '10^x', value: '10**', className: 'func' },
    { label: 'e^x', value: 'Math.exp(', className: 'func' },
    { label: 'Ans', value: 'Ans', className: 'func' },
    { label: '1', value: '1', className: 'number' },
    { label: '2', value: '2', className: 'number' },
    { label: '3', value: '3', className: 'number' },
    { label: '+', value: '+', className: 'operator' },
    { label: '-', value: '-', className: 'operator' },
    
    // Sixth row
    { label: 'CLR', value: 'CLR', className: 'func', disabled: true },
    { label: 'INS', value: 'INS', className: 'func', disabled: true },
    { label: 'OFF', value: 'OFF', className: 'func', disabled: true },
    { label: 'x⁻¹', value: '**(-1)', className: 'func' },
    { label: 'STO', value: 'MC', className: 'func' },
    { label: '0', value: '0', className: 'number zero' },
    { label: '.', value: '.', className: 'number' },
    { label: '×10^x', value: 'e', className: 'func' },
    { label: '=', value: '=', className: 'operator equals' },
  ];

  return (
    <div className="calculator-container">
      <div className="calculator">
        {/* Header */}
        {/* <div className="calculator-header">
          <div className="brand">CASIO</div>
          <div className="model">fx-82ES PLUS</div>
          <div className="subtitle">NATURAL-DISPLAY</div>
          <div className="edition">2nd edition</div>
        </div> */}

        {/* Display */}
        <div className="calculator-display">
          <div className="memory-indicator">
            {memory !== 0 && 'M'}
          </div>
          <div className="shift-indicator">
            {isShift && 'SHIFT'}
            {isAlpha && 'ALPHA'}
          </div>
          <div className="display-text">{display}</div>
        </div>

        {/* Example calculation */}
        <div className="example-calculation">
          2√3 + 6 ÷ (3√3 + 4√3) = 3
        </div>

        {/* Keyboard */}
        <div className="calculator-keyboard">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className={`calculator-btn ${btn.className} ${isShift ? 'shift-active' : ''} ${isAlpha ? 'alpha-active' : ''}`}
              onClick={() => handleButtonPress(btn.value)}
              disabled={btn.disabled}
              style={btn.color ? { backgroundColor: btn.color, color: 'white' } : {}}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Memory and History */}
        <div className="calculator-footer">
          <div className="memory-display">
            Memory: {memory}
          </div>
          <div className="history">
            {history.map((item, idx) => (
              <div key={idx} className="history-item">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;