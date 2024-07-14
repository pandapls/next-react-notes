'use client'
import React, { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import NotePreview from '@/components/Note/NotePreview';
import { saveNote, deletNode } from '@/actions/editNode'
import SaveButton from '@/components/Button/SaveButton';
import DeleteButton from '@/components/Button/DeleteButton';
type NoteEditorProps = {
  noteId: string,
  initialTitle: string,
  initialBody: string
}

const initialState = {
  msg: '',
  errors: null
}
const NoteEditor: React.FC<NoteEditorProps> = (props) => {
  const { noteId, initialTitle, initialBody } = props;

  const [saveState, saveFormAction] = useFormState(saveNote, initialState);
  const [delState, delFormAction] = useFormState(deletNode, initialState);

  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const isDraft = !noteId;

  useEffect(() => {
    if (saveState.errors) {
      alert(saveState.errors)
    }
  }, [saveState])

  return (
    <div className='note-editor'>
      <form className='note-editor-form' autoComplete='off'>
        <div className='note-editor-menu' role='menubar'>
          <input type='hidden' name='noteId' value={noteId} />
          <SaveButton formAction={saveFormAction} />
          <DeleteButton formAction={delFormAction} isDraft={isDraft} />
        </div>
        <div className='note-editor-menu'>
          {saveState.msg || ''}
        </div>
        <label className='offscreen' htmlFor='note-body-input'>
          Enter the body for your note
        </label>
        <input
          id='note-title-input'
          type='text'
          name='title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <label className='offscreen' htmlFor='note-body-input'>
          Enter the body for your note
        </label>
        <textarea
          name='body'
          value={body}
          id='note-body-input'
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className='note-editor-preview'>
        <div className='label label--preview' role='status'>
          Preview
        </div>
        <h1 className='note-title'>{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  )
}
export default NoteEditor;