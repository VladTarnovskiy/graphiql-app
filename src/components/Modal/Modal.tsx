import ReactDOM from 'react-dom';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import style from './modal.module.scss';

interface MyProps {
  children: string | JSX.Element[] | JSX.Element;
  setCloseFlag: Dispatch<SetStateAction<boolean>>;
}

function Modal(props: MyProps): JSX.Element {
  const { setCloseFlag } = props;
  const modalWindow = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState(true);

  const closeModalWindow = () => {
    setModal(false);
    setCloseFlag(false);
  };

  const closeWithOverlayClick = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    const target = e.target as HTMLDivElement;
    const modalEl = modalWindow.current;
    if (modalEl?.contains && !modalEl.contains(target)) {
      closeModalWindow();
    }
  };

  return ReactDOM.createPortal(
    modal && (
      <div
        className={style.overlay}
        onClick={closeWithOverlayClick}
        onKeyDown={closeWithOverlayClick}
        role="button"
        tabIndex={0}
      >
        <div className={style.container} ref={modalWindow}>
          {props.children}
        </div>
      </div>
    ),
    document.body
  );
}

export default Modal;
