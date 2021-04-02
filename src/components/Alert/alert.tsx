import React from 'react'
import classNames from 'classnames'

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Dangeer = 'danger',
  Warning = 'warning'
}



const Alert: React.FC = (props) => {
  const {
    alertType
  } = props
  const classes = classNames('alert', {
    [`alert-${alertType}`]: alertType
  })
  return (
    <div>
      <span>this is alert!</span>
    </div>
  )
}

export default Alert