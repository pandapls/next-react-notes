'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useState, useRef, useEffect, useTransition } from 'react';
type SidebarNoteItemContentProps = {
  id: string,
  title: string,
  expandedChildren?: ReactNode
}
const SidebarNoteItemContent: React.FC<React.PropsWithChildren<SidebarNoteItemContentProps>> = (props) => {
  const { id, title, children, expandedChildren } = props;
  const router = useRouter()
  const pathname = usePathname()

  const selectedId = pathname?.split('/')[1] || null
  const [isPending] = useTransition()
  const [isExpanded, setIsExpanded] = useState(false)
  const isActive = id === selectedId;

  // Animate after title is edited.
  const itemRef = useRef<HTMLDivElement>(null);
  const prevTitleRef = useRef(title);

  useEffect(() => {
    if (title === prevTitleRef.current) {
      return;
    }
    prevTitleRef.current = title;
    if (itemRef.current) {
      itemRef.current.classList.add('flash');
    }
  }, [title]);

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        if (itemRef.current) {
          itemRef.current.classList.remove('flash');
        }
      }}
      className={[
        'sidebar-note-list-item',
        isExpanded ? 'note-expanded' : '',
      ].join(' ')}
    >
      {children}
      <button
        className="sidebar-note-open"
        style={{
          backgroundColor:
            // isPending
            //   ? 'var(--gray-80)'
            //   :
            isActive
              ? 'var(--tertiary-blue)'
              : '',
          border: isActive
            ? '1px solid var(--primary-border)'
            : '1px solid transparent',
        }}
        onClick={() => {
          const sidebarToggle = document.getElementById('sidebar-toggle') as HTMLInputElement | null
          if (sidebarToggle) {
            sidebarToggle.checked = true
          }

          router.push(`/note/${id}`)
        }}
      >
        Open note for preview
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? (
          <img
            src="/chevron-down.svg"
            width="10px"
            height="10px"
            alt="Collapse"
          />
        ) : (
          <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
        )}
      </button>
      {isExpanded && expandedChildren}
    </div>
  )
}

export default SidebarNoteItemContent;