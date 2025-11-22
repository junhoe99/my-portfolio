import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포를 위해 base 경로 설정.
  // 사용자 도메인(username.github.io)인 경우 '/' 
  // 프로젝트 리포지토리(username.github.io/repo)인 경우 '/repo/' 로 설정해야 함.
  // HashRouter를 사용하므로 상대 경로('./')를 사용하면 대부분의 경우 문제없이 동작합니다.
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});