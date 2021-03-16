import { join } from "path";
import { defineConfig,Plugin } from 'vite'
import { dft } from "./extenal-packages";

// {chrome:87,node:12}
// https://vitejs.dev/config/
export default defineConfig({
  root:join(__dirname,'../../../'),
//   base:'./',
  optimizeDeps:{
    exclude:["Stats","Dirent","fs",'path','electron-window-state','electron']
  },
  build:{
    target:`node12`,
    outDir:'./',
    lib:{
      entry:'index.ts',
      formats:['cjs']
    },
    minify:false,
    rollupOptions: {
        external: dft,
        output: {
          entryFileNames: '[name].[format].js',
          chunkFileNames: '[name].[format].js',
          assetFileNames: '[name].[ext]',
        },
      },
    emptyOutDir: false,
  }
})
