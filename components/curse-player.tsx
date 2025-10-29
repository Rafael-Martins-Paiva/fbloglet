import React from 'react';

// 1. Defina a Interface das Props
interface YouTubeEmbedProps {
  id: string;      // O ID do vídeo (string é obrigatório)
  title?: string;  // O '?' torna o title opcional, mas se existir, deve ser string
}

// 2. Aplique a Interface na desestruturação das props
export default function YouTubeEmbed({ id, title }: YouTubeEmbedProps) {
  const src = `https://www.youtube.com/embed/${id}`;

  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: '56.25%', // Relação de aspecto 16:9
        height: 0,
        overflow: 'hidden',
        maxWidth: '100%',
        background: '#000',
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        src={src}
        title={title || 'Embedded YouTube Video'}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}