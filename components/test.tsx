"use client"
import React, { useState, useRef, useCallback } from 'react';

// Define a interface para as props, neste caso, o conteúdo inicial é opcional.
interface EditableDivProps {
  initialContent?: string;
}

const EditableDiv: React.FC<EditableDivProps> = ({ initialContent = '' }) => {
  // 1. ESTADO: Armazena o conteúdo atual, que pode incluir HTML (rich text)
  const [content, setContent] = useState(initialContent);
  
  // 2. REF CORRIGIDO COM TIPAGEM: 
  // O <HTMLDivElement> informa ao TypeScript o tipo do elemento DOM.
  const divRef = useRef<HTMLDivElement>(null);

  // Função para capturar as alterações (com useCallback para otimização)
  const handleInput = useCallback(() => {
    // 3. CHECAGEM DE NULL: Garante que divRef.current não é 'null' antes de acessar 'innerHTML'
    if (divRef.current) {
      const newContent = divRef.current.innerHTML;
      setContent(newContent);
    }
  }, []); // Dependências vazias, pois só acessa o ref

  // Função para simular o salvamento dos dados
  const saveContent = () => {
    // 'content' já tem o valor mais atualizado do estado
    console.log("-----------------------------------------");
    console.log("SALVANDO DADOS...");
    console.log("Conteúdo Capturado (HTML):", content);
    console.log("-----------------------------------------");
    
    // Aqui você faria a chamada de API (ex: Axios, Fetch) para enviar os dados.
    alert("Conteúdo Salvo! Verifique o console para ver o valor capturado.");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Editor de Conteúdo Flexível</h2>
      
      {/* O elemento DIV Editável */}
      <div
        id="editor"
        ref={divRef} // Anexa o ref ao elemento DOM
        contentEditable="true" // Torna o conteúdo editável
        onInput={handleInput} // Captura as alterações de digitação e colagem
        
        // Define o conteúdo inicial/atual a partir do estado (necessário para rich text)
        dangerouslySetInnerHTML={{ __html: content }} 
        
        style={{ 
          border: '1px solid #0070f3', 
          padding: '15px', 
          minHeight: '150px', 
          borderRadius: '6px',
          backgroundColor: '#f9f9f9',
          cursor: 'text' 
        }}
      />

      <button 
        onClick={saveContent}
        style={{ 
          marginTop: '15px', 
          padding: '10px 20px', 
          backgroundColor: '#0070f3', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Salvar Conteúdo ({content.length} caracteres)
      </button>
      
      {/* Área de Visualização para Debug */}
      <div style={{ marginTop: '30px', borderTop: '2px dashed #ccc', paddingTop: '15px' }}>
        <strong>Visualização do Conteúdo Salvo (Texto Puro):</strong>
        <p style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', backgroundColor: '#eee', padding: '10px' }}>
          {divRef.current?.textContent || 'Vazio'}
        </p>
      </div>
    </div>
  );
};

export default EditableDiv;