import { marked } from 'marked'
import React from 'react'
import sanitizeHtml, { IOptions } from 'sanitize-html';

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  'img',
  'h1',
  'h2',
  'h3'
]);

const allowedAttributes: IOptions['allowedAttributes'] = {
  ...sanitizeHtml.defaults.allowedAttributes,
  img: ['alt', 'src']
};


interface NotePreviewProps {
  children: string;
}
const NotePreview: React.FC<NotePreviewProps> = ({ children }) => {
  const md = marked(children);
  const sanitizedHtml = sanitizeHtml(md as string, {
    allowedTags,
    allowedAttributes
  })

  return (
    <div className="note-preview">
      <div
        className="text-with-markdown"
        dangerouslySetInnerHTML={{
          __html: sanitizedHtml
        }}
      />
    </div>
  )
}

export default NotePreview
