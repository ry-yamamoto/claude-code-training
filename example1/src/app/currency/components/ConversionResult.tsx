import type { ConversionState } from '@/lib/types';
import styles from './CurrencyConverter.module.css';

const NO_DECIMAL_CURRENCIES = new Set(['JPY', 'KRW']);

function formatAmount(value: number, currency: string): string {
  return value.toLocaleString('ja-JP', {
    maximumFractionDigits: NO_DECIMAL_CURRENCIES.has(currency) ? 0 : 2,
  });
}

interface ConversionResultProps {
  state: ConversionState;
}

export function ConversionResult({ state }: ConversionResultProps) {
  if (state.status === 'idle') return null;

  if (state.status === 'error') {
    return <div className={styles.error}>{state.message}</div>;
  }

  return (
    <div className={styles.resultTable}>
      <div className={styles.resultHeader}>
        {formatAmount(state.amount, state.from)} {state.from} の換算結果
        <span className={styles.rateDate}>（レート取得日: {state.date}）</span>
      </div>
      <table className={styles.table}>
        <tbody>
          {state.rates.map(({ currency, name, rate, result }) => (
            <tr key={currency} className={styles.tableRow}>
              <td className={styles.cellCode}>{currency}</td>
              <td className={styles.cellName}>{name}</td>
              <td className={styles.cellAmount}>{formatAmount(result, currency)}</td>
              <td className={styles.cellRate}>
                1 {state.from} = {rate.toLocaleString('ja-JP', { maximumFractionDigits: 4 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
