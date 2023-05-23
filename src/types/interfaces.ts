export interface IFormComponent {
  headerTitle: string;
  buttonTitle: string;
}

export interface ISubmitData {
  email: string;
  password: string;
}

export interface IButtonProps {
  title: string;
  button?: boolean;
}

export interface IErrorPopUp {
  message: string;
}
export interface IPrivateRoute {
  children: JSX.Element;
}
