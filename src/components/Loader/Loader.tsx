import './loader.scss';

function Loader(): JSX.Element {
  return (
    <div className="lds-roller" data-testid="lds-roller">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default Loader;
