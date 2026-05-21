export const CURRENCIES = [
  { code: 'USD', name: '米ドル' },
  { code: 'JPY', name: '日本円' },
  { code: 'EUR', name: 'ユーロ' },
  { code: 'GBP', name: '英ポンド' },
  { code: 'CHF', name: 'スイスフラン' },
  { code: 'AUD', name: '豪ドル' },
  { code: 'CAD', name: 'カナダドル' },
  { code: 'CNY', name: '人民元' },
  { code: 'HKD', name: '香港ドル' },
  { code: 'KRW', name: '韓国ウォン' },
  { code: 'SGD', name: 'シンガポールドル' },
] as const;

export type Currency = (typeof CURRENCIES)[number];

export const CURRENCY_CODES: Set<string> = new Set(CURRENCIES.map((c) => c.code));
