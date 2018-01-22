import React, {Component} from 'react'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import Padded from './common/Padded.js'
import FlatButton from 'material-ui/FlatButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

const headerStyle = {
  marginBottom: 8,
  fontWeight: 400,
  color: 'rgba(0,0,0,0.45)'
}

const TableCellSuccess = props => <TableRowColumn style={{color: '#4CAF50'}}>Test Passed</TableRowColumn>
const TableCellFail = props => <TableRowColumn style={{color: '#FF1744', fontWeight: 700}}>Test Failed</TableRowColumn>
const TableCellLink = props => (
  <TableRowColumn>
    <a href={props.href} target="_blank" rel="noreferrer noopener">{props.href}</a>
  </TableRowColumn>
)

const ResultContainer = props => {
  const hasOptIns = props.results.optInLinks.length > 0
  const hasOtherLinks = props.results.otherLinks.length > 0
  const optInStyle = {
    display: hasOptIns ? 'block' : 'none',
    marginBottom: 12
  }
  const linkResultStyle = {
    display: hasOtherLinks ? 'block' : 'none',
    marginBottom: 12
  }
  return (
    <div>
      <Paper style={{marginBottom: 32}}>
        <Padded style={{background: '#2196F3'}}>
          <h3 style={{margin:0, color: '#fff'}}>{props.language}</h3>
        </Padded>
        <Padded style={optInStyle}>
          <div>
            <h4 style={headerStyle}>Opt In Links:</h4>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>App Function</TableHeaderColumn>
                  <TableHeaderColumn>Desktop</TableHeaderColumn>
                  <TableHeaderColumn>Mobile</TableHeaderColumn>
                  <TableHeaderColumn>Native</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {props.results.optInLinks.map((item,i) =>(
                  <TableRow key={i}>
                    <TableRowColumn>{item.ddlFunction}</TableRowColumn>
                    {item.resultDesktop ? <TableCellSuccess /> : <TableCellFail />}
                    {item.resultMobile ? <TableCellSuccess /> : <TableCellFail />}
                    {item.resultNative ? <TableCellSuccess /> : <TableCellFail />}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Padded>
        <Divider />
        <Padded style={linkResultStyle}>
          <div>
            <h4 style={headerStyle}>Links:</h4>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>App Function</TableHeaderColumn>
                  <TableHeaderColumn>Desktop</TableHeaderColumn>
                  <TableHeaderColumn>Mobile</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {props.results.otherLinks.map((item,i) =>(
                  <TableRow key={i}>
                    <TableRowColumn>{item.ddlFunction || 'None'}</TableRowColumn>
                    <TableCellLink href={item.txtDesktopWebURL}>{item.txtDesktopWebURL}</TableCellLink>
                    <TableCellLink href={item.txtMobileWebURL}>{item.txtMobileWebURL}</TableCellLink>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Padded>
      </Paper>
    </div>
  )
}

class CampaignResults extends Component {

  renderResults() {
    return (
      <div>
      {
        this.props.results.en && !this.props.dkMode ?
        <ResultContainer
          language="English"
          results={this.props.results.en} /> : null
      }
      {
        this.props.results.sv ?
        <ResultContainer
          language="Swedish"
          results={this.props.results.sv} /> : null
      }
      {
        this.props.results.no ?
        <ResultContainer
          language="Norwegian"
          results={this.props.results.no} /> : null
      }
      {
        this.props.results.fi ?
        <ResultContainer
          language="Finnish"
          results={this.props.results.fi} /> : null
      }
      {
        this.props.results.da ?
        <ResultContainer
          language="Danish"
          results={this.props.results.da} /> : null
      }
      {
        this.props.results.is ?
        <ResultContainer
          language="Icelandic"
          results={this.props.results.is} /> : null
      }
      {
        this.props.results.de ?
        <ResultContainer
          language="German"
          results={this.props.results.de} /> : null
      }
      </div>
    )
  }

  render() {

    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr'
    }

    const spanStyle = {
      fontSize: 14
    }

    return (
      <div className="CampaignResults">
        <Paper style={{marginBottom: 32}}>
          <Padded>
            <FlatButton
              onClick={this.props.goToForm}
              label="Change"
              primary
              style={{float: 'right'}}
              />
            <h3 style={headerStyle}>Overview:</h3>
            <h5 style={{fontSize: 16, fontWeight: 400}}>{this.props.results.defaultURL}</h5>
            <div style={gridStyle} >
              <div>
                <h4 style={headerStyle}>Product:</h4>
                <span style={spanStyle}>{this.props.product.toUpperCase()}</span>
              </div>
              <div>
                <h4 style={headerStyle}>Opt In Code:</h4>
                <span style={spanStyle}>{this.props.optInCode}</span>
              </div>
              <div>
                <h4 style={headerStyle}>Campaign ID:</h4>
                <span style={spanStyle}>{this.props.campaignId}</span>
              </div>
              <div>
                <h4 style={headerStyle}>Default Language</h4>
                <span style={spanStyle}>{this.props.defaultLanguage}</span>
              </div>
              <div>
              </div>
            </div>
          </Padded>
        </Paper>
        {this.renderResults()}
      </div>
    )
  }
}

export default CampaignResults;
