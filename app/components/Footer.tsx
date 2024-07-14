import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { locales } from '@/root/config'
import { useTranslation } from "@/i18n/index"

const Footer = async (props: { lng: string }) => {
  const { lng } = props
  const { t } = await useTranslation(lng, 'footer')
  return (
    <footer style={{ margin: 20 }}>
      <Trans
        i18nKey="languageSwitcher"
        t={t}
        defaults="Switch from <strong>{{ lng }}</strong> to: {' '}"
        values={{ lng }}>
      </Trans>
      {locales.filter((l) => lng !== l).map((l, index) => {
        return (
          <span key={l}>
            {index > 0 && (' | ')}
            <Link href={`/${l}`}>
              {l}
            </Link>
          </span>
        )
      })}
    </footer>
  )
}

export default Footer