"use client"

// Define a interface para as props, neste caso, o conteúdo inicial é opcional.
interface EditableDivProps {
  initialContent?: string;
}

const EditableDiv: React.FC<EditableDivProps> = ({  }) => {
  



  return (
    <div style={{ padding: '20px' }}>
      <h2>Editor de Conteúdo Flexível</h2>
      
      {/* O elemento DIV Editável */}
      <div
        id="editor"
        contentEditable="true" // Torna o conteúdo editável
        

        
        style={{ 
          border: '1px solid #0070f3', 
          padding: '15px', 
          minHeight: '150px', 
          borderRadius: '6px',
          backgroundColor: '#f9f9f9',
          cursor: 'text' 
        }}
      />

    </div>
  );
};

export default EditableDiv;