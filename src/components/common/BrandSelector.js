import React from 'react';

const BrandSelector = props => {
  const {brand, onChange} = props;
  const style = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: 8
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
        <span
          onClick={() => onChange('ce')}
          className={'brand-selector ce' + (brand==='ce' ? ' active' : '')}>CE</span>
        <span
          onClick={() => onChange('ec')}
          className={'brand-selector ec' + (brand==='ec' ? ' active' : '')}>EC</span>
    </div>
  )
}

export default BrandSelector;
