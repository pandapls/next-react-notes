'use client'

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useTransition } from "react";
import { importNote } from "@/actions/upload";


const SidebarImport = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (!fileInput.files || fileInput.files.length === 0) {
      console.error('files list is empty')
      return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    // api 方式
    // try {
    //   const res = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: formData
    //   })

    //   if (!res.ok) {
    //     console.error('upload err')
    //     return
    //   }

    //   const data = await res.json();

    //   startTransition(() => router.push(`/note/${data.uid}`));
    //   startTransition(() => router.refresh());
    // } catch (error) {
    //   console.error('upload err')
    // }

    // action方式
    try {
      const data = await importNote(formData);
      router.push(`/note/${data.uid}`);
    } catch (error) {
      console.error('upload err')
    }
    e.target.type = 'text';
    e.target.type = 'file';
  }
  return (
    <div>
      <form method="post" encType="multipart/form-data">
        <div style={{ textAlign: "center" }}>
          <label htmlFor="file" style={{ cursor: 'pointer' }}>Import .md File</label>
          <input
            disabled={isPending}
            type="file"
            id="file"
            name="file"
            multiple
            onChange={onChange}
            accept=".md"
            style={{ position: "absolute", clip: "rect(0 0 0 0)" }}
          />
        </div>
      </form>

    </div>
  )
};

export default SidebarImport;