'use client'

import { CURRENCIES } from '@/lib/currencies';
import styles from './CurrencyConverter.module.css';

interface CurrencySelectProps {
  id: string;
  name: string;
  value: string;
  label: string;
  onChange: (code: string) => void;
}

export function CurrencySelect({ id, name, value, label, onChange }: CurrencySelectProps) {
  return (
    <div>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input type="hidden" name={name} value={value} />
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.select}
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
        ))}
      </select>
    </div>
  );
}
