export const toDateOnly = (value: string): string => new Date(value).toISOString().slice(0, 10);

export const todayForInput = (): string => toDateOnly(new Date().toString());

export const formatDate = (value: string): string =>
    new Date(value).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
