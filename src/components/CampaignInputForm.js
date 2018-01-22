import React, {Component} from 'react'

import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import LinearProgress from 'material-ui/LinearProgress'
import BrandSelector from './common/BrandSelector.js'
import IconTextField from './common/IconTextField.js'
import InputWithIcon from './common/InputWithIcon.js'
import Padded from './common/Padded.js'

import data from '../data/'

class CampaignInputForm extends Component {

  render() {
    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gridGap: '16px',
      maxWidth: '100%'
    }

    const {
      brand,
      campaignId,
      dkMode,
      product,
      defaultLanguage,
      onChangeBrand,
      onToggleDkMode,
      onChangeCampaignId,
      onChangeOptInCode,
      onChangeProduct,
      onChangeDefaultLanguage,
      onScrapeLinks,
      optInCode
    } = this.props
    const brandData = data[brand]

    return (
      <div className="CampaignInputForm">
        <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gridGap: '0 16px',
            marginBottom: 24
          }}>
          <Paper>
            <Padded>
              <h3>Brand:</h3>
                <BrandSelector brand={brand} onChange={onChangeBrand}/>
            </Padded>
          </Paper>
          <Paper>
            <Padded>
              <h3>Topdomain:</h3>
              <RadioButtonGroup
                style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}
                name="dkMode"
                valueSelected={!brandData.hasDk ? 'false' :
                  !dkMode ? 'false' : 'true'}
                onChange={onToggleDkMode}>
                <RadioButton
                  value="false"
                  label=".com"
                  />
                <RadioButton
                  value="true"
                  label=".dk"
                  disabled={!brandData.hasDk}
                  />
              </RadioButtonGroup>
            </Padded>
          </Paper>
        </div>
        <Paper>
          <Padded>
            <h3>Campaign:</h3>
            <IconTextField
              floatingLabelText="Echo Campaign ID"
              type="number"
              icon="fa-dot-circle-o"
              fullWidth
              value={campaignId}
              onChange={onChangeCampaignId}
              />
            <IconTextField
              floatingLabelText="Opt In Code"
              icon="fa-check"
              fullWidth
              disabled={brand === 'bs' && dkMode}
              value={optInCode}
              onChange={onChangeOptInCode}
              />
            <div style={gridStyle}>
              <InputWithIcon icon="fa-gamepad">
                <SelectField
                  floatingLabelText="Product"
                  value={product}
                  style={{width: 'auto'}}
                  onChange={onChangeProduct}
                >
                  <MenuItem
                    value={'sb'}
                    primaryText="Sportsbook"
                    />
                  <MenuItem
                    value={'ca'}
                    primaryText="Casino"
                    />
                  <MenuItem
                    value={'lca'}
                    primaryText="Live Casino"
                    />
                </SelectField>
              </InputWithIcon>
              <SelectField
                floatingLabelText="Default Language"
                value={defaultLanguage}
                style={{width: 'auto'}}
                onChange={onChangeDefaultLanguage}
              >
                <MenuItem
                  value={'en'}
                  primaryText="English"
                  />
                <MenuItem
                  value={'sv'}
                  primaryText="Swedish"
                  />
                <MenuItem
                  value={'no'}
                  primaryText="Norwegian"
                  />
                <MenuItem
                  value={'fi'}
                  primaryText="Finnish"
                  />
                <MenuItem
                  value={'da'}
                  primaryText="Danish"
                  />
                <MenuItem
                  value={'is'}
                  primaryText="Icelandic"
                  />
              </SelectField>
            </div>
          </Padded>
          { /*buttons start here*/ }
          <Padded>
            <RaisedButton
              label="Scrape Links"
              primary
              disabled={this.props.isLoading}
              onClick={onScrapeLinks}
              />
          </Padded>
        </Paper>
        {
          this.props.isLoading ?
          <LinearProgress mode="indeterminate"/> : null
        }
      </div>
    )
  }
}

export default CampaignInputForm;
