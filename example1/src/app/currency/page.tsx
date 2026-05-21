import type { Metadata } from 'next';
import { CurrencyConverter } from './components/CurrencyConverter';
import { RateHistorySection } from './components/RateHistorySection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: '通貨換算ツール',
};

export default function CurrencyPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>通貨換算ツール</h1>
      <p className={styles.description}>
        frankfurter.app のレートを使用（ECBデータ、1時間キャッシュ）
      </p>
      <div className={styles.card}>
        <CurrencyConverter />
        <RateHistorySection />
      </div>
    </main>
  );
}
