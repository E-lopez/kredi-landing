import { useModal, useModalDispatch } from "@/stores/modals/ModalStore";
import{ default as DefaultButton } from "../button/Button";

const ModalComponent = () => {
  const modal: any = useModal();
  const dispatch = useModalDispatch();
  const { cssModifier } = modal;

  const hideModal = () => {
    dispatch({
      type: 'HIDE_MODAL',
    })
  }

  if(!modal.visible) return <></>;
  return(
    <dialog className={`base-modal__main ${cssModifier}`} >
      <button 
        className={`base-modal__close-button ${cssModifier}__close-button`}
        onClick={hideModal}
      >
        <i className='bi-x-lg'></i>
      </button>
      <div className={`u-center-v base-modal__content ${cssModifier}__content`}>
        {modal.content}
        <DefaultButton 
          method={hideModal} 
          label='Close'
          cssModifier="base-button--dark" 
        />
      </div>
    </dialog>
  )
}

export default ModalComponent;