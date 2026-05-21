---
name: review
description: example1（Next.js 16 / React 19 / TypeScript）のコードを、App Router・Server Components・型安全性・セキュリティ・パフォーマンスの観点でレビューし、問題点と改善提案を日本語で報告する
allowed-tools: Read, Grep, Glob
---

`example1` プロジェクトの対象ファイルをコードレビューしてください。

## レビュー観点

### 1. Next.js 16 / App Router ベストプラクティス
- Server Components をデフォルトとし、`"use client"` は本当に必要な箇所のみ
- ファイル規約（`layout.tsx`, `page.tsx`, `route.ts` 等）が守られているか
- API ルートは `src/app/api/<name>/route.ts` に配置されているか
- 新規ページは `src/app/<route>/page.tsx` に作成されているか

### 2. TypeScript
- `any` 型を使っていないか
- Props に型定義があるか
- 共有型は `src/lib/types.ts` に集約されているか
- 型の再利用性・一貫性

### 3. パフォーマンス
- 不要な `"use client"` ディレクティブがないか
- 動的インポートの活用余地
- `next/image` による画像最適化

### 4. セキュリティ
- 環境変数の管理（`NEXT_PUBLIC_` プレフィックスの適切な使用）
- XSS の可能性がある箇所
- 外部入力の検証

### 5. コード品質
- コンポーネントは 200 行以下か
- 重複コードがないか
- 命名規則（コンポーネントは PascalCase、変数・関数は camelCase）

### 6. テスト
- テストファイルが対象ファイルと同ディレクトリに `*.test.ts(x)` で存在するか
- Vitest を使用しているか

## 出力形式

レビュー結果を日本語で以下の形式で報告してください：

1. **総評**
2. **問題点**（優先度: 高→中→低 の順）
   - 問題の説明
   - 該当箇所（ファイルパス:行番号）
   - 修正案（コード例付き）
3. **改善提案**
4. **良い点**
