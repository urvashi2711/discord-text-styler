import React from 'react';
import './App.css';

const ColorButton = ({ ansiCode, label, onClick }) => (
    <button 
        data-ansi={ansiCode} 
        className={`button style-button ansi-${ansiCode}`} 
        onClick={onClick}
    >
        {label || '\u00A0'}
    </button>
);

export default ColorButton;