import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
import { FormComponent } from 'src/components/FormComponent/FormComponent';

enum PageEnum {
  Registration = 'Registration',
  Login = 'Login',
}

export default function AuthorizationPage() {
  const authorizationText = useSelector((state: RootState) => state.authorization.page);

  return (
    <div
      className='m-auto max-w-[600px] text-2xl text-teal-500'
      data-testid='authorization-element'
    >
      {authorizationText === PageEnum.Registration ? (
        <FormComponent
          headerTitle='Registration'
          buttonTitle='Registration'
        />
      ) : (
        <FormComponent
          headerTitle='Login'
          buttonTitle='Login'
        />
      )}
    </div>
  );
}
