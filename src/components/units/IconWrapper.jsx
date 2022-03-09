import React from "react";

const IconWrapper = ({ title, Icon, className, onAction }) => {
  return (
    <div title={title}>
      <Icon className={className} onClick={onAction} />
    </div>
  );
};

export default IconWrapper;
