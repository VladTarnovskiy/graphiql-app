import { createPortal } from 'react-dom';
import { Dispatch, FC, SetStateAction, useRef, useState, MouseEvent, KeyboardEvent } from 'react';
import style from './modal.module.scss';

interface ModalErrorBoundary {
  children: string | JSX.Element[] | JSX.Element;
  setCloseFlag: Dispatch<SetStateAction<boolean>>;
}

export const Modal: FC<ModalErrorBoundary> = ({ setCloseFlag, children }) => {
  const modalWindow = useRef<HTMLDivElement>(null);
  const [modal, setModal] = useState(true);

  const closeModalWindow = () => {
    setModal(false);
    setCloseFlag(false);
  };

  const closeWithOverlayClick = (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const modalEl = modalWindow.current;

    if (modalEl?.contains && !modalEl.contains(target)) {
      closeModalWindow();
    }
  };

  return createPortal(
    modal && (
      <div
        className={style.overlay}
        onClick={closeWithOverlayClick}
        onKeyDown={closeWithOverlayClick}
        role='button'
        tabIndex={0}
      >
        <div
          className={style.container}
          ref={modalWindow}
        >
          {children}
        </div>
      </div>
    ),
    document.body,
  );
};
