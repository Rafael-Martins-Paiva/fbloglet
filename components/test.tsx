"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface EditableDivProps {
  initialContent?: string;
}

const EditableDiv: React.FC<EditableDivProps> = ({ initialContent = '' }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    if (editorRef.current && initialContent) {
      editorRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  const getCaretCharacterOffset = useCallback((element: HTMLDivElement): number => {
    let caretOffset = 0;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
    return caretOffset;
  }, []);

  const handleInput = useCallback(() => {
    if (!editorRef.current) return;

    const fullText = editorRef.current.textContent || '';
    const pos = getCaretCharacterOffset(editorRef.current);
    
    const beforeCursor = fullText.slice(0, pos);
    
    const lastNewlineIndex = beforeCursor.lastIndexOf('\n');
    const currentLine = beforeCursor.substring(lastNewlineIndex + 1);

    if (currentLine.trim().startsWith('/')) {
      setSuggestion(`Comando detectado: ${currentLine.trim()}`);
    } else {
      setSuggestion('');
    }
  }, [getCaretCharacterOffset]);

  const handleClick = useCallback(() => {
    setSuggestion('');
  }, []);
  
  const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      setSuggestion('');
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Editor de Conteúdo Flexível</h2>
      
      <div 
        style={{ 
          minHeight: '20px', 
          color: 'blue', 
          marginBottom: '10px' 
        }}
      >
        {suggestion}
      </div>
      
      <div
        ref={editorRef}
        contentEditable="true"
        onInput={handleInput}
        onClick={handleClick}
        onKeyUp={handleKeyUp}
        style={{ 
          padding: '15px', 
          minHeight: '150px', 
          border: '1px solid #ccc',
          cursor: 'text' 
        }}
      />

    </div>
  );
};

export default EditableDiv;