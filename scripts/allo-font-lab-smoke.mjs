import { chromium } from 'playwright'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { strict as assert } from 'node:assert'
import path from 'node:path'

const base = 'http://127.0.0.1:4173/?fontlab=1'
const outDir = path.resolve('artifacts')
await mkdir(outDir, { recursive: true })
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] })
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, acceptDownloads: true })
const errors = []
page.on('pageerror', e => errors.push(e.message))
try {
  const response = await page.goto(base, { waitUntil: 'networkidle', timeout: 30000 })
  assert.equal(response.status(), 200)
  await page.waitForFunction(() =>
    document.querySelector('[role="status"]')?.textContent?.includes('Allo 已加载'),
    null, { timeout: 20000 }
  )
  const fonts = await page.evaluate(() => ({
    loaded: document.fonts.check('700 80px Allo', 'ALLO'),
    active: [...document.fonts].filter(f => f.family.includes('Allo') && f.status === 'loaded').length,
    mainTextFont: getComputedStyle(document.querySelector('.lab-title')).fontFamily,
  }))
  assert.equal(fonts.loaded, true, 'FontFaceSet says Allo is not loaded')
  assert.ok(fonts.active >= 1, 'No Allo font face loaded')
  assert.ok(fonts.mainTextFont.includes('Allo'), 'Canvas text does not use Allo')

  const title = page.locator('input[maxlength="28"]')
  await title.fill('ALLO TYPE')
  const roundness = page.locator('input[type="range"]').nth(1)
  await roundness.focus()
  await roundness.press('End')
  await page.waitForTimeout(200)
  await page.screenshot({ path: path.join(outDir, 'fontlab-ui.png'), fullPage: true })

  const samplePng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLttAAAAABJRU5ErkJggg==', 'base64')
  await page.locator('input[type="file"]').setInputFiles({
    name: 'local-test-background.png', mimeType: 'image/png', buffer: samplePng
  })
  const downloadEvent = page.waitForEvent('download', { timeout: 30000 })
  await page.getByRole('button', { name: /导出 900/ }).click()
  const download = await downloadEvent
  const imagePath = path.join(outDir, 'allo-test-export.png')
  await download.saveAs(imagePath)
  const data = await readFile(imagePath)
  assert.equal(data.subarray(1, 4).toString(), 'PNG', 'Export not PNG')
  const width = data.readUInt32BE(16), height = data.readUInt32BE(20)
  assert.equal(width, 900)
  assert.equal(height, 1350)
  assert.ok(data.length > 3000, 'Suspiciously small image')
  assert.deepEqual(errors, [], 'Browser runtime errors detected')
  const result = { ok:true, fonts, width, height, bytes:data.length }
  await writeFile(path.join(outDir, 'result.json'), JSON.stringify(result, null, 2))
  console.log(JSON.stringify(result, null, 2))
} catch (e) {
  await page.screenshot({ path: path.join(outDir, 'fontlab-failure.png'), fullPage: true }).catch(() => {})
  await writeFile(path.join(outDir, 'error.txt'), String(e) + '\n' + errors.join('\n'))
  throw e
} finally {
  await browser.close()
}
