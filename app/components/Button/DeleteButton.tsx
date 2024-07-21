import React from "react";
import { useFormStatus } from "react-dom";
import { FormData } from '@/actions/editNode'
import Image from 'next/image';
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
      <Image src="/cross.svg" width={10} height={10} alt="" role='presentation' />
      Delete
    </button>
  )
}

export default DeleteButton;