import React, { useRef, useState } from 'react';
import './App.css';

const colors = [
  '#2c2f33', '#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff'
];
const bgColors = [
  '#23272a', '#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff', '#00ffff', '#ffffff'
];

function App() {
  const textareaRef = useRef(null);
  const [message, setMessage] = useState('Type your Discord message here...');
  const [copied, setCopied] = useState(false);

  const handleColor = (ansi) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const span = document.createElement('span');
    span.innerText = selection.toString(); 
    span.className = `ansi-${ansi}`;

    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);
  };

  const handleCopy = () => {
    const nodes = Array.from(textareaRef.current.childNodes);
    const content = nodes
      .reverse()
      .map(node => node.textContent)
      .join('');
    
    const ansiText = `\`\`\`ansi\n${content}\n\`\`\``;
    
    navigator.clipboard.writeText(ansiText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  

  return (
    <div className="App">
      <h1>Discord <span style={{ color: '#00AFF4' }}>Text Styler</span></h1>
      <div className="buttons">
        <button onClick={() => handleColor(0)}>Reset</button>
        <button onClick={() => handleColor(1)}>Bold</button>
        <button onClick={() => handleColor(4)}>Underline</button>
      </div>

      <div className="colors">
        <strong>FG</strong>
        {colors.map((color, index) => (
          <button
            key={index}
            style={{ backgroundColor: color }}
            onClick={() => handleColor(index + 30)}
          ></button>
        ))}

        <strong>BG</strong>
        {bgColors.map((color, index) => (
          <button
            key={index}
            style={{ backgroundColor: color }}
            onClick={() => handleColor(index + 40)}
          ></button>
        ))}
      </div>

      <div
        className="textarea"
        contentEditable
        ref={textareaRef}
        onInput={(e) => setMessage(e.target.innerText)} 
        dangerouslySetInnerHTML={{ __html: message }}
      ></div>

      <button onClick={handleCopy} className="copy-btn">
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
}

export default App;
