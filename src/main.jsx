import React from 'react'
import { createRoot } from 'react-dom/client'
import { characters } from './data/characters'
import './styles.css'

function Placeholder({ type, children }) {
  return <div className="placeholder"><span>{type}</span><strong>{children}</strong></div>
}

function CharacterSection({ character, index }) {
  return (
    <section className={`character-detail ${character.palette}`} id={character.id}>
      <div className="character-copy">
        <p className="eyebrow">No. {String(index + 1).padStart(2, '0')}</p>
        <h3>{character.name}</h3>
        <p className="tagline">{character.tagline}</p>
        <p className="intro">{character.intro}</p>
        <div className="mood"><span>视觉氛围</span>{character.visualMood}</div>
        <div className="chips" aria-label={`${character.name}常唱歌曲类型`}>
          {character.songTypes.map((type) => <span key={type}>{type}</span>)}
        </div>
      </div>
      <div className="character-media">
        {character.image ? <img src={character.image} alt={`${character.name}形象展示`} /> : <Placeholder type="人物视觉">形象展示即将上线</Placeholder>}
        <div className="works">
          <h4>{character.pronoun}的代表作品</h4>
          {character.works.map((work) => (
            <article key={work.title}>
              <span>♪</span>
              <div><strong>《{work.title}》</strong><p>作品入口即将上线</p></div>
            </article>
          ))}
        </div>
        <div className="media-grid">
          {character.audio ? <audio src={character.audio} controls /> : <Placeholder type="试听片段">试听片段即将上线</Placeholder>}
          {character.video ? <video src={character.video} controls /> : <Placeholder type="视频展示">视频内容准备中</Placeholder>}
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top">拾光群像</a>
        <nav aria-label="页面导航">
          <a href="#about">关于</a><a href="#characters">人物</a><a href="#footer">后续</a>
        </nav>
      </header>
      <main id="top">
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">虚拟人物音乐企划展示页</p>
            <h1>拾光群像</h1>
            <p className="subtitle">在声音与故事里相遇的人。</p>
            <p className="hero-text">这里收录一组正在成长的虚拟人物。他们有各自的声音、性格、故事和歌曲。有的人属于夜色，有的人属于日常光线；有的人把人带向远处，有的人把灯留到很晚。</p>
            <div className="hero-actions"><a href="#characters">认识他们</a><a href="#about">了解企划</a></div>
          </div>
          <div className="hero-orbit" aria-hidden="true"><span /> <span /> <span /></div>
        </section>
        <section className="about" id="about">
          <p className="eyebrow">About</p>
          <h2>以音乐、影像和故事逐渐生长的虚拟人物。</h2>
          <p>他们不是一次性的角色设定，而是在不同作品中持续出现、被慢慢认识的人。每个人都有自己的情绪底色、讲述方式和适合停留的场景。</p>
        </section>
        <section className="overview" id="characters">
          <div className="section-heading"><p className="eyebrow">Characters</p><h2>四位正在被认识的人</h2></div>
          <div className="cards">
            {characters.map((character) => <a className={`card ${character.palette}`} href={`#${character.id}`} key={character.id}><span>{character.name}</span><strong>{character.tagline}</strong><em>{character.visualMood}</em></a>)}
          </div>
        </section>
        <section className="details" aria-label="人物详情">
          {characters.map((character, index) => <CharacterSection character={character} index={index} key={character.id} />)}
        </section>
      </main>
      <footer id="footer">
        <strong>拾光群像</strong>
        <p>第一版展示页先保留人物、作品与媒体区域。后续补充真实图片、试听片段或视频时，只需更新人物数据文件中的对应字段。</p>
      </footer>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
