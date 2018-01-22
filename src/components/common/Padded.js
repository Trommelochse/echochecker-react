import React from 'react';
export default (props) => {
  const defaultStyle = {
    padding: props.padding || '16px 24px'
  };
  const style = Object.assign(defaultStyle, props.style);
  return (
    <div className="padded" style={style}>
      {props.children}
    </div>
  )
}
