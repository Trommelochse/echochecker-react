const getObgRegEx = (domain, language, product, optin) => {
  const langProdMap = {
    en: {
      sb: 'sportsbook',
      ca: 'casino',
      lca: 'live-casino'
    },
    sv: {
      sb: 'odds',
      ca: 'casino',
      lca: 'live-casino'
    },
    no: {
      sb: 'odds',
      ca: 'casino',
      lca: 'live-casino'
    },
    fi: {
      sb: 'vedonlyonti',
      ca: 'casino',
      lca: 'live-casino'
    },
    is: {
      sb: 'ithrottabok',
      ca: 'casino',
      lca: 'live-casino'
    },
    de: {
      sb: 'sportwetten',
      ca: 'casino',
      lca: 'live-casino'
    }
  }
  language = langProdMap[language] ? language : 'en';
  const productPath = langProdMap[language][product];
  return new RegExp(
    `(https:\/\/m\.${domain}\.com)` + // eslint-disable-line
    `\/(${language})` + // eslint-disable-line
    `\/(${productPath})` + // eslint-disable-line
    `(\/[a-zA-Z0-9-\/]*)?` + // eslint-disable-line
    `(?:\/)?` + // eslint-disable-line
    `\\?(campaign=|modalroute=join-campaign\/)` + // eslint-disable-line
    `(${optin}(?=\&|$))` // eslint-disable-line
  )
}

const be = {
  domain: 'betsson',
  hasDk: false,
  hasObg: true,
  getRegExps: (language, product, optin) => {
    const productMap = {
      sb: language !== 'de' ? 'sportsbook' : 'sportwetten',
      ca: 'casino',
      lca: 'livecasino'
    }
    const p = productMap[product];
    const desktop = new RegExp(
      `(https:\/\/${p}\.betsson\.com)` + // eslint-disable-line
      `\/(${language})(?:\/)?` + // eslint-disable-line
      `(\/[a-zA-Z0-9-\/]*)?` + // eslint-disable-line
      `(\\?action=join\&campaign=${optin}(?=\&|$))` // eslint-disable-line
    )
    const mobile = getObgRegEx('betsson', language, product, optin);
    return {desktop, mobile}
  }
}

const nb = {
  domain: 'nordicbet',
  hasDk: true,
  hasObg: true,
  getRegExps: (language, product, optin) => {
    const productMap = {
      en: {
        sb: 'odds',
        ca: 'casino',
        lca: 'livecasino'
      },
      sv: {
        sb: 'odds',
        ca: 'casino',
        lca: 'livecasino'
      },
      no: {
        sb: 'odds',
        ca: 'casino',
        lca: 'livecasino'
      },
      fi: {
        sb: 'vedonly(ö|%C3%B6)nti',
        ca: 'casino',
        lca: 'livecasino'
      },
    }
    const p = productMap[language][product];
    const desktop = new RegExp(
      `(https:\/\/www\.nordicbet\.com)` + // eslint-disable-line
      `\/(${language})` + // eslint-disable-line
      `\/(${p})` + // eslint-disable-line
      `(\/[a-zA-Z0-9-\/]*)?` + // eslint-disable-line
      `(?:\/)?` + // eslint-disable-line
      `(\\?action=join\&campaign=${optin}(?=\&|$))` // eslint-disable-line
     )
    const mobile = getObgRegEx('nordicbet', language, product, optin);
    return {desktop, mobile}
  }
}

const bs = {
  domain: 'betsafe',
  hasDk: false,
  hasObg: true,
  getRegExps: (language, product, optin) => {
    const productMap = {
      sb: 'odds',
      ca: 'casino',
      lca: 'casino\/livecasino' // eslint-disable-line
    }
    const p = productMap[product];
    const desktop = new RegExp(
      `https:\/\/www\.betsafe\.com` + // eslint-disable-line
      `\/(${language})` + // eslint-disable-line
      `\/(${p})` + // eslint-disable-line
      `(#\/#\/Mainmarket\/[0-9]+|\/[a-zA-Z0-9-\/]*)?` + // eslint-disable-line
      `(?:\/)?` + // eslint-disable-line
      `(\\?action=login\&reload=true)` + // eslint-disable-line
      `(\&offer=[a-zA-Z0-9-]+)?` + // eslint-disable-line
      `(\&campaigncode=${optin}(?=\&|$))` // eslint-disable-line
    )
    const mobile = getObgRegEx('betsafe', language, product, optin);
    return {desktop, mobile}
  }
}

const nbdk = {
  domain: 'nordicbet',
  hasDk: true,
  hasObg: false,
  getRegExps: (language, product, optin) => {
    const productMapDesk = {
      sb: 'sports',
      ca: 'casino',
      lca: 'casino\/livecasino' // eslint-disable-line
    }
    const productMapMob = {
      sb: 'sportsbook',
      ca: 'casino',
      lca: 'casino'
    }
    const pd = productMapDesk[product];
    const desktop = new RegExp(
      `https:\/\/www\.nordicbet\.dk` + // eslint-disable-line
      `(\/da)?` + // eslint-disable-line
      `\/(${pd})` + // eslint-disable-line
      `(\/[a-zA-Z0-9-\/]*)?` + // eslint-disable-line
      `(?:\/)?` + // eslint-disable-line
      `(\\?action=join\&campaign=${optin}(?=\&|$))`  // eslint-disable-line
    )
    const pm = productMapMob[product];
    // https://m.nordicbet.dk/da/sportsbook?modalroute=join-campaign/FootballWeekend3
    const mobile = new RegExp(
      `https:\/\/m\.nordicbet\.dk` + // eslint-disable-line
      `(\/da)` + // eslint-disable-line
      `\/(${pm})` + // eslint-disable-line
      `(?:\/)?` + // eslint-disable-line
      `(\\?modalroute=join-campaign\/${optin})`  // eslint-disable-line
    )
    return {desktop, mobile}
  }
}

export default {
  be,
  bs,
  nb,
  nbdk
}
