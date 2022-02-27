import React from "react";

const IconWrapper = ({ Icon, className, onAction }) => {
  return <Icon className={className} onClick={onAction} />;
};

export default IconWrapper;
