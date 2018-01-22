import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Padded from './common/Padded.js';

class Aside extends Component {

  render() {
    const titleContainerStyle = {
      display: 'flex',
      background: '#2196F3',
      color: '#fff'
    }
    return (
      <aside className="Aside">
        <Paper>
          <div style={titleContainerStyle}>
            <Padded style={{margin: 'auto', textAlign: 'center'}}>
              <div>
                <span style={{fontSize: 16}}>Follow these simple steps to check all links of your Echo campaign</span>
              </div>
            </Padded>
          </div>
          <Padded>
            <ol>
              <li>Select the brand.</li>
              <li>Enter the Echo Campaign ID and select the default language.</li>
              <li>Provide the Opt In Code for the campaign.</li>
              <li>Choose the related product and start scraping!</li>
            </ol>
          </Padded>
        </Paper>
      </aside>
    )
  }
}

export default Aside;
