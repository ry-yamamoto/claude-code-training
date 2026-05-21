# CLAUDE.md — example1

Next.js 16 ハンズオン用サブプロジェクト。App Router・TypeScript・Vitest を組み合わせた構成。

## 技術スタック

- **Next.js 16**（App Router / Turbopack）
- **React 19**（Server Components デフォルト）
- **TypeScript 5**
- **ESLint 9**（`eslint-config-next`）
- **Vitest 4**（happy-dom 環境 / `@vitest/coverage-v8`）

## ディレクトリ構成

```
example1/
├── src/
│   ├── app/
│   │   ├── api/health/        # ヘルスチェック API（route.ts）とテスト（route.test.ts）
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── page.module.css
│   │   └── globals.css
│   └── lib/
│       └── types.ts           # 共有型定義（HealthCheckResponse 等）
├── public/
├── vitest.config.ts
├── next.config.ts
├── eslint.config.mjs
├── tsconfig.json
└── package.json
```

## 開発コマンド

```bash
npm run dev          # 開発サーバー（Turbopack）
npm run build        # 本番ビルド
npm start            # 本番起動
npm run lint         # ESLint
npm run test         # テスト（1回実行）
npm run test:watch   # テスト（ウォッチモード）
npm run test:ui      # Vitest UI
npm run test:coverage # カバレッジ計測
```

## アーキテクチャ上の注意点

- `src/app/` 配下は App Router のルート構造。新規ページは `src/app/<route>/page.tsx` に作成する
- デフォルトはサーバーコンポーネント。クライアント処理が必要な場合のみ `"use client"` を付与する
- 型定義は `src/lib/types.ts` に集約する
- API ルートは `src/app/api/<name>/route.ts` に配置し、同ディレクトリにテストを置く

## テスト方針

- テストフレームワーク: Vitest（Jest 互換 API）
- テスト環境: happy-dom
- テストファイルは対象ファイルと同ディレクトリに `*.test.ts(x)` で配置する

## 出力言語

**日本語で出力すること** — 説明・レビュー・コメントはすべて日本語で記述する
