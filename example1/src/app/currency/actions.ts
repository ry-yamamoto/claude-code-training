'use server'

import { type ConversionState, type RateHistoryState } from '@/lib/types';
import { CURRENCIES, CURRENCY_CODES } from '@/lib/currencies';

export async function convertCurrency(
  _prevState: ConversionState,
  formData: FormData,
): Promise<ConversionState> {
  const amountRaw = formData.get('amount');
  const from = String(formData.get('from'));
  const amount = Number(amountRaw);

  if (!amountRaw || isNaN(amount) || amount <= 0) {
    return { status: 'error', message: '正の数値を入力してください' };
  }

  if (!CURRENCY_CODES.has(from)) {
    return { status: 'error', message: '無効な通貨コードです' };
  }

  const targets = CURRENCIES.filter((c) => c.code !== from).map((c) => c.code);

  try {
    const res = await fetch(
      `https://api.frankfurter.app/latest?from=${from}&to=${targets.join(',')}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      return { status: 'error', message: '為替レートの取得に失敗しました' };
    }

    const data: { date: string; rates: Record<string, number> } = await res.json();

    const rates = CURRENCIES
      .filter((c) => c.code !== from)
      .map((c) => ({
        currency: c.code,
        name: c.name,
        rate: data.rates[c.code] ?? 0,
        result: amount * (data.rates[c.code] ?? 0),
      }));

    return { status: 'success', amount, from, date: data.date, rates };
  } catch {
    return { status: 'error', message: 'ネットワークエラーが発生しました' };
  }
}

export async function fetchRateHistory(
  _prevState: RateHistoryState,
  formData: FormData,
): Promise<RateHistoryState> {
  const from = String(formData.get('from'));
  const to = String(formData.get('to'));

  if (!CURRENCY_CODES.has(from) || !CURRENCY_CODES.has(to)) {
    return { status: 'error', message: '無効な通貨コードです' };
  }

  if (from === to) {
    return { status: 'error', message: '換算元と換算先に同じ通貨は選択できません' };
  }

  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);
  const fmt = (d: Date) => d.toISOString().split('T')[0];

  try {
    const res = await fetch(
      `https://api.frankfurter.app/${fmt(start)}..${fmt(end)}?from=${from}&to=${to}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      return { status: 'error', message: 'レート履歴の取得に失敗しました' };
    }

    const data: { rates: Record<string, Record<string, number>> } = await res.json();

    const points = Object.entries(data.rates)
      .sort(([a], [b]) => a.localeCompare(b))
      .flatMap(([date, rates]) => {
        const rate = rates[to];
        return rate !== undefined ? [{ date, rate }] : [];
      });

    return { status: 'success', from, to, points };
  } catch {
    return { status: 'error', message: 'ネットワークエラーが発生しました' };
  }
}
