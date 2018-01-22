import React, {Component} from 'react'
import SiteWidth from './SiteWidth.js'
import Navigation from './Navigation.js'
import Aside from './Aside'
import CampaignInputForm from './CampaignInputForm.js'
import CampaignResults from './CampaignResults.js'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import * as api from '../lib/api.js'

const ErrorDialog = props => {
  const actions = [
      <FlatButton
        label="Got it!"
        secondary
        onClick={props.handleClose}
      />
  ]
  return (
    <Dialog
      modal
      title="Oops! Something went wrong,..."
      actions={actions}
      open={props.isOpen}
      onRequestClose={props.handleClose}
      >
    Please check that all your inputs are correct and try again.
    </Dialog>
  )
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridGap: '16px 24px',
}

class AppContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0,
      brand: 'be',
      product: 'sb',
      defaultLanguage: 'en',
      campaignId: '',
      optInCode: '',
      dkMode: false,
      isLoading: false,
      requestError: false,
      results: {}
    }

    this.onChangeBrand = this.onChangeBrand.bind(this)
    this.onChangeCampaignId = this.onChangeCampaignId.bind(this)
    this.onChangeOptInCode = this.onChangeOptInCode.bind(this)
    this.onChangeProduct = this.onChangeProduct.bind(this)
    this.onChangeDomain = this.onChangeDomain.bind(this)
    this.onChangeDefaultLanguage = this.onChangeDefaultLanguage.bind(this)
    this.onToggleDkMode = this.onToggleDkMode.bind(this)
    this.onScrapeLinks = this.onScrapeLinks.bind(this)
    this.goToForm = this.goToForm.bind(this)
  }
  onChangeBrand(brand) {
    this.setState({brand, dkMode: false})
  }
  onChangeCampaignId(ev) {
    this.setState({campaignId: ev.target.value})
  }
  onChangeOptInCode(ev) {
    this.setState({optInCode: ev.target.value})
  }
  onChangeProduct(ev,i,val) {
    this.setState({product: val})
  }
  onChangeDomain(ev, i, val) {
    this.setState({domain: val})
  }
  onChangeDefaultLanguage(ev, i, val) {
    this.setState({defaultLanguage: val})
  }
  onToggleDkMode() {
    this.setState({dkMode: !this.state.dkMode})
  }
  startLoading() {
    this.setState({isLoading: true})
  }
  stopLoading() {
    this.setState({isLoading: false})
  }
  goToForm() {
      this.setState({stepIndex: 0, results: {}})
  }
  onScrapeLinks() {
    this.startLoading()
    const brand = this.state.dkMode ? this.state.brand + 'dk' :
                                      this.state.brand
    const settings = {
      brand,
      campaignId: this.state.campaignId,
      defaultLanguage: this.state.defaultLanguage,
      oic: this.state.optInCode,
      product: this.state.product
    }
    api.getFullResults(settings)
      .then(results => {
        this.setState({
          results,
          stepIndex: 1,
          isLoading: false
        })
      }).catch(err => {
        this.setState({requestError: true, isLoading: false})
      })
  }

  render() {
    const {brand}  = this.state
    const topDomain = !this.state.dkMode ? '.com' : '.dk'
    return (
      <div className="AppContainer">
        <Navigation
          title={`Echo Scraper - ${brand.toUpperCase()}${topDomain}`}
          brand={brand}
          />
        <SiteWidth>
          {
            this.state.stepIndex === 0 ?
            <div style={gridStyle}>
              <CampaignInputForm
                onChangeBrand = {this.onChangeBrand}
                onChangeCampaignId = {this.onChangeCampaignId}
                onChangeDefaultLanguage = {this.onChangeDefaultLanguage}
                onChangeDomain = {this.onChangeDomain}
                onChangeOptInCode = {this.onChangeOptInCode}
                onChangeProduct = {this.onChangeProduct}
                onScrapeLinks = {this.onScrapeLinks}
                onToggleDkMode = {this.onToggleDkMode}
                {...this.state}
                />
              <Aside />
            </div> : null
          }
          {
            this.state.stepIndex === 1 ?
            <CampaignResults
              goToForm = {this.goToForm}
              {...this.state}
              /> : null
          }
        </SiteWidth>
        <ErrorDialog
          isOpen={this.state.requestError}
          handleClose={() => this.setState({requestError: false})}
         />
      </div>
    )
  }
}

export default AppContainer
