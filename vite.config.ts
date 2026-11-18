import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.PAGES_BASE_PATH ? `${process.env.PAGES_BASE_PATH.replace(/\/$/, '')}/` : '/',
  server: { fs: { deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/.local-assets/**'] } },
  plugins: [
    react(),
    {
      name: 'portfolio-images',
      resolveId(id) {
        if (id === 'virtual:portfolio-images') return '\0' + id
      },
      load(id) {
        if (id !== '\0virtual:portfolio-images') return
        const directory = resolve('public/images')
        const images = readdirSync(directory, { recursive: true, withFileTypes: true })
          .filter((file) => file.isFile() && /\.(webp|jpe?g|png)$/i.test(file.name))
          .map((file) => 'images/' + resolve(file.parentPath, file.name).slice(directory.length + 1).replaceAll('\\', '/'))
        return `export default ${JSON.stringify(images)}`
      },
    },
  ],
})
