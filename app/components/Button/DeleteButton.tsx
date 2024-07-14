import React from "react";
import { useFormStatus } from "react-dom";
import { FormData } from '@/actions/editNode'

type DeleteButtonProps = {
  formAction: (payload: FormData) => void
  isDraft: boolean
}
const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  const { formAction, isDraft } = props;
  const { pending } = useFormStatus();

  return !isDraft && (
    <button
      className='note-editor-delete'
      disabled={pending}
      type='submit'
      role='menuitem'
      formAction={formAction}
    >
      <img src="/cross.svg" width="10px" height="10px" alt="" role='presentation' />
      Delete
    </button>
  )
}

export default DeleteButton;