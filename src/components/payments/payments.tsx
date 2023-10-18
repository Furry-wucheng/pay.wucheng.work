import { createSignal, onMount, For } from 'solid-js'
import QRCode from 'qrcode'
import parse from 'ua-parser-js'
import './payments.less'

const Payments = () => {
  type Payment = {
    id: string
    icon: string
    link: string
    type: string
  }

  const [selectPayment, setSelectPayment] = createSignal('')
  const UA = parse(navigator.userAgent)

  onMount(() => {
    document.body.addEventListener('mouseup', (e) => {
      const el = document.querySelector('.payment')
      if (!el) {
      }
    })
  })

  const payments: Array<Payment> = [
    {
      id: 'alipay',
      icon: 'i-ri-alipay-fill',
      link: 'https://qr.alipay.com/fkx16255v3zwdluks1njzaf',
      type: 'qrcode',
    },
    {
      id: 'wechat',
      icon: 'i-ri-wechat-fill',
      link: 'wxp://f2f085vwqGgbZRNf3NN9U9OYu5KCPgKzLTafhM6PX8220e3wKln3_BqE9EB_a4k52Yg0',
      type: 'qrcode',
    },
    {
      id: 'qq',
      icon: 'i-ri-qq-fill',
      link: 'https://i.qianbao.qq.com/wallet/sqrcode.htm?m=tenpay&f=wallet&a=1&ac=CAEQjKObugkY_4zAqQZCIGFmODZmMDU4Njc5MGJiYWRjZGZiMDkyYzIyNzA4ZjI1_xxx_sign&u=2538000780&n=%E4%BA%91%E5%BD%92%E4%BD%95%E5%A4%84%E5%AF%BB',
      type: 'qrcode',
    },
    {
      id: 'qq',
      icon: 'i-ri-qq-fill',
      link: 'https://i.qianbao.qq.com/wallet/sqrcode.htm?m=tenpay&a=1&u=3241748701&ac=CAEQ3dHkiQwYwY7AqQY4AEIgNDI1MjA5ODExMTVhNGQwY2NhZjMwYjUyNTJhMjhmZTY%3D_xxx_sign&n=%E6%88%8A%E6%88%90&f=wallet',
      type: 'qrcode',
    },
  ]

  const Pay = (payment: Payment) => {
    if (payment.type === 'openlink') {
      window.open(payment.link, '_blank')
    } else {
      console.log(UA.device.type)
      if (payment.id === 'alipay' && UA.device.type === 'mobile') {
        window.open(
          // 'alipays://platformapi/startapp?appId=09999988&amp;actionType=toAccount&amp;goBack=NO&amp;amount=0.01&amp;userId=2088822593725849&amp;memo=',
          'alipays://platformapi/startapp?appId=09999988&qrcode=https://qr.alipay.com/fkx16255v3zwdluks1njzaf',
          '_blank'
        )
        return
      }
      setSelectPayment(payment.id)

      setTimeout(() => {
        document
          .querySelector(`.payment-container.${payment.id}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 400)
      // setInLager(true)
    }
  }

  const close = () => {
    setSelectPayment('')
  }

  return (
    <>
      <div class="payments">
        <For each={payments}>
          {(item) => (
            <div
              class={`payment-container ${item.id}`}
              onclick={(e) => {
                if (e.target.classList.contains('close')) {
                  setSelectPayment('')
                  return
                }
                Pay(item)
              }}
              classList={{
                open: selectPayment() === item.id,
              }}
            >
              <div class="payment">
                <div class={`icon ${item.icon}`}></div>
                <img
                  ref={(el) => {
                    const canvas = document.createElement('canvas')
                    QRCode.toCanvas(
                      canvas,
                      item.link,
                      {
                        width: 1000,
                      },
                      (err) => {}
                    )
                    const ctx = canvas.getContext('2d')
                    ctx!.imageSmoothingEnabled = false
                    el.src = canvas.toDataURL('image/png')
                  }}
                  class="qrcode"
                ></img>
                <i onclick={() => close()} class="close i-ri-close-fill"></i>
              </div>
            </div>
          )}
        </For>
      </div>
    </>
  )
}

export { Payments }
