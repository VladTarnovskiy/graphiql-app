/* eslint-disable react/jsx-props-no-spreading */
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IFormComponent, ISubmitData } from '../../types/interfaces';
import checkEmail from '../../utils/validation';
import { auth, loginUser, registerNewUser } from '../../utils/firebase';
import { RootState } from '../../app/store';

export default function FormComponent(props: IFormComponent): JSX.Element {
  const [user] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const { headerTitle, buttonTitle } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubmitData>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const authorizationText = useSelector((state: RootState) => state.authorization.page);

  const onSubmit: SubmitHandler<ISubmitData> = async (data) => {
    if (authorizationText === 'Registration') {
      const error = await registerNewUser(data.email, data.password);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } else {
      const error = await loginUser(data.email, data.password);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
    if (user) {
      navigate('/graphi-ql');
    }
  };

  return (
    <div className="form flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-base_green">
          {t(`AuthorizationPage.${headerTitle}.headerTitle`)}
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__item">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              <p className="block text-sm text-gray-900 dark:text-base_white">{t(`AuthorizationPage.Email`)}</p>
              <input
                {...register('email', {
                  required: 'Input email',
                  validate: checkEmail,
                })}
                id="email"
                name="email"
                type="email"
                className="block w-full p-2 mt-1 bg-base_white rounded-md border-0 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </label>
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
          <div className="form__item">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              <p className="block text-sm text-gray-900 dark:text-base_white">{t(`AuthorizationPage.Password`)}</p>
              <input
                {...register('password', {
                  required: 'Input password',
                })}
                id="password"
                name="password"
                type="password"
                className="block mt-1 w-full bg-base_white text-md p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </label>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md p-2 bg-teal-400 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:shadow-yellow-300/60 hover:cursor-pointer active:scale-[95%] transition ease-in-out delay-75"
            >
              {t(`AuthorizationPage.${buttonTitle}.headerTitle`)}
            </button>
          </div>
        </form>
        {errorMessage && <span>{errorMessage.replace('Firebase:', '')}</span>}
      </div>
    </div>
  );
}
