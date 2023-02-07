export function formatNumber(price) {
  const priceFixed = parseFloat((price/100)).toFixed(2);
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(priceFixed);
}