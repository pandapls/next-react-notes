import Note from '@/components/Note/Note'
import { getNote } from '@/lib/strapi';
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


  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  return <Note noteId={noteId} note={note} />
}

export default Page