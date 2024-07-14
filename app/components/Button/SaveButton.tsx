import React from "react";
import { useFormStatus } from "react-dom";
import { FormData } from '@/actions/editNode'
type SaveButtonProps = {
  formAction: (payload: FormData) => void
}
const SaveButton: React.FC<SaveButtonProps> = (props) => {
  const { formAction } = props;
  const { pending } = useFormStatus();

  return (
    <button
      className='note-editor-done'
      disabled={pending}
      type='submit'
      role='menuitem'
      formAction={formAction}
    >
      <img src="/checkmark.svg" width="14px" height="10px" alt="" role='presentation' />
      {pending ? 'Saving' : 'Done'}
    </button>
  )
}

export default SaveButton;