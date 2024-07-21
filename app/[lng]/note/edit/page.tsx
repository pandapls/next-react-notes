import NoteEditor from '@/components/Edit/NoteEditor'

export default async function EditPage() {
  return <NoteEditor noteId={''} initialTitle="Untitled" initialBody="" />
}
