import React, { useEffect, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import './font-lab.css'

const W = 900
const H = 1350
const clamp = (n, a, b) => Math.min(b, Math.max(a, n))

export default function FontLab() {
  const [title, setTitle] = useState('ALLO')
  const [subtitle, setSubtitle] = useState('TYPE IS A CHOICE.')
  const [weight, setWeight] = useState(740)
  const [round, setRound] = useState(25)
  const [optical, setOptical] = useState(32)
  const [size, setSize] = useState(190)
  const [textColor, setTextColor] = useState('#171717')
  const [background, setBackground] = useState('#f2eee6')
  const [imageUrl, setImageUrl] = useState('')
  const [status, setStatus] = useState('正在验证 Allo 字体…')
  const [loaded, setLoaded] = useState(false)
  const [exporting, setExporting] = useState(false)
  const fileUrl = useRef('')
  const poster = useRef(null)

  useEffect(() => {
    let disposed = false
    document.fonts.load('700 80px Allo', 'ALLO').then((faces) => {
      if (disposed) return
      const ok = faces.length > 0 && document.fonts.check('700 80px Allo', 'ALLO')
      setLoaded(ok)
      setStatus(ok ? 'Allo 已加载：可以导出 PNG' : '字体尚未加载：检查依赖构建与网络')
    }).catch(() => {
      if (!disposed) setStatus('字体加载失败：请检查浏览器开发者工具')
    })
    return () => {
      disposed = true
      if (fileUrl.current) URL.revokeObjectURL(fileUrl.current)
    }
  }, [])

  const setImage = (file) => {
    if (fileUrl.current) URL.revokeObjectURL(fileUrl.current)
    if (!file) { fileUrl.current = ''; setImageUrl(''); return }
    if (!file.type.startsWith('image/')) { setStatus('请选择图片格式的文件'); return }
    fileUrl.current = URL.createObjectURL(file)
    setImageUrl(fileUrl.current)
  }

  const exportPng = async () => {
    if (!loaded || !poster.current || exporting) return
    setExporting(true)
    setStatus('正在导出 900 × 1350 PNG…')
    try {
      await document.fonts.ready
      const dataUrl = await toPng(poster.current, {
        width: W, height: H, pixelRatio: 1, cacheBust: false,
        backgroundColor: background,
      })
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = 'allo-typography-900x1350.png'
      document.body.appendChild(a)
      a.click()
      a.remove()
      setStatus('已生成 900 × 1350 PNG')
    } catch (error) {
      setStatus('导出失败：' + (error?.message || String(error)))
    } finally {
      setExporting(false)
    }
  }

  const titleStyle = {
    fontWeight: weight,
    fontSize: size,
    fontVariationSettings: `"wght" ${weight}, "ROND" ${round}, "opsz" ${optical}`,
    color: textColor,
  }

  return (
    <div className="allo-lab">
      <div className="allo-lab-head">
        <a href="./" aria-label="返回拾光群像">← 拾光群像</a>
        <span>ALLO / TYPE LAB</span>
        <span className={loaded ? 'lab-ok' : 'lab-wait'} role="status">{status}</span>
      </div>
      <div className="allo-lab-grid">
        <aside className="allo-lab-controls">
          <p className="lab-kicker">PRIVATE TEST / NOT A PUBLIC RELEASE</p>
          <h1>字体实验室</h1>
          <p className="lab-description">使用真实 Allo 可变字体排版。背景图片仅在你的浏览器中处理，不上传服务器。</p>
          <label>主标题 <input value={title} maxLength={28} onChange={e => setTitle(e.target.value)} /></label>
          <label>副标题 <input value={subtitle} maxLength={54} onChange={e => setSubtitle(e.target.value)} /></label>
          {[
            ['字重', weight, setWeight, 100, 900, 10],
            ['圆润度', round, setRound, 0, 100, 1],
            ['光学尺寸', optical, setOptical, 9, 32, 1],
            ['标题字号', size, setSize, 60, 280, 5],
          ].map(([label, value, setter, min, max, step]) => (
            <label key={label}>{label} <strong>{value}</strong>
              <input type="range" min={min} max={max} step={step} value={value}
                onChange={e => setter(clamp(Number(e.target.value), min, max))} />
            </label>
          ))}
          <div className="lab-palette">
            <label>文字颜色 <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} /></label>
            <label>背景颜色 <input type="color" value={background} onChange={e => setBackground(e.target.value)} /></label>
          </div>
          <label>可选背景图片 <input type="file" accept="image/*" onChange={e => setImage(e.target.files?.[0])} /></label>
          {imageUrl && <button type="button" className="lab-clear" onClick={() => setImage(null)}>移除背景图片</button>}
          <button type="button" className="lab-download" disabled={!loaded || exporting} onClick={exportPng}>
            {exporting ? '导出中…' : '导出 900 × 1350 PNG'}
          </button>
          <p className="lab-note">本实验页只在地址加上 <code>?fontlab=1</code> 时出现。原网站页面布局和中文主字体不变。</p>
        </aside>
        <div className="allo-lab-stage">
          <div className="allo-lab-scale">
            <div className="allo-poster" ref={poster} style={{backgroundColor: background}}>
              {imageUrl && <img className="lab-background" src={imageUrl} alt="" />}
              <div className="lab-image-shade" />
              <div className="lab-poster-content">
                <div className="lab-topline" style={{color: textColor}}>SHIGUANG / TYPOGRAPHY TEST <span>01 / 03</span></div>
                <div className="lab-middle">
                  <div className="lab-overline" style={{color: textColor}}>ALLO VARIABLE TYPEFACE</div>
                  <div className="lab-title" style={titleStyle}>{title || ' '}</div>
                  <div className="lab-rule" style={{background: textColor}} />
                  <div className="lab-subtitle" style={{color: textColor}}>{subtitle}</div>
                </div>
                <div className="lab-bottomline" style={{color: textColor}}>
                  <span>拾光群像</span><span>FONT STUDY · 2:3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
