"use client"

interface EditableDivProps {
  initialContent?: string;
}

const EditableDiv: React.FC<EditableDivProps> = ({  }) => {
  



  return (
    <div style={{ padding: '20px' }}>
      <h2>Editor de Conteúdo Flexível</h2>
      
      {}
      <div
        id="editor"
        contentEditable="true"
        
        style={{ 
          padding: '15px', 
          minHeight: '150px', 
          cursor: 'text' 
        }}
      />

    </div>
  );
};

export default EditableDiv;