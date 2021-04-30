import React from 'react'
import classNames from 'classnames'

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Dangeer = 'danger',
  Warning = 'warning'
}

interface BaseAlertProps {
  className?: string;
  title?: string;
  descriptor?: string;
  'close-text'?: string;
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const {
    className,
    alertType,
    title,
    description,
    ...restProps
  } = props
  const classes = classNames('alert', className, {
    [`alert-${alertType}`]: alertType
  })
  const closePopup = (e) => {
    e.target.parentNode.style.display = "none";
  }
  return (
    <div className={classes}>
      <span className="title">{title}</span>
      <div 
        className={["close", restProps['close-text'] ? "text": "cross"].join(" ")} 
        onClick={closePopup}
      >{restProps['close-text']}</div>
      <div className="description">{description}</div>
    </div>
  )
}

export default Alert