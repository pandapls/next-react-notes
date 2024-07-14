import Link from 'next/link';
import React from 'react'
type EditButtonProps = {
  noteId?: string
}
const EditButton: React.FC<React.PropsWithChildren<EditButtonProps>> = (props) => {
  const { noteId, children } = props;
  const isDraft = noteId == null;
  return (
    <Link href={`/note/edit/${noteId || ''}`} className='link--unstyled'>
      <button
        className={[
          'edit-button',
          isDraft ? 'edit-button--solid' : 'edit-button--outline',
        ].join(' ')}
        role="menuitem"
      >
        {children}
      </button>
    </Link>
  )

}

export default EditButton;