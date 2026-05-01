import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import fs from 'node:fs'
import path from 'node:path'

export default defineConfig({
  plugins: [
    {
      name: 'serve-public-pdf',
      enforce: 'pre',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/pdf/') && req.url.endsWith('.pdf')) {
            const filePath = path.join(__dirname, 'public', req.url)
            if (fs.existsSync(filePath)) {
              res.setHeader('Content-Type', 'application/pdf')
              res.setHeader('Content-Disposition', 'inline')
              fs.createReadStream(filePath).pipe(res)
              return
            }
          }
          next()
        })
      },
    },
    tanstackRouter({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
})
