const showFormattedDateTime = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};
   
export { showFormattedDateTime };