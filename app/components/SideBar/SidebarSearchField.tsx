'use client'

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Spinner from '@/components/SideBar/Spinner'
import { useTranslation } from "@/i18n/client"

const SidebarSearchField = (props: { lng: string }) => {
  const { lng } = props;
  const { replace } = useRouter();
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition()
  const { t } = useTranslation(lng, 'basic')
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
        placeholder={isClient ? t('search') : 'search'}
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Spinner active={isPending} />
    </div>
  )
}

export default SidebarSearchField;