import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-tooltip';
import { toast, Toaster } from 'react-hot-toast';
import { FC, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { checkEmail, checkPassword } from 'src/utils/validation';
import { auth, loginUser, registerNewUser } from 'src/utils/firebase';
import { RootState } from 'src/app/store';
import { ErrorPopUp } from '../ErrorPopUp/ErrorPopUp';

interface FormComponentProps {
  headerTitle: string;
  buttonTitle: string;
}

interface SubmitData {
  email: string;
  password: string;
}

enum PageEnum {
  Registration = 'Registration',
  Login = 'Login',
}

export const FormComponent: FC<FormComponentProps> = ({ headerTitle, buttonTitle }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitData>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const authorizationText = useSelector((state: RootState) => state.authorization.page);

  const onSubmit: SubmitHandler<SubmitData> = async (data) => {
    setLoading(true);

    if (authorizationText === PageEnum.Registration) {
      const error = await registerNewUser(data.email, data.password);

      if (error instanceof Error) {
        toast.custom(<ErrorPopUp message={error.message} />);
        setLoading(false);
      }
    }

    if (authorizationText === PageEnum.Login) {
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
    <section className='form relative flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-4'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-base_green'>
          {t(`AuthorizationPage.${headerTitle}.headerTitle`)}
        </h2>
      </div>
      <Tooltip
        id='my-tooltip'
        style={{ fontSize: '1rem', width: '100%', textAlign: 'center' }}
      />
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form
          className=''
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='form__item'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-900'
            >
              <p className='block text-sm text-gray-900 dark:text-base_white'>
                {t(`AuthorizationPage.Email`)}
              </p>
              <input
                {...register('email', {
                  required: `${t(`AuthorizationPage.ErrorMessage.Email`)}`,
                  validate: checkEmail,
                })}
                id='email'
                name='email'
                type='email'
                className='text-md mb-1 mt-1 block w-full rounded-md border-0 bg-base_white p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
              />
            </label>
            {errors.email && (
              <span className='absolute text-sm text-red-500 xs:w-11/12 xs:text-xs'>
                {errors.email.message}.{' '}
                <span
                  className='cursor-pointer underline hover:text-base_green_light'
                  data-tooltip-id='my-tooltip'
                  data-tooltip-content={t(`AuthorizationPage.ErrorMessage.Valid`).toString()}
                  data-tooltip-place='top'
                >
                  {t(`AuthorizationPage.ErrorMessage.Example`)}
                </span>
              </span>
            )}
          </div>
          <div className='form__item my-8'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-900'
            >
              <p className='block text-sm text-gray-900 dark:text-base_white'>
                {t(`AuthorizationPage.Password`)}
              </p>
              <input
                {...register('password', {
                  required: `${t(`AuthorizationPage.ErrorMessage.Password`)}`,
                  validate: checkPassword,
                })}
                id='password'
                name='password'
                type='password'
                autoComplete='off'
                className='text-md mb-2 mt-1 block w-full rounded-md border-0 bg-base_white p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
              />
            </label>
            {errors.password && (
              <span className='absolute text-sm text-red-500 sm:w-10/12 sm:text-xs xs:text-xs'>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className='mt-12'>
            {loading ? (
              <div className='mt-2 flex w-full justify-center rounded-md bg-teal-400 p-2 px-3 text-sm font-semibold leading-6 text-white shadow-sm  transition delay-75 ease-in-out'>
                <ThreeDots
                  height='24'
                  width='100%'
                  radius='10'
                  color='#fff'
                  ariaLabel='three-dots-loading'
                  wrapperStyle={{}}
                  visible
                />
              </div>
            ) : (
              <button
                type='submit'
                className='mt-2 flex w-full justify-center rounded-md bg-teal-400 p-2 px-3 text-sm font-semibold leading-6 text-white shadow-sm transition delay-75 ease-in-out hover:cursor-pointer hover:shadow-yellow-300/60 active:scale-[95%]'
              >
                {t(`AuthorizationPage.${buttonTitle}.buttonTitle`)}
              </button>
            )}
          </div>
        </form>
      </div>
      <Toaster position='bottom-right' />
    </section>
  );
};
