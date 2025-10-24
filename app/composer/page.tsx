import { Metadata } from 'next';
// Certifique-se de que o caminho de importação está correto para o seu componente Client!
import EditableDiv from '@/components/test'; 

// Simulação de busca de dados no servidor - Não precisa mais de 'slug'
async function fetchInitialContent(): Promise<string> {
  // Você pode buscar um rascunho padrão, ou simplesmente retornar um conteúdo inicial.
  
  // Exemplo de conteúdo mock padrão:
  const defaultContent = '<h2>Comece a Escrever</h2><p>Este é o novo rascunho padrão.</p>';

  // Em um projeto real, você buscaria o rascunho mais recente ou um rascunho 'vazio'.
  return defaultContent;
}

// ----------------------------------------------------
// SERVER COMPONENT: ComposerPage (Sem Parâmetros de Rota)
// ----------------------------------------------------
export default async function ComposerPage() {
  // 1. Carrega o conteúdo inicial (no Servidor)
  // Não precisamos mais de 'params' nem de 'slug'
  const initialContent = await fetchInitialContent();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto w-full">
        
        <header className="mb-8 pb-4 border-b">
            <h1 className="font-bold text-3xl tracking-tight">
                Editor de Conteúdo
            </h1>
            {/* Removemos a exibição do slug, pois a página agora é estática */}
            <p className="text-gray-500">
                Área para criação de novos rascunhos ou edição padrão.
            </p>
        </header>

        {/* 2. Renderiza o CLIENT COMPONENT (EditableDiv) com o conteúdo carregado */}
        <EditableDiv initialContent={initialContent} />

      </div>
    </div>
  );
}

// ----------------------------------------------------
// METADADOS (Server Component Feature)
// ----------------------------------------------------
export const metadata: Metadata = {
  title: 'Editor | Composer',
  description: 'Área de edição de conteúdo do site.',
};