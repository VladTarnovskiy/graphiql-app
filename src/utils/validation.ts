import { t } from 'i18next';

const checkEmail = (data: string) => {
  const emailDomains = ['@gmail.com', '@yahoo.com', '@hotmail.com', '@yandex.ru', '@mail.ru'];
  const domain = data.slice(data.indexOf('@'));
  const email = data.slice(0, data.indexOf('@'));

  if (email.length < 8) {
    return `${t('AuthorizationPage.ErrorMessage.ToShort')}`;
  }
  const validEmail = emailDomains.includes(domain);
  if (!validEmail) {
    return t('AuthorizationPage.ErrorMessage.EmailDomain');
  }
  return true;
};

const checkPassword = (password: string) => {
  const reg = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])/g;
  if (password.length < 8) {
    return `${t('AuthorizationPage.ErrorMessage.ToShort')}`;
  }
  if (!reg.test(password)) {
    return `${t('AuthorizationPage.ErrorMessage.Symbols')}`;
  }
  return true;
};

export { checkEmail, checkPassword };
