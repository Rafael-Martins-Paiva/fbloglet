import { Metadata } from 'next';
// Certifique-se de que o caminho de importação está correto para o seu componente Client!
// Use o nome do arquivo que você corrigiu, que no seu log de erro era 'test.tsx'.
import EditableDiv from '@/components/test'; 

// Simulação de busca de dados no servidor
async function fetchInitialContent(slug: string): Promise<string> {
  // Aqui você faria uma chamada a um banco de dados ou API
  // para carregar o conteúdo atual do rascunho (draft) com base no 'slug'.
  
  // Exemplo de conteúdo mock:
  const contentMap: Record<string, string> = {
    'post-1': '<h2>Inicie a edição do Post 1</h2><p>Este é o conteúdo que foi carregado do servidor.</p>',
    'new-draft': '<h2>Novo Rascunho</h2><p>Comece a escrever seu novo artigo aqui.</p>',
    default: 'Clique para editar e comece a escrever!',
  };

  return contentMap[slug] || contentMap.default;
}

// ----------------------------------------------------
// SERVER COMPONENT: ComposerPage
// ----------------------------------------------------
export default async function ComposerPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  
  // 1. Carrega o conteúdo inicial (no Servidor)
  const initialContent = await fetchInitialContent(slug);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto w-full">
        
        <header className="mb-8 pb-4 border-b">
            <h1 className="font-bold text-3xl tracking-tight">
                Editor de Conteúdo
            </h1>
            <p className="text-gray-500">
                Editando o rascunho: <code className="bg-gray-200 p-1 rounded text-sm">{slug}</code>
            </p>
        </header>

        {/* 2. Renderiza o CLIENT COMPONENT (EditableDiv) com o conteúdo carregado */}
        {/* O Next.js sabe que 'EditableDiv' precisa ser hidratado no cliente (por causa do "use client") */}
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