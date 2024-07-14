import { Note } from "@/lib/redis"
import SidebarNoteItemContent from "@/components/SideBar/SidebarNoteItemContent"
import SidebarNoteItemHeader from "@/components/SideBar/SidebarNoteItemHeader"
export type NoteProps = {
  id: string
  note: Note
}
const SidebarNoteItem = (props: NoteProps) => {
  const { id, note: { title, updateTime, content } } = props;

  return (
    <SidebarNoteItemContent
      id={id}
      title={title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {(content && content.substring(0, 20)) || <i>(No content)</i>}
        </p>
      }
    >
      <SidebarNoteItemHeader title={title} updateTime={updateTime} />
    </SidebarNoteItemContent>
  )
}
export default SidebarNoteItem