import React, { ReactNode, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import s from '@/styles/Modal.module.css'
import { FaTimes } from 'react-icons/fa'

type Props = {
  title: string
  children: ReactNode
  show: boolean
  onClose: () => void
}

function Modal({ title, children, show, onClose }: Props) {
  const [isBrowser, setIsBrowser] = useState(false)

  const handleClose = () => {
    onClose()
  }

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const modalContent = show ? (
    <div
      className={s.backdrop}
      onClick={() => {
        // close modal when outside of modal is clicked
        onClose()
      }}
    >
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.header}>
          <a href='#' onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <h2>{title}</h2>}
        <hr />
        <div className={s.body}>{children}</div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')!
    )
  } else {
    return null
  }
}

export default Modal
