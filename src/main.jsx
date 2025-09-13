// src/main.jsx
import liff from '@line/liff'

const liffId = import.meta.env.VITE_LIFF_ID

async function bootstrap() {
  try {
    if (!liffId) throw new Error('VITE_LIFF_ID is missing')
    await liff.init({ liffId })
    await liff.ready  // LIFFの起動を待つ（LINE外ブラウザでも安全）
  } catch (e) {
    // 失敗してもデモは動かしたいので、コンソールに出して続行
    console.warn('LIFF init failed, continue as normal demo:', e)
  }
  const { default: renderApp } = await import('./renderApp.jsx')
  renderApp()
}
bootstrap()