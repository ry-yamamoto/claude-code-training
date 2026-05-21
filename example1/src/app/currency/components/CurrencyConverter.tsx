'use client'

import { useActionState, useState } from 'react';
import { type ConversionState } from '@/lib/types';
import { convertCurrency } from '../actions';
import { CurrencySelect } from './CurrencySelector';
import { ConversionResult } from './ConversionResult';
import styles from './CurrencyConverter.module.css';

const INITIAL_STATE: ConversionState = { status: 'idle' };

export function CurrencyConverter() {
  const [from, setFrom] = useState('USD');
  const [state, action, isPending] = useActionState(convertCurrency, INITIAL_STATE);

  return (
    <form action={action} className={styles.form}>
      <div>
        <label htmlFor="amount" className={styles.label}>金額</label>
        <input
          id="amount"
          name="amount"
          type="number"
          min="0"
          step="any"
          placeholder="例: 100"
          className={styles.input}
          required
        />
      </div>

      <CurrencySelect
        id="from"
        name="from"
        value={from}
        label="通貨"
        onChange={setFrom}
      />

      <button type="submit" disabled={isPending} className={styles.submitBtn}>
        {isPending ? '取得中...' : '換算する'}
      </button>

      <ConversionResult state={state} />
    </form>
  );
}
