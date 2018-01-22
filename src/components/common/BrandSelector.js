import React from 'react';

const BrandSelector = props => {
  const {brand, onChange} = props;
  const style = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)'
  }
  return(
    <div style={style}>
        <span
          onClick={() => onChange('be')}
          className={'brand-selector be' + (brand==='be' ? ' active' : '')}>BE</span>
        <span
          onClick={() => onChange('nb')}
          className={'brand-selector nb' + (brand==='nb' ? ' active' : '')}>NB</span>
        <span
          onClick={() => onChange('bs')}
          className={'brand-selector bs' + (brand==='bs' ? ' active' : '')}>BS</span>
    </div>
  )
}

export default BrandSelector;
