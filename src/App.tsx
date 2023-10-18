import { t, setLocale, locale, Locale } from './i18n'
import { createEffect, createSignal, For, JSX, onMount } from 'solid-js'
import './App.css'
import { Payments } from './components/payments'

const App = () => {
  return (
    <>
      <div class="outfit home">
        <LanguageSwitcher />
        <div class="title-box">
          <p>{t('payTitle')}</p>
        </div>
        <p class="select-payment">{t('payment')}</p>
        <Payments />
        <footer>
          <p>© 2023 {t('yanren')} </p>
        </footer>
      </div>
    </>
  )
}

const LanguageSwitcher = () => {
  const languageList: { text: string; lan: Locale }[] = [
    {
      text: '简',
      lan: 'zh-cn',
    },
    {
      text: 'EN',
      lan: 'en',
    },
  ]

  createEffect(() => {
    if (locale() === 'en') {
      document.title = t('payTitle')
    } else {
      document.title = t('payTitle')
    }
  })

  return (
    <div id="language-switcher">
      <ul class="language-list">
        {languageList.map((item) => {
          return (
            <li>
              <p
                classList={{ active: locale() === item.lan }}
                onClick={() => setLocale(item.lan)}
                class="outfit"
              >
                {item.text}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
