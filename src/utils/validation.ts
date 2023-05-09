export default function checkEmail(data: string) {
  const emailDomains = ['@gmail.com', '@yahoo.com', '@hotmail.com', '@yandex.ru', '@mail.ru'];
  const domain = data.slice(data.indexOf('@'));
  const validEmail = emailDomains.includes(domain);
  if (!validEmail) {
    return 'Invalided email domain';
  }
  return true;
}
