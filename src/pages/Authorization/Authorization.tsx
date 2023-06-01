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
      className='text-teal-500 m-auto text-2xl max-w-[600px]'
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
