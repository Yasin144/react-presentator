import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-root-files',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/' || req.url.startsWith('/src') || req.url.startsWith('/@') || req.url.startsWith('/node_modules')) {
            return next()
          }
          const filePath = path.join(__dirname, req.url.split('?')[0])
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.writeHead(200)
            fs.createReadStream(filePath).pipe(res)
            return
          }
          next()
        })
      }
    }
  ],
})
