/* eslint-disable react/jsx-props-no-spreading */
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-tooltip';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { checkEmail, checkPassword } from '../../utils/validation';
import { auth, loginUser, registerNewUser } from '../../utils/firebase';
import { RootState } from '../../app/store';
import ErrorPopUp from '../ErrorPopUp/ErrorPopUp';
import Loader from '../Loader/Loader';

interface IFormComponent {
  headerTitle: string;
  buttonTitle: string;
}

interface ISubmitData {
  email: string;
  password: string;
}

export default function FormComponent(props: IFormComponent): JSX.Element {
  const [user] = useAuthState(auth);
  const { headerTitle, buttonTitle } = props;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubmitData>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const authorizationText = useSelector((state: RootState) => state.authorization.page);

  const onSubmit: SubmitHandler<ISubmitData> = async (data) => {
    setLoading(true);
    if (authorizationText === 'Registration') {
      const error = await registerNewUser(data.email, data.password);
      if (error instanceof Error) {
        toast.custom(<ErrorPopUp message={error.message} />);
        setLoading(false);
      }
    } else {
      const error = await loginUser(data.email, data.password);
      if (error instanceof Error) {
        toast.custom(<ErrorPopUp message={error.message} />);
        setLoading(false);
      }
    }
    if (user) {
      navigate('/graphi-ql');
    }
  };

  return (
    <section className="relative form flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-base_green">
          {t(`AuthorizationPage.${headerTitle}.headerTitle`)}
        </h2>
      </div>
      <Tooltip id="my-tooltip" style={{ fontSize: '1rem', width: '100%', textAlign: 'center' }} />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__item">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              <p className="block text-sm text-gray-900 dark:text-base_white">
                {t(`AuthorizationPage.Email`)}
              </p>
              <input
                {...register('email', {
                  required: `${t(`AuthorizationPage.ErrorMessage.Email`)}`,
                  validate: checkEmail,
                })}
                id="email"
                name="email"
                type="email"
                className="block w-full p-2 mt-1 mb-1 bg-base_white rounded-md border-0 text-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </label>
            {errors.email && (
              <span className="absolute text-red-500 text-sm xs:text-xs xs:w-11/12">
                {errors.email.message}.{' '}
                <span
                  className="cursor-pointer hover:text-base_green_light underline"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={t(`AuthorizationPage.ErrorMessage.Valid`).toString()}
                  data-tooltip-place="top"
                >
                  {t(`AuthorizationPage.ErrorMessage.Example`)}
                </span>
              </span>
            )}
          </div>
          <div className="form__item my-8">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              <p className="block text-sm text-gray-900 dark:text-base_white">
                {t(`AuthorizationPage.Password`)}
              </p>
              <input
                {...register('password', {
                  required: `${t(`AuthorizationPage.ErrorMessage.Password`)}`,
                  validate: checkPassword,
                })}
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                className="block mt-1 mb-2 w-full bg-base_white text-md p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </label>
            {errors.password && (
              <span className="absolute text-red-500 text-sm sm:text-xs sm:w-10/12 xs:text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="mt-12">
            {loading ? (
              <div className="flex w-full justify-center">
                <Loader />
              </div>
            ) : (
              <button
                type="submit"
                className="flex w-full justify-center rounded-md mt-2 p-2 bg-teal-400 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:shadow-yellow-300/60 hover:cursor-pointer active:scale-[95%] transition ease-in-out delay-75"
              >
                {t(`AuthorizationPage.${buttonTitle}.buttonTitle`)}
              </button>
            )}
          </div>
        </form>
      </div>
      <Toaster position="bottom-right" />
    </section>
  );
}
