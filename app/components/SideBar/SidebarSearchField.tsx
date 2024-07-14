'use client'

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import Spinner from '@/components/SideBar/Spinner'


const SidebarSearchField = () => {

  const { replace } = useRouter();
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition()

  const handleSearch = (term: string) => {

    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }

    startTransition(() => {
      replace(`${pathName}?${params.toString()}`)
    })
  }

  return (
    <div className="search" role="search">
      <label className="offscreen" htmlFor="sider-search-input">
        Search for a note by title
      </label>
      <input
        id="sidebar-search-input"
        placeholder="Search"
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Spinner active={isPending} />
    </div>
  )
}

export default SidebarSearchField;