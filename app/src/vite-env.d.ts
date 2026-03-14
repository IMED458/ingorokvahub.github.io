/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_ADMIN_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
