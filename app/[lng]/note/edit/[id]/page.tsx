import NoteEditor from '@/components/Edit/NoteEditor';
import { getNote } from '@/lib/strapi';
import { sleep } from '@/lib/utils';
import { NextPage } from 'next';

// 定义 props 类型
interface NotePageProps {
  params: {
    id: string
  };
}
const Page: NextPage<NotePageProps> = async ({ params }) => {
  // 动态路由 获取笔记 id
  const noteId = params.id;
  const note = await getNote(noteId)

  // 为了让 Suspense 的效果更明显
  await sleep(1000);

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  return <NoteEditor noteId={noteId} initialTitle={note.title} initialBody={note.content} />

}

export default Page