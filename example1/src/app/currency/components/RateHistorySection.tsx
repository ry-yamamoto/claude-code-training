'use client'

import { useActionState, useState } from 'react';
import { type RateHistoryState } from '@/lib/types';
import { fetchRateHistory } from '../actions';
import { CurrencySelect } from './CurrencySelector';
import { RateChart } from './RateChart';
import styles from './CurrencyConverter.module.css';

const INITIAL_STATE: RateHistoryState = { status: 'idle' };

export function RateHistorySection() {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('JPY');
  const [state, action, isPending] = useActionState(fetchRateHistory, INITIAL_STATE);

  return (
    <section className={styles.historySection}>
      <h2 className={styles.sectionTitle}>レート推移グラフ（過去30日）</h2>
      <form action={action} className={styles.historyForm}>
        <div className={styles.historySelectors}>
          <CurrencySelect id="history-from" name="from" value={from} label="換算元" onChange={setFrom} />
          <span className={styles.historyArrow}>→</span>
          <CurrencySelect id="history-to" name="to" value={to} label="換算先" onChange={setTo} />
          <button type="submit" disabled={isPending} className={styles.historyBtn}>
            {isPending ? '取得中...' : '表示'}
          </button>
        </div>
        {state.status === 'error' && (
          <div className={styles.error}>{state.message}</div>
        )}
      </form>
      {state.status === 'success' && (
        <RateChart points={state.points} from={state.from} to={state.to} />
      )}
    </section>
  );
}
