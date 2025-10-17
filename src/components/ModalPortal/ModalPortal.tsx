import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById('modal-root');
    setContainer(el);
  }, []);

  if (!container) return null;
  return createPortal(children, container);
};

export default ModalPortal;
