
export function sendEmail(data: any) {
    const apiEndpoint = '/api/email';
    const { lolgotcha } = data
    console.log('Bot detected', lolgotcha)
    if (lolgotcha) return false

  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      return true
    })
    .catch((err) => {
      return false
    });
}