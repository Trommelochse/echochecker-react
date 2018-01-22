import React, {Component} from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import CampaignInputForm from './CampaignInputForm.js'

const style = {
  gridColumn: 'span 8'
}

class Main extends Component {

  render() {
    return (
      <div className="Main" style={style}>
        <CampaignInputForm {...this.props} />
        {
          this.props.isLoading ?
          <LinearProgress mode="indeterminate"/> : null
        }
      </div>
    )
  }
}

export default Main;
