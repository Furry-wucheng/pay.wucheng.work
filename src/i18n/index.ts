import * as i18n from '@solid-primitives/i18n'
import { createMemo, createSignal } from 'solid-js'

import * as en from './en'
import * as zhCN from './zh-cn'

type Locale = 'zh-cn' | 'en'

const dictionaries = {
  en: en.dict,
  'zh-cn': zhCN.dict,
}

const [locale, setLocale] = createSignal<Locale>('zh-cn')
const dict = createMemo(() => i18n.flatten(dictionaries[locale()]))
// eslint-disable-next-line solid/reactivity
const t = i18n.translator(dict)

export { locale, setLocale, t }
export type { Locale }
