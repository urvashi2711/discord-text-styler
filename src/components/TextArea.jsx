import React, { useRef, useState } from 'react';
import './App.css';

const TextArea = () => {
    const textareaRef = useRef(null);
    const [copyText, setCopyText] = useState("Copy to Clipboard");

    const handleStyle = (ansiCode) => {
        const textarea = textareaRef.current;
        const selection = window.getSelection();
        const text = selection.toString();

        const span = document.createElement("span");
        span.innerText = text;
        span.classList.add(`ansi-${ansiCode}`);

        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(span);

        range.selectNodeContents(span);
        selection.removeAllRanges();
        selection.addRange(range);
    };

    const handleCopy = () => {
        const textToCopy = "```ansi\n" + textareaRef.current.innerHTML + "\n```";
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopyText("Copied!");
            setTimeout(() => setCopyText("Copy to Clipboard"), 2000);
        });
    };

    return (
        <div>
            <div 
                ref={textareaRef} 
                id="textarea" 
                contentEditable="true"
            >
                Type here...
            </div>
            <button className="button copy" onClick={handleCopy}>
                {copyText}
            </button>
        </div>
    );
};

export default TextArea;
