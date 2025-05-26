import { Modal as MModal, ModalProps } from '@mantine/core';

const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  return <MModal {...props}>{children}</MModal>;
};

export default Modal;
