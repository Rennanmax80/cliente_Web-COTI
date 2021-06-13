export const formatDate = (value) => {
  return new Intl.DateTimeFormat(
      'pt-BR',
      {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
      }
  ).format(new Date(value))
}
