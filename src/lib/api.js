import axios from 'axios'

import data from '../data/'

const getPageData = async (brand, id, language) => {

  const response = await axios.get(`https://quiet-meadow-15372.herokuapp.com/api/${brand}/${id}/${language}`)
  return response.data
}

const getLinks = data => {

  // converts string to object
  const convertLink = str => {
    try {return JSON.parse(str)}
    catch(err) {
      const ddlFunction = (str.match(/(casinoeuro|eurocasino)/) && str.match(/\/join\//)) ?
        'JoinCampaign' : undefined
      return {
        ddlFunction,
        txtDesktopWebURL: str,
        txtMobileWebURL: str,
      }
    }
  }
  // returns string if element has link, false if not
  const extractLinkFromElement = (el) => {
    const settings = el.settings.length ?
      el.settings[0] : el.settings
    let link = settings.hyperlink_url
    if (link) {
      link = link.trim();
    }
    if (link && link.length > 1) {
      return convertLink(settings.hyperlink_url)
    } else {
      return false
    }
  }

  const allLinks = [];
  // fetch top button links
  const topButtons = data.header.top_buttons;
  const rows = data.body;
  for (let i=0; i<topButtons.length; i++) {
    allLinks.push(convertLink(topButtons[i].hyperlink_url))
  }
  // fetch links from other elements
  for (let i=0; i<rows.length; i++) {
    const row = rows[i];
    for (let j=0; j<row.columns.length; j++) {
      const column = row.columns[j];
      for (let k=0; k< column.elements.length; k++) {
        const el = column.elements[k];
        const link = extractLinkFromElement(el);
        link && allLinks.push(link);
      }
    }
  }
  return allLinks.filter(e => e)
}

const analyzeNativeSettings = (link, product, oic) => {
  if (link.txtCampaignID === oic && link.ddlShowFeedback === "true") {
    if (link.ddlSuccessCTA === 'GoToLobby') {
      if(product.match(/sb/) && link.ddlLobby_successCTA === 'sportsbook') {
        return true
      }
      if(product.match(/ca/) && link.ddlLobby_successCTA === 'casino') {
        return true
      }
    }
    else if (product.match(/ca/) && link.ddlSuccessCTA === 'GoToCasinoLobby') {
      return true
    }
    else if (product.match(/dep/) && link.ddlSuccessCTA === 'Deposit') {
      return true
    }
  }
  return false
}

const analyzeOptInLink = (link, brand, language, product, oic) => {
  const brandData = data[brand]
  const regExps = brandData.getRegExps(language, product, oic)
  const resultDesktop = link.txtDesktopWebURL.match(regExps.desktop) ? true : false
  const resultMobile = link.txtMobileWebURL.match(regExps.mobile)  ? true : false
  const resultNative = analyzeNativeSettings(link, product, oic);
  return {...link, resultDesktop, resultMobile, resultNative }
}

export const getFullResults = async settings => {
  const {
    brand,
    campaignId,
    defaultLanguage,
    oic,
    product
  } = settings
  const results = {}
  await getPageData(brand, campaignId, defaultLanguage)
    .then(async data => {
      const campaignData = {}
      // add default Language data to data object
      campaignData[defaultLanguage] = data
      results.defaultURL = `${data.campaign_base_domain}/${data.campaign_title.replace(/\s/g, '-').toLowerCase()}/${defaultLanguage}`
      // retrieve other campaign languages and fetch data
      const languages = data.campaign_settings.languages
        .map(item => item.lang_title.toLowerCase())
        .filter(item => item !== defaultLanguage)

      const promises = languages.map(language => getPageData(brand,campaignId,language))
      const pages = await axios.all(promises)

      // add data of other languages to data object
      for (let page in pages) {
        const data = pages[page]
        const language = data.campaign_language.toLowerCase()
        campaignData[language] = data
      }
      return campaignData
    })
    .then(pages => {
      for (let language in pages) {
        const page = pages[language]
        const links = getLinks(page)
        const result = {optInLinks: [], otherLinks: []}
        for (let i=0; i<links.length;i++) {
          const link = links[i]
          if (link.ddlFunction === 'JoinCampaign') {
            const optInResult = analyzeOptInLink(link, brand, language, product, oic)
            result.optInLinks.push(optInResult)
          } else {
            result.otherLinks.push(link)
          }
        }
        if (result.otherLinks.length) {
          result.otherLinks.shift()
        }
        results[language] = result
      }
    })

  return results
}
