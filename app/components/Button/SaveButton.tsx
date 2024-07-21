import React from "react";
import { useFormStatus } from "react-dom";
import { FormData } from '@/actions/editNode'
import Image from 'next/image';


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
      <Image src="/checkmark.svg" width={14} height={14} alt="" role='presentation' />

      {pending ? 'Saving' : 'Done'}
    </button>
  )
}

export default SaveButton;