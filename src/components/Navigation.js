import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';


class Navigation extends Component {

  getBrandStyle(brand, style) {
    if (brand === 'be') {
      return Object.assign(style, {background: '#F60'})
    }
    if (brand === 'nb') {
      return Object.assign(style, {background: '#006EB4'})
    }
    if (brand === 'bs') {
      return Object.assign(style, {background: '#0F0F0F'})
    }
    if (brand === 'ce') {
      return Object.assign(style, {background: '#1F294A'})
    }
    if (brand === 'ec') {
      return Object.assign(style, {background: '#213D7E'})
    }
    return style
  }

  render() {
    const {brand} = this.props;
    const style = {
      background: '#006EB4',
      marginBottom: '1.5rem',
      transitionDuration: '750ms'
    }
    return (
      <div className="Navigation">
        <AppBar
          title={'test'}
          showMenuIconButton={false}
          style={this.getBrandStyle(brand, style)}
          {...this.props}
          />
      </div>
    )
  }
}

export default Navigation;
