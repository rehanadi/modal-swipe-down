import React, { ReactNode } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const openModal = () => {
    api.start({ y: 0 });
  };

  const closeModal = (velocity = 0) => {
    api.start({
      y: window.innerHeight,
      config: { tension: 200 + velocity * 200, friction: 30 },
      onResolve: onClose,
    });
  };

  const bind = useDrag(({ active, movement: [, my], velocity, direction: [, dy] }) => {
    if (active && dy > 0) {
      api.start({ y: my, immediate: true });
    } else if (!active && my > 100) {
      closeModal(Number(velocity));
    } else {
      openModal();
    }
  });

  React.useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen]);

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <animated.div
        {...bind()}
        className="modal"
        style={{ y }}
      >
        <div className="modal-header">
          <div className="modal-drag-handle" />
        </div>
        <div className="modal-content">
          {children}
        </div>
      </animated.div>
    </div>
  );
};

export default Modal;
