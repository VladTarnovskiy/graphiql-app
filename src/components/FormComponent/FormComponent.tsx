/* eslint-disable react/jsx-props-no-spreading */
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IFormComponent, ISubmitData } from '../../types/interfaces';
import checkEmail from '../../utils/validation';
import { auth, loginUser, registerNewUser } from '../../utils/firebase';
import { RootState } from '../../app/store';

export default function FormComponent(props: IFormComponent): JSX.Element {
  const [user] = useAuthState(auth);
  const { headerTitle, buttonTitle } = props;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubmitData>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const authorizationText = useSelector((state: RootState) => state.authorization.page);

  const onSubmit: SubmitHandler<ISubmitData> = async (data) => {
    if (authorizationText === 'Registration') {
      await registerNewUser(data.email, data.password);
    } else {
      await loginUser(data.email, data.password);
    }
    if (user) {
      navigate('/graphi-ql');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {headerTitle}
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
              <div className="mt-2">
                <input
                  {...register('email', {
                    required: 'Input email',
                    validate: checkEmail,
                  })}
                  id="email"
                  name="email"
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </label>
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="block text-sm font-medium leading-6 text-gray-900">Password</p>
            </div>
            <div className="mt-2">
              <input
                {...register('password', {
                  required: 'Input password',
                })}
                id="password"
                name="password"
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-teal-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {buttonTitle}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
