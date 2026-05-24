import sharp from '../node_modules/sharp/lib/index.js'
import { readdir, stat } from 'fs/promises'
import { join, extname, basename } from 'path'

const PUBLIC_DIR = new URL('../public', import.meta.url).pathname

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await getFiles(full)))
    } else {
      files.push(full)
    }
  }
  return files
}

async function compress() {
  const files = await getFiles(PUBLIC_DIR)
  const images = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f))

  console.log(`Found ${images.length} images to compress\n`)

  let totalBefore = 0
  let totalAfter = 0

  for (const file of images) {
    const before = (await stat(file)).size
    totalBefore += before

    try {
      const ext = extname(file).toLowerCase()
      const isJpg = ext === '.jpg' || ext === '.jpeg'
      const isPng = ext === '.png'

      let pipeline = sharp(file)

      if (isJpg) {
        pipeline = pipeline.jpeg({ quality: 80, progressive: true, mozjpeg: true })
      } else if (isPng) {
        pipeline = pipeline.png({ compressionLevel: 9, palette: true })
      }

      const buffer = await pipeline.toBuffer()
      const after = buffer.length

      // Only overwrite if we actually made it smaller
      if (after < before) {
        await sharp(buffer).toFile(file)
        const saved = ((before - after) / before * 100).toFixed(1)
        const beforeKB = (before / 1024).toFixed(0)
        const afterKB = (after / 1024).toFixed(0)
        console.log(`✓ ${basename(file)}: ${beforeKB}KB → ${afterKB}KB (-${saved}%)`)
        totalAfter += after
      } else {
        console.log(`- ${basename(file)}: already optimal (${(before/1024).toFixed(0)}KB)`)
        totalAfter += before
      }
    } catch (err) {
      console.error(`✗ ${basename(file)}: ${err.message}`)
      totalAfter += before
    }
  }

  console.log(`\n✅ Total: ${(totalBefore/1024).toFixed(0)}KB → ${(totalAfter/1024).toFixed(0)}KB (saved ${((totalBefore-totalAfter)/1024).toFixed(0)}KB)`)
}

compress()
