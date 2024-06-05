import { useState, useEffect, useRef, forwardRef, ChangeEvent } from 'react'
import { LightAndDarkMode } from './Navbar'
// import { SearchableList } from './SearchableFilter'
import tippy, { Content } from 'tippy.js'
import 'tippy.js/dist/tippy.css' // Import Tippy.js CSS
import 'animate.css'
import 'tippy.js/themes/translucent.css'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import '../css/cryptoApi.css'
import noBtcWH from '../assets/img/noBtcWH.jpg'
import noBtcBL from '../assets/img/noBtcBL.gif'
import noEntry from '../assets/img/noE.png'
import React from 'react'
import { FaArrowAltCircleDown } from 'react-icons/fa'
import { RiH1 } from 'react-icons/ri'
import { SiPanasonic } from 'react-icons/si'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'

// API Key

// const cryptoApiKey = 'CG-aUMCTa9KS1trBrKPu1iip2q8'

export type CryptoMappedImagesType = {
  // length: number
  favorite?: boolean
  // filter(
  //   arg0: (quote: CryptoMappedImagesType) => boolean,
  // ): CryptoMappedImagesType[]
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number | null
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number | null
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: {} | null
  last_updated: string
  price_change_percentage_24h_in_currency?: number
}

// looping over each star ID individually

const initialData: CryptoMappedImagesType[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image:
      'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400',
    current_price: 71105,
    market_cap: 1399160106887,
    market_cap_rank: 1,
    fully_diluted_valuation: 1490894035976,
    total_volume: 35351421072,
    high_24h: 71241,
    low_24h: 68544,
    price_change_24h: 2091.03,
    price_change_percentage_24h: 3.02988,
    market_cap_change_24h: 39324056632,
    market_cap_change_percentage_24h: 2.89182,
    circulating_supply: 19707881,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 73738,
    ath_change_percentage: -3.71991,
    ath_date: '2024-03-14T07:10:36.635Z',
    atl: 67.81,
    atl_change_percentage: 104598.42365,
    atl_date: '2013-07-06T00:00:00.000Z',
    roi: null,
    last_updated: '2024-06-05T06:46:43.561Z',
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image:
      'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628',
    current_price: 3807.31,
    market_cap: 456973439015,
    market_cap_rank: 2,
    fully_diluted_valuation: 456973439015,
    total_volume: 12794301353,
    high_24h: 3839.32,
    low_24h: 3743.68,
    price_change_24h: 38.21,
    price_change_percentage_24h: 1.01387,
    market_cap_change_24h: 4644837038,
    market_cap_change_percentage_24h: 1.02687,
    circulating_supply: 120148357.790778,
    total_supply: 120148357.790778,
    max_supply: null,
    ath: 4878.26,
    ath_change_percentage: -22.03344,
    ath_date: '2021-11-10T14:24:19.604Z',
    atl: 0.432979,
    atl_change_percentage: 878329.04662,
    atl_date: '2015-10-20T00:00:00.000Z',
    roi: {
      times: 70.59747577146395,
      currency: 'btc',
      percentage: 7059.747577146395,
    },
    last_updated: '2024-06-05T06:46:53.900Z',
  },
  {
    id: 'tether',
    symbol: 'usdt',
    name: 'Tether',
    image:
      'https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661',
    current_price: 1.001,
    market_cap: 112310822080,
    market_cap_rank: 3,
    fully_diluted_valuation: 112310822080,
    total_volume: 50198008519,
    high_24h: 1.002,
    low_24h: 0.99689,
    price_change_24h: 0.00007527,
    price_change_percentage_24h: 0.00752,
    market_cap_change_24h: 25129870,
    market_cap_change_percentage_24h: 0.02238,
    circulating_supply: 112316773848.083,
    total_supply: 112316773848.083,
    max_supply: null,
    ath: 1.32,
    ath_change_percentage: -24.42366,
    ath_date: '2018-07-24T00:00:00.000Z',
    atl: 0.572521,
    atl_change_percentage: 74.65683,
    atl_date: '2015-03-02T00:00:00.000Z',
    roi: null,
    last_updated: '2024-06-05T06:45:46.665Z',
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    image:
      'https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970',
    current_price: 706.09,
    market_cap: 108694424000,
    market_cap_rank: 4,
    fully_diluted_valuation: 108694424000,
    total_volume: 3236473857,
    high_24h: 707.55,
    low_24h: 625.38,
    price_change_24h: 75.56,
    price_change_percentage_24h: 11.98357,
    market_cap_change_24h: 11684907285,
    market_cap_change_percentage_24h: 12.04511,
    circulating_supply: 153856150,
    total_supply: 153856150,
    max_supply: 200000000,
    ath: 707.55,
    ath_change_percentage: -0.15252,
    ath_date: '2024-06-05T01:40:29.508Z',
    atl: 0.0398177,
    atl_change_percentage: 1774155.92925,
    atl_date: '2017-10-19T00:00:00.000Z',
    roi: null,
    last_updated: '2024-06-05T06:47:09.425Z',
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image:
      'https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1696504756',
    current_price: 174.03,
    market_cap: 79963546658,
    market_cap_rank: 5,
    fully_diluted_valuation: 100415317590,
    total_volume: 2213511499,
    high_24h: 174.83,
    low_24h: 164.46,
    price_change_24h: 8.1,
    price_change_percentage_24h: 4.88244,
    market_cap_change_24h: 3782345985,
    market_cap_change_percentage_24h: 4.96493,
    circulating_supply: 459803588.726383,
    total_supply: 577404646.499091,
    max_supply: null,
    ath: 259.96,
    ath_change_percentage: -33.03915,
    ath_date: '2021-11-06T21:54:35.825Z',
    atl: 0.500801,
    atl_change_percentage: 34658.48765,
    atl_date: '2020-05-11T19:35:23.449Z',
    roi: null,
    last_updated: '2024-06-05T06:47:13.844Z',
  },
  {
    id: 'staked-ether',
    symbol: 'steth',
    name: 'Lido Staked Ether',
    image:
      'https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206',
    current_price: 3805.85,
    market_cap: 36184394506,
    market_cap_rank: 6,
    fully_diluted_valuation: 36184394506,
    total_volume: 55639547,
    high_24h: 3837.15,
    low_24h: 3739.27,
    price_change_24h: 36.21,
    price_change_percentage_24h: 0.96064,
    market_cap_change_24h: 390706412,
    market_cap_change_percentage_24h: 1.09155,
    circulating_supply: 9512798.51471719,
    total_supply: 9512798.51471719,
    max_supply: null,
    ath: 4829.57,
    ath_change_percentage: -21.21228,
    ath_date: '2021-11-10T14:40:47.256Z',
    atl: 482.9,
    atl_change_percentage: 687.9765,
    atl_date: '2020-12-22T04:08:21.854Z',
    roi: null,
    last_updated: '2024-06-05T06:47:01.071Z',
  },
  {
    id: 'usd-coin',
    symbol: 'usdc',
    name: 'USDC',
    image:
      'https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694',
    current_price: 1,
    market_cap: 32411640984,
    market_cap_rank: 7,
    fully_diluted_valuation: 32411750777,
    total_volume: 5759025004,
    high_24h: 1.003,
    low_24h: 0.996352,
    price_change_24h: -0.000703219140441691,
    price_change_percentage_24h: -0.07026,
    market_cap_change_24h: 121588387,
    market_cap_change_percentage_24h: 0.37655,
    circulating_supply: 32398981408.1778,
    total_supply: 32399091157.9996,
    max_supply: null,
    ath: 1.17,
    ath_change_percentage: -14.6641,
    ath_date: '2019-05-08T00:40:28.300Z',
    atl: 0.877647,
    atl_change_percentage: 14.02531,
    atl_date: '2023-03-11T08:02:13.981Z',
    roi: null,
    last_updated: '2024-06-05T06:47:15.161Z',
  },
  {
    id: 'ripple',
    symbol: 'xrp',
    name: 'XRP',
    image:
      'https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442',
    current_price: 0.526635,
    market_cap: 29187823951,
    market_cap_rank: 8,
    fully_diluted_valuation: 52631213404,
    total_volume: 1089553536,
    high_24h: 0.530748,
    low_24h: 0.518274,
    price_change_24h: 0.00664043,
    price_change_percentage_24h: 1.27702,
    market_cap_change_24h: 366933428,
    market_cap_change_percentage_24h: 1.27315,
    circulating_supply: 55450358947,
    total_supply: 99987572899,
    max_supply: 100000000000,
    ath: 3.4,
    ath_change_percentage: -84.51125,
    ath_date: '2018-01-07T00:00:00.000Z',
    atl: 0.00268621,
    atl_change_percentage: 19495.57152,
    atl_date: '2014-05-22T00:00:00.000Z',
    roi: null,
    last_updated: '2024-06-05T06:47:29.448Z',
  },
  {
    id: 'dogecoin',
    symbol: 'doge',
    name: 'Dogecoin',
    image:
      'https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409',
    current_price: 0.163772,
    market_cap: 23600594597,
    market_cap_rank: 9,
    fully_diluted_valuation: 23601902186,
    total_volume: 761673362,
    high_24h: 0.16377,
    low_24h: 0.157174,
    price_change_24h: 0.00555453,
    price_change_percentage_24h: 3.51069,
    market_cap_change_24h: 745651752,
    market_cap_change_percentage_24h: 3.26254,
    circulating_supply: 144572076383.705,
    total_supply: 144580086383.705,
    max_supply: null,
    ath: 0.731578,
    ath_change_percentage: -77.68598,
    ath_date: '2021-05-08T05:08:23.458Z',
    atl: 0.0000869,
    atl_change_percentage: 187745.14409,
    atl_date: '2015-05-06T00:00:00.000Z',
    roi: null,
    last_updated: '2024-06-05T06:47:16.685Z',
  },
  {
    id: 'the-open-network',
    symbol: 'ton',
    name: 'Toncoin',
    image:
      'https://coin-images.coingecko.com/coins/images/17980/large/ton_symbol.png?1696517498',
    current_price: 7.36,
    market_cap: 17801419794,
    market_cap_rank: 10,
    fully_diluted_valuation: 37668004472,
    total_volume: 683030704,
    high_24h: 7.76,
    low_24h: 6.73,
    price_change_24h: 0.600065,
    price_change_percentage_24h: 8.87136,
    market_cap_change_24h: 1491319384,
    market_cap_change_percentage_24h: 9.14353,
    circulating_supply: 2413623520.99033,
    total_supply: 5107254513.14551,
    max_supply: null,
    ath: 7.76,
    ath_change_percentage: -5.2362,
    ath_date: '2024-06-05T03:11:15.262Z',
    atl: 0.519364,
    atl_change_percentage: 1315.50404,
    atl_date: '2021-09-21T00:33:11.092Z',
    roi: null,
    last_updated: '2024-06-05T06:46:53.191Z',
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    image:
      'https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090',
    current_price: 0.463923,
    market_cap: 16404399703,
    market_cap_rank: 11,
    fully_diluted_valuation: 20856860046,
    total_volume: 298731555,
    high_24h: 0.465776,
    low_24h: 0.452806,
    price_change_24h: 0.00682694,
    price_change_percentage_24h: 1.49355,
    market_cap_change_24h: 233182580,
    market_cap_change_percentage_24h: 1.44196,
    circulating_supply: 35393534070.794,
    total_supply: 45000000000,
    max_supply: 45000000000,
    ath: 3.09,
    ath_change_percentage: -84.98545,
    ath_date: '2021-09-02T06:00:10.474Z',
    atl: 0.01925275,
    atl_change_percentage: 2307.3748,
    atl_date: '2020-03-13T02:22:55.044Z',
    roi: null,
    last_updated: '2024-06-05T06:46:45.275Z',
  },
  {
    id: 'shiba-inu',
    symbol: 'shib',
    name: 'Shiba Inu',
    image:
      'https://coin-images.coingecko.com/coins/images/11939/large/shiba.png?1696511800',
    current_price: 0.0000258,
    market_cap: 15159534245,
    market_cap_rank: 12,
    fully_diluted_valuation: 25725811911,
    total_volume: 649372947,
    high_24h: 0.00002588,
    low_24h: 0.00002369,
    price_change_24h: 0.0000019,
    price_change_percentage_24h: 7.93752,
    market_cap_change_24h: 1078977445,
    market_cap_change_percentage_24h: 7.66289,
    circulating_supply: 589262909794915.1,
    total_supply: 999982356876276,
    max_supply: null,
    ath: 0.00008616,
    ath_change_percentage: -70.09711,
    ath_date: '2021-10-28T03:54:55.568Z',
    atl: 5.6366e-11,
    atl_change_percentage: 45707932.67625,
    atl_date: '2020-11-28T11:26:25.838Z',
    roi: null,
    last_updated: '2024-06-05T06:47:24.657Z',
  },
  {
    id: 'avalanche-2',
    symbol: 'avax',
    name: 'Avalanche',
    image:
      'https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512369',
    current_price: 36.52,
    market_cap: 14330089540,
    market_cap_rank: 13,
    fully_diluted_valuation: 16128411961,
    total_volume: 346703409,
    high_24h: 36.52,
    low_24h: 34.59,
    price_change_24h: 1.62,
    price_change_percentage_24h: 4.64354,
    market_cap_change_24h: 629146187,
    market_cap_change_percentage_24h: 4.59199,
    circulating_supply: 393220085.115789,
    total_supply: 442566357.070554,
    max_supply: 720000000,
    ath: 144.96,
    ath_change_percentage: -74.83859,
    ath_date: '2021-11-21T14:18:56.538Z',
    atl: 2.8,
    atl_change_percentage: 1202.15789,
    atl_date: '2020-12-31T13:15:21.540Z',
    roi: null,
    last_updated: '2024-06-05T06:47:23.119Z',
  },
  {
    id: 'wrapped-bitcoin',
    symbol: 'wbtc',
    name: 'Wrapped Bitcoin',
    image:
      'https://coin-images.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1696507857',
    current_price: 71149,
    market_cap: 10864216981,
    market_cap_rank: 14,
    fully_diluted_valuation: 10864216981,
    total_volume: 248543914,
    high_24h: 71240,
    low_24h: 68608,
    price_change_24h: 2131.82,
    price_change_percentage_24h: 3.08883,
    market_cap_change_24h: 302421193,
    market_cap_change_percentage_24h: 2.86335,
    circulating_supply: 153024.10916775,
    total_supply: 153024.10916775,
    max_supply: 153024.10916775,
    ath: 73505,
    ath_change_percentage: -3.41398,
    ath_date: '2024-03-14T07:10:23.403Z',
    atl: 3139.17,
    atl_change_percentage: 2161.61567,
    atl_date: '2019-04-02T00:00:00.000Z',
    roi: null,
    last_updated: '2024-06-05T06:46:50.308Z',
  },
  {
    id: 'chainlink',
    symbol: 'link',
    name: 'Chainlink',
    image:
      'https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009',
    current_price: 18.05,
    market_cap: 10588552143,
    market_cap_rank: 15,
    fully_diluted_valuation: 18035347744,
    total_volume: 407115669,
    high_24h: 18.05,
    low_24h: 17.5,
    price_change_24h: 0.391932,
    price_change_percentage_24h: 2.22011,
    market_cap_change_24h: 236957348,
    market_cap_change_percentage_24h: 2.28909,
    circulating_supply: 587099971.3083414,
    total_supply: 1000000000,
    max_supply: 1000000000,
    ath: 52.7,
    ath_change_percentage: -65.77498,
    ath_date: '2021-05-10T00:13:57.214Z',
    atl: 0.148183,
    atl_change_percentage: 12071.02897,
    atl_date: '2017-11-29T00:00:00.000Z',
    roi: null,
    last_updated: '2024-06-05T06:46:41.547Z',
  },
  {
    id: 'polkadot',
    symbol: 'dot',
    name: 'Polkadot',
    image:
      'https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png?1696512008',
    current_price: 7.26,
    market_cap: 9968686849,
    market_cap_rank: 16,
    fully_diluted_valuation: 10556667002,
    total_volume: 174966576,
    high_24h: 7.27,
    low_24h: 6.95,
    price_change_24h: 0.239819,
    price_change_percentage_24h: 3.41404,
    market_cap_change_24h: 343334927,
    market_cap_change_percentage_24h: 3.56699,
    circulating_supply: 1372421461.6016,
    total_supply: 1453370596.89667,
    max_supply: null,
    ath: 54.98,
    ath_change_percentage: -86.77802,
    ath_date: '2021-11-04T14:10:09.301Z',
    atl: 2.7,
    atl_change_percentage: 169.49719,
    atl_date: '2020-08-20T05:48:11.359Z',
    roi: null,
    last_updated: '2024-06-05T06:47:20.822Z',
  },
  {
    id: 'tron',
    symbol: 'trx',
    name: 'TRON',
    image:
      'https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193',
    current_price: 0.113953,
    market_cap: 9965390695,
    market_cap_rank: 17,
    fully_diluted_valuation: 9965405552,
    total_volume: 291363681,
    high_24h: 0.114835,
    low_24h: 0.11304,
    price_change_24h: 0.00051538,
    price_change_percentage_24h: 0.45433,
    market_cap_change_24h: 66945012,
    market_cap_change_percentage_24h: 0.67632,
    circulating_supply: 87349758920.532,
    total_supply: 87349889151.1211,
    max_supply: null,
    ath: 0.231673,
    ath_change_percentage: -50.75551,
    ath_date: '2018-01-05T00:00:00.000Z',
    atl: 0.00180434,
    atl_change_percentage: 6222.86412,
    atl_date: '2017-11-12T00:00:00.000Z',
    roi: {
      times: 58.97524033723758,
      currency: 'usd',
      percentage: 5897.524033723758,
    },
    last_updated: '2024-06-05T06:46:43.866Z',
  },
  {
    id: 'bitcoin-cash',
    symbol: 'bch',
    name: 'Bitcoin Cash',
    image:
      'https://coin-images.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png?1696501932',
    current_price: 484.44,
    market_cap: 9548589461,
    market_cap_rank: 18,
    fully_diluted_valuation: 10170856754,
    total_volume: 253759293,
    high_24h: 484.46,
    low_24h: 461.33,
    price_change_24h: 21.94,
    price_change_percentage_24h: 4.74411,
    market_cap_change_24h: 445588839,
    market_cap_change_percentage_24h: 4.89497,
    circulating_supply: 19715190.5216508,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 3785.82,
    ath_change_percentage: -87.20683,
    ath_date: '2017-12-20T00:00:00.000Z',
    atl: 76.93,
    atl_change_percentage: 529.52857,
    atl_date: '2018-12-16T00:00:00.000Z',
    roi: null,
    last_updated: '2024-06-05T06:47:20.831Z',
  },
  {
    id: 'uniswap',
    symbol: 'uni',
    name: 'Uniswap',
    image:
      'https://coin-images.coingecko.com/coins/images/12504/large/uni.jpg?1696512319',
    current_price: 11.27,
    market_cap: 8507782165,
    market_cap_rank: 19,
    fully_diluted_valuation: 11287023608,
    total_volume: 890318882,
    high_24h: 11.82,
    low_24h: 9.4,
    price_change_24h: 1.76,
    price_change_percentage_24h: 18.47473,
    market_cap_change_24h: 1360599771,
    market_cap_change_percentage_24h: 19.03687,
    circulating_supply: 753766667,
    total_supply: 1000000000,
    max_supply: 1000000000,
    ath: 44.92,
    ath_change_percentage: -74.87272,
    ath_date: '2021-05-03T05:25:04.822Z',
    atl: 1.03,
    atl_change_percentage: 995.61312,
    atl_date: '2020-09-17T01:20:38.214Z',
    roi: null,
    last_updated: '2024-06-05T06:47:16.197Z',
  },
  {
    id: 'near',
    symbol: 'near',
    name: 'NEAR Protocol',
    image:
      'https://coin-images.coingecko.com/coins/images/10365/large/near.jpg?1696510367',
    current_price: 7.69,
    market_cap: 8310488544,
    market_cap_rank: 20,
    fully_diluted_valuation: 9084874301,
    total_volume: 346342399,
    high_24h: 7.69,
    low_24h: 7.04,
    price_change_24h: 0.620213,
    price_change_percentage_24h: 8.77782,
    market_cap_change_24h: 670995871,
    market_cap_change_percentage_24h: 8.78325,
    circulating_supply: 1082387429.94757,
    total_supply: 1183246170.6779,
    max_supply: null,
    ath: 20.44,
    ath_change_percentage: -62.36688,
    ath_date: '2022-01-16T22:09:45.873Z',
    atl: 0.526762,
    atl_change_percentage: 1360.14626,
    atl_date: '2020-11-04T16:09:15.137Z',
    roi: null,
    last_updated: '2024-06-05T06:47:26.338Z',
  },
  {
    id: 'matic-network',
    symbol: 'matic',
    name: 'Polygon',
    image:
      'https://coin-images.coingecko.com/coins/images/4713/large/polygon.png?1698233745',
    current_price: 0.720457,
    market_cap: 6688636415,
    market_cap_rank: 21,
    fully_diluted_valuation: 7205296862,
    total_volume: 246386995,
    high_24h: 0.721011,
    low_24h: 0.69741,
    price_change_24h: 0.01758243,
    price_change_percentage_24h: 2.5015,
    market_cap_change_24h: 157007752,
    market_cap_change_percentage_24h: 2.40381,
    circulating_supply: 9282943566.203985,
    total_supply: 10000000000,
    max_supply: 10000000000,
    ath: 2.92,
    ath_change_percentage: -75.27905,
    ath_date: '2021-12-27T02:08:34.307Z',
    atl: 0.00314376,
    atl_change_percentage: 22832.02583,
    atl_date: '2019-05-10T00:00:00.000Z',
    roi: {
      times: 272.93795431211595,
      currency: 'usd',
      percentage: 27293.795431211598,
    },
    last_updated: '2024-06-05T06:46:50.032Z',
  },
  {
    id: 'litecoin',
    symbol: 'ltc',
    name: 'Litecoin',
    image:
      'https://coin-images.coingecko.com/coins/images/2/large/litecoin.png?1696501400',
    current_price: 84.06,
    market_cap: 6267586546,
    market_cap_rank: 22,
    fully_diluted_valuation: 7056627605,
    total_volume: 297628473,
    high_24h: 84.11,
    low_24h: 81.16,
    price_change_24h: 1.9,
    price_change_percentage_24h: 2.31565,
    market_cap_change_24h: 143401245,
    market_cap_change_percentage_24h: 2.34156,
    circulating_supply: 74607489.4834713,
    total_supply: 84000000,
    max_supply: 84000000,
    ath: 410.26,
    ath_change_percentage: -79.5235,
    ath_date: '2021-05-10T03:13:07.904Z',
    atl: 1.15,
    atl_change_percentage: 7212.30342,
    atl_date: '2015-01-14T00:00:00.000Z',
    roi: null,
    last_updated: '2024-06-05T06:47:25.066Z',
  },
  {
    id: 'pepe',
    symbol: 'pepe',
    name: 'Pepe',
    image:
      'https://coin-images.coingecko.com/coins/images/29850/large/pepe-token.jpeg?1696528776',
    current_price: 0.00001455,
    market_cap: 6124917262,
    market_cap_rank: 23,
    fully_diluted_valuation: 6124917262,
    total_volume: 964397901,
    high_24h: 0.00001476,
    low_24h: 0.00001402,
    price_change_24h: 8.4932e-8,
    price_change_percentage_24h: 0.58717,
    market_cap_change_24h: 55669298,
    market_cap_change_percentage_24h: 0.91724,
    circulating_supply: 420690000000000,
    total_supply: 420690000000000,
    max_supply: 420690000000000,
    ath: 0.00001717,
    ath_change_percentage: -15.19334,
    ath_date: '2024-05-27T08:30:07.709Z',
    atl: 5.5142e-8,
    atl_change_percentage: 26300.83631,
    atl_date: '2023-04-18T02:14:41.591Z',
    roi: null,
    last_updated: '2024-06-05T06:47:18.792Z',
  },
  {
    id: 'internet-computer',
    symbol: 'icp',
    name: 'Internet Computer',
    image:
      'https://coin-images.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png?1696514180',
    current_price: 12.6,
    market_cap: 5829076989,
    market_cap_rank: 24,
    fully_diluted_valuation: 6514451668,
    total_volume: 91232238,
    high_24h: 12.6,
    low_24h: 12.04,
    price_change_24h: 0.480247,
    price_change_percentage_24h: 3.96262,
    market_cap_change_24h: 198237810,
    market_cap_change_percentage_24h: 3.52057,
    circulating_supply: 464457291.84259,
    total_supply: 519067527.3367,
    max_supply: null,
    ath: 700.65,
    ath_change_percentage: -98.20697,
    ath_date: '2021-05-10T16:05:53.653Z',
    atl: 2.87,
    atl_change_percentage: 338.48852,
    atl_date: '2023-09-22T00:29:57.369Z',
    roi: null,
    last_updated: '2024-06-05T06:47:27.850Z',
  },
  {
    id: 'fetch-ai',
    symbol: 'fet',
    name: 'Fetch.ai',
    image:
      'https://coin-images.coingecko.com/coins/images/5681/large/Fetch.jpg?1696506140',
    current_price: 2.19,
    market_cap: 5504421395,
    market_cap_rank: 25,
    fully_diluted_valuation: 5743581480,
    total_volume: 179677483,
    high_24h: 2.19,
    low_24h: 2.08,
    price_change_24h: 0.065631,
    price_change_percentage_24h: 3.08663,
    market_cap_change_24h: 156002848,
    market_cap_change_percentage_24h: 2.9168,
    circulating_supply: 2521012371,
    total_supply: 2630547141,
    max_supply: 2630547141,
    ath: 3.45,
    ath_change_percentage: -36.78856,
    ath_date: '2024-03-28T17:21:18.050Z',
    atl: 0.00816959,
    atl_change_percentage: 26626.14127,
    atl_date: '2020-03-13T02:24:18.347Z',
    roi: {
      times: 24.28172970068609,
      currency: 'usd',
      percentage: 2428.172970068609,
    },
    last_updated: '2024-06-05T06:47:06.916Z',
  },
  {
    id: 'leo-token',
    symbol: 'leo',
    name: 'LEO Token',
    image:
      'https://coin-images.coingecko.com/coins/images/8418/large/leo-token.png?1696508607',
    current_price: 5.94,
    market_cap: 5504104246,
    market_cap_rank: 26,
    fully_diluted_valuation: 5854507082,
    total_volume: 2315416,
    high_24h: 6.04,
    low_24h: 5.92,
    price_change_24h: -0.0880817718266611,
    price_change_percentage_24h: -1.46042,
    market_cap_change_24h: -81440762.83895683,
    market_cap_change_percentage_24h: -1.45806,
    circulating_supply: 926271137.9,
    total_supply: 985239504,
    max_supply: null,
    ath: 8.14,
    ath_change_percentage: -26.95801,
    ath_date: '2022-02-08T17:40:10.285Z',
    atl: 0.799859,
    atl_change_percentage: 642.90792,
    atl_date: '2019-12-24T15:14:35.376Z',
    roi: null,
    last_updated: '2024-06-05T06:46:55.537Z',
  },
  {
    id: 'wrapped-eeth',
    symbol: 'weeth',
    name: 'Wrapped eETH',
    image:
      'https://coin-images.coingecko.com/coins/images/33033/large/weETH.png?1701438396',
    current_price: 3955.26,
    market_cap: 5454864311,
    market_cap_rank: 27,
    fully_diluted_valuation: 5454864311,
    total_volume: 98311001,
    high_24h: 3990.19,
    low_24h: 3888.74,
    price_change_24h: 39.9,
    price_change_percentage_24h: 1.01918,
    market_cap_change_24h: 240276733,
    market_cap_change_percentage_24h: 4.60778,
    circulating_supply: 1379989.77707275,
    total_supply: 1379989.77707275,
    max_supply: null,
    ath: 4196.87,
    ath_change_percentage: -5.72274,
    ath_date: '2024-03-13T08:29:59.938Z',
    atl: 2231.18,
    atl_change_percentage: 77.33684,
    atl_date: '2024-01-08T03:35:28.624Z',
    roi: null,
    last_updated: '2024-06-05T06:47:07.868Z',
  },
  {
    id: 'dai',
    symbol: 'dai',
    name: 'Dai',
    image:
      'https://coin-images.coingecko.com/coins/images/9956/large/Badge_Dai.png?1696509996',
    current_price: 1,
    market_cap: 5275306637,
    market_cap_rank: 28,
    fully_diluted_valuation: 5275306637,
    total_volume: 326007648,
    high_24h: 1.002,
    low_24h: 0.995632,
    price_change_24h: -0.000745619378855755,
    price_change_percentage_24h: -0.07449,
    market_cap_change_24h: 21722983,
    market_cap_change_percentage_24h: 0.41349,
    circulating_supply: 5269025610.0712,
    total_supply: 5269025610.0712,
    max_supply: null,
    ath: 1.22,
    ath_change_percentage: -17.86307,
    ath_date: '2020-03-13T03:02:50.373Z',
    atl: 0.88196,
    atl_change_percentage: 13.51901,
    atl_date: '2023-03-11T07:50:50.514Z',
    roi: null,
    last_updated: '2024-06-05T06:45:42.737Z',
  },
  {
    id: 'ethereum-classic',
    symbol: 'etc',
    name: 'Ethereum Classic',
    image:
      'https://coin-images.coingecko.com/coins/images/453/large/ethereum-classic-logo.png?1696501717',
    current_price: 29.72,
    market_cap: 4374189481,
    market_cap_rank: 29,
    fully_diluted_valuation: 6253101429,
    total_volume: 178577184,
    high_24h: 29.93,
    low_24h: 28.19,
    price_change_24h: 1.37,
    price_change_percentage_24h: 4.82999,
    market_cap_change_24h: 197675503,
    market_cap_change_percentage_24h: 4.73303,
    circulating_supply: 147389536.875596,
    total_supply: 210700000,
    max_supply: 210700000,
    ath: 167.09,
    ath_change_percentage: -82.23797,
    ath_date: '2021-05-06T18:34:22.133Z',
    atl: 0.615038,
    atl_change_percentage: 4725.35187,
    atl_date: '2016-07-25T00:00:00.000Z',
    roi: {
      times: 65.05023532405633,
      currency: 'usd',
      percentage: 6505.023532405633,
    },
    last_updated: '2024-06-05T06:47:26.488Z',
  },
  {
    id: 'kaspa',
    symbol: 'kas',
    name: 'Kaspa',
    image:
      'https://coin-images.coingecko.com/coins/images/25751/large/kaspa-icon-exchanges.png?1696524837',
    current_price: 0.179805,
    market_cap: 4279141991,
    market_cap_rank: 30,
    fully_diluted_valuation: 4280429397,
    total_volume: 96024153,
    high_24h: 0.183084,
    low_24h: 0.170588,
    price_change_24h: 0.00478161,
    price_change_percentage_24h: 2.73198,
    market_cap_change_24h: 137814513,
    market_cap_change_percentage_24h: 3.32779,
    circulating_supply: 23830395908.9839,
    total_supply: 23837565429.8647,
    max_supply: 28704026601,
    ath: 0.189044,
    ath_change_percentage: -4.97711,
    ath_date: '2024-02-20T06:54:58.731Z',
    atl: 0.00017105,
    atl_change_percentage: 104919.00672,
    atl_date: '2022-05-26T14:42:59.316Z',
    roi: null,
    last_updated: '2024-06-05T06:47:31.114Z',
  },
  {
    id: 'render-token',
    symbol: 'rndr',
    name: 'Render',
    image:
      'https://coin-images.coingecko.com/coins/images/11636/large/rndr.png?1696511529',
    current_price: 10.69,
    market_cap: 4139293183,
    market_cap_rank: 31,
    fully_diluted_valuation: 5666866164,
    total_volume: 219189855,
    high_24h: 10.69,
    low_24h: 9.99,
    price_change_24h: 0.557306,
    price_change_percentage_24h: 5.50108,
    market_cap_change_24h: 206369161,
    market_cap_change_percentage_24h: 5.24722,
    circulating_supply: 388646672.474413,
    total_supply: 532073612.754413,
    max_supply: 532073612.754413,
    ath: 13.53,
    ath_change_percentage: -20.99231,
    ath_date: '2024-03-17T16:30:24.636Z',
    atl: 0.03665669,
    atl_change_percentage: 29071.8864,
    atl_date: '2020-06-16T13:22:25.900Z',
    roi: null,
    last_updated: '2024-06-05T06:47:30.229Z',
  },
  {
    id: 'aptos',
    symbol: 'apt',
    name: 'Aptos',
    image:
      'https://coin-images.coingecko.com/coins/images/26455/large/aptos_round.png?1696525528',
    current_price: 9.29,
    market_cap: 4060184725,
    market_cap_rank: 32,
    fully_diluted_valuation: 10203596331,
    total_volume: 1131101507,
    high_24h: 9.29,
    low_24h: 8.77,
    price_change_24h: 0.403474,
    price_change_percentage_24h: 4.53942,
    market_cap_change_24h: 174402869,
    market_cap_change_percentage_24h: 4.48823,
    circulating_supply: 437437205.849056,
    total_supply: 1099317634.74534,
    max_supply: null,
    ath: 19.92,
    ath_change_percentage: -53.35835,
    ath_date: '2023-01-26T14:25:17.390Z',
    atl: 3.08,
    atl_change_percentage: 201.68246,
    atl_date: '2022-12-29T21:35:14.796Z',
    roi: null,
    last_updated: '2024-06-05T06:47:30.737Z',
  },
  {
    id: 'renzo-restaked-eth',
    symbol: 'ezeth',
    name: 'Renzo Restaked ETH',
    image:
      'https://coin-images.coingecko.com/coins/images/34753/large/Ezeth_logo_circle.png?1713496404',
    current_price: 3754.29,
    market_cap: 3740771521,
    market_cap_rank: 33,
    fully_diluted_valuation: 3752178348,
    total_volume: 51108043,
    high_24h: 3782.46,
    low_24h: 3692.92,
    price_change_24h: 41.57,
    price_change_percentage_24h: 1.11968,
    market_cap_change_24h: 43552987,
    market_cap_change_percentage_24h: 1.17799,
    circulating_supply: 996928.060599325,
    total_supply: 999968.017915635,
    max_supply: null,
    ath: 4106.74,
    ath_change_percentage: -8.58236,
    ath_date: '2024-03-12T00:44:29.429Z',
    atl: 2198.04,
    atl_change_percentage: 70.8016,
    atl_date: '2024-01-26T08:09:59.848Z',
    roi: null,
    last_updated: '2024-06-05T06:46:57.887Z',
  },
  {
    id: 'hedera-hashgraph',
    symbol: 'hbar',
    name: 'Hedera',
    image:
      'https://coin-images.coingecko.com/coins/images/3688/large/hbar.png?1696504364',
    current_price: 0.103795,
    market_cap: 3703414544,
    market_cap_rank: 34,
    fully_diluted_valuation: 5179603445,
    total_volume: 53971962,
    high_24h: 0.103779,
    low_24h: 0.09995,
    price_change_24h: 0.003252,
    price_change_percentage_24h: 3.23444,
    market_cap_change_24h: 119242070,
    market_cap_change_percentage_24h: 3.32691,
    circulating_supply: 35749981467.5295,
    total_supply: 50000000000,
    max_supply: 50000000000,
    ath: 0.569229,
    ath_change_percentage: -81.80133,
    ath_date: '2021-09-15T10:40:28.318Z',
    atl: 0.00986111,
    atl_change_percentage: 950.51119,
    atl_date: '2020-01-02T17:30:24.852Z',
    roi: null,
    last_updated: '2024-06-05T06:47:15.966Z',
  },
  {
    id: 'dogwifcoin',
    symbol: 'wif',
    name: 'dogwifhat',
    image:
      'https://coin-images.coingecko.com/coins/images/33566/large/dogwifhat.jpg?1702499428',
    current_price: 3.52,
    market_cap: 3499258464,
    market_cap_rank: 35,
    fully_diluted_valuation: 3499258464,
    total_volume: 528716785,
    high_24h: 3.56,
    low_24h: 3.21,
    price_change_24h: 0.222175,
    price_change_percentage_24h: 6.74184,
    market_cap_change_24h: 202717609,
    market_cap_change_percentage_24h: 6.1494,
    circulating_supply: 998926392,
    total_supply: 998926392,
    max_supply: 998926392,
    ath: 4.83,
    ath_change_percentage: -27.12572,
    ath_date: '2024-03-31T09:34:58.366Z',
    atl: 0.00155464,
    atl_change_percentage: 226095.25207,
    atl_date: '2023-12-13T07:13:50.873Z',
    roi: null,
    last_updated: '2024-06-05T06:46:55.414Z',
  },
  {
    id: 'immutable-x',
    symbol: 'imx',
    name: 'Immutable',
    image:
      'https://coin-images.coingecko.com/coins/images/17233/large/immutableX-symbol-BLK-RGB.png?1696516787',
    current_price: 2.32,
    market_cap: 3427476122,
    market_cap_rank: 36,
    fully_diluted_valuation: 4624396011,
    total_volume: 49787619,
    high_24h: 2.34,
    low_24h: 2.25,
    price_change_24h: 0.0453298,
    price_change_percentage_24h: 1.99574,
    market_cap_change_24h: 51215367,
    market_cap_change_percentage_24h: 1.51693,
    circulating_supply: 1482345419.3898141,
    total_supply: 2000000000,
    max_supply: 2000000000,
    ath: 9.52,
    ath_change_percentage: -75.69719,
    ath_date: '2021-11-26T01:03:01.536Z',
    atl: 0.378055,
    atl_change_percentage: 511.97795,
    atl_date: '2022-12-31T07:36:37.649Z',
    roi: null,
    last_updated: '2024-06-05T06:47:27.230Z',
  },
  {
    id: 'filecoin',
    symbol: 'fil',
    name: 'Filecoin',
    image:
      'https://coin-images.coingecko.com/coins/images/12817/large/filecoin.png?1696512609',
    current_price: 6.04,
    market_cap: 3378990559,
    market_cap_rank: 37,
    fully_diluted_valuation: 11829974415,
    total_volume: 175400814,
    high_24h: 6.05,
    low_24h: 5.71,
    price_change_24h: 0.255827,
    price_change_percentage_24h: 4.423,
    market_cap_change_24h: 138208022,
    market_cap_change_percentage_24h: 4.26465,
    circulating_supply: 559906937,
    total_supply: 1960255474,
    max_supply: 1960256899,
    ath: 236.84,
    ath_change_percentage: -97.44988,
    ath_date: '2021-04-01T13:29:41.564Z',
    atl: 2.64,
    atl_change_percentage: 128.69273,
    atl_date: '2022-12-16T22:45:28.552Z',
    roi: null,
    last_updated: '2024-06-05T06:47:19.823Z',
  },
  {
    id: 'cosmos',
    symbol: 'atom',
    name: 'Cosmos Hub',
    image:
      'https://coin-images.coingecko.com/coins/images/1481/large/cosmos_hub.png?1696502525',
    current_price: 8.58,
    market_cap: 3346903683,
    market_cap_rank: 38,
    fully_diluted_valuation: 3348973953,
    total_volume: 125930218,
    high_24h: 8.6,
    low_24h: 8.3,
    price_change_24h: 0.236805,
    price_change_percentage_24h: 2.8389,
    market_cap_change_24h: 89989691,
    market_cap_change_percentage_24h: 2.76304,
    circulating_supply: 390688369.813272,
    total_supply: 390930035.085365,
    max_supply: null,
    ath: 44.45,
    ath_change_percentage: -80.72639,
    ath_date: '2022-01-17T00:34:41.497Z',
    atl: 1.16,
    atl_change_percentage: 638.47466,
    atl_date: '2020-03-13T02:27:44.591Z',
    roi: {
      times: 84.78238346036899,
      currency: 'usd',
      percentage: 8478.238346036898,
    },
    last_updated: '2024-06-05T06:46:47.350Z',
  },
  {
    id: 'blockstack',
    symbol: 'stx',
    name: 'Stacks',
    image:
      'https://coin-images.coingecko.com/coins/images/2069/large/Stacks_Logo_png.png?1709979332',
    current_price: 2.26,
    market_cap: 3299582425,
    market_cap_rank: 39,
    fully_diluted_valuation: 4100908653,
    total_volume: 233211800,
    high_24h: 2.27,
    low_24h: 1.95,
    price_change_24h: 0.278958,
    price_change_percentage_24h: 14.08394,
    market_cap_change_24h: 420506302,
    market_cap_change_percentage_24h: 14.6056,
    circulating_supply: 1462758953.31906,
    total_supply: 1818000000,
    max_supply: 1818000000,
    ath: 3.86,
    ath_change_percentage: -41.62688,
    ath_date: '2024-04-01T12:34:58.342Z',
    atl: 0.04559639,
    atl_change_percentage: 4847.15747,
    atl_date: '2020-03-13T02:29:26.415Z',
    roi: {
      times: 17.830309771517733,
      currency: 'usd',
      percentage: 1783.0309771517734,
    },
    last_updated: '2024-06-05T06:46:45.460Z',
  },
  {
    id: 'arbitrum',
    symbol: 'arb',
    name: 'Arbitrum',
    image:
      'https://coin-images.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg?1696516109',
    current_price: 1.12,
    market_cap: 3247017996,
    market_cap_rank: 40,
    fully_diluted_valuation: 11210374209,
    total_volume: 240813329,
    high_24h: 1.12,
    low_24h: 1.074,
    price_change_24h: 0.02157822,
    price_change_percentage_24h: 1.96111,
    market_cap_change_24h: 63284992,
    market_cap_change_percentage_24h: 1.98776,
    circulating_supply: 2896440329,
    total_supply: 10000000000,
    max_supply: 10000000000,
    ath: 2.39,
    ath_change_percentage: -53.05599,
    ath_date: '2024-01-12T12:29:59.231Z',
    atl: 0.744925,
    atl_change_percentage: 50.63191,
    atl_date: '2023-09-11T19:40:49.196Z',
    roi: null,
    last_updated: '2024-06-05T06:47:19.737Z',
  },
  {
    id: 'floki',
    symbol: 'floki',
    name: 'FLOKI',
    image:
      'https://coin-images.coingecko.com/coins/images/16746/large/PNG_image.png?1696516318',
    current_price: 0.00033168,
    market_cap: 3217982533,
    market_cap_rank: 41,
    fully_diluted_valuation: 3319787936,
    total_volume: 1031009704,
    high_24h: 0.00033825,
    low_24h: 0.00025876,
    price_change_24h: 0.00006731,
    price_change_percentage_24h: 25.46081,
    market_cap_change_24h: 661697049,
    market_cap_change_percentage_24h: 25.8851,
    circulating_supply: 9693337630249,
    total_supply: 10000000000000,
    max_supply: 10000000000000,
    ath: 0.00033825,
    ath_change_percentage: -1.87169,
    ath_date: '2024-06-05T02:35:27.665Z',
    atl: 8.428e-8,
    atl_change_percentage: 393724.91032,
    atl_date: '2021-07-06T01:11:20.438Z',
    roi: null,
    last_updated: '2024-06-05T06:47:29.836Z',
  },
  {
    id: 'mantle',
    symbol: 'mnt',
    name: 'Mantle',
    image:
      'https://coin-images.coingecko.com/coins/images/30980/large/token-logo.png?1696529819',
    current_price: 0.972045,
    market_cap: 3175642784,
    market_cap_rank: 42,
    fully_diluted_valuation: 6050139739,
    total_volume: 61212865,
    high_24h: 0.975364,
    low_24h: 0.950164,
    price_change_24h: 0.01455024,
    price_change_percentage_24h: 1.51962,
    market_cap_change_24h: 49137674,
    market_cap_change_percentage_24h: 1.57165,
    circulating_supply: 3264441707.83684,
    total_supply: 6219316794.99,
    max_supply: 6219316794.99,
    ath: 1.54,
    ath_change_percentage: -36.79677,
    ath_date: '2024-04-08T09:45:25.482Z',
    atl: 0.307978,
    atl_change_percentage: 215.77513,
    atl_date: '2023-10-18T02:50:46.942Z',
    roi: null,
    last_updated: '2024-06-05T06:47:03.678Z',
  },
  {
    id: 'ethena-usde',
    symbol: 'usde',
    name: 'Ethena USDe',
    image:
      'https://coin-images.coingecko.com/coins/images/33613/large/USDE.png?1716355685',
    current_price: 1.002,
    market_cap: 3122951699,
    market_cap_rank: 43,
    fully_diluted_valuation: 3122951699,
    total_volume: 84390841,
    high_24h: 1.004,
    low_24h: 0.99846,
    price_change_24h: 0.00098756,
    price_change_percentage_24h: 0.09868,
    market_cap_change_24h: 32728123,
    market_cap_change_percentage_24h: 1.05909,
    circulating_supply: 3117165649.75167,
    total_supply: 3117165649.75167,
    max_supply: null,
    ath: 1.032,
    ath_change_percentage: -2.90256,
    ath_date: '2023-12-20T15:38:34.596Z',
    atl: 0.965354,
    atl_change_percentage: 3.80907,
    atl_date: '2024-04-13T20:11:19.603Z',
    roi: null,
    last_updated: '2024-06-05T06:46:48.365Z',
  },
  {
    id: 'stellar',
    symbol: 'xlm',
    name: 'Stellar',
    image:
      'https://coin-images.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1696501482',
    current_price: 0.10677,
    market_cap: 3099420832,
    market_cap_rank: 44,
    fully_diluted_valuation: 5336704241,
    total_volume: 53433666,
    high_24h: 0.106814,
    low_24h: 0.104067,
    price_change_24h: 0.00198245,
    price_change_percentage_24h: 1.89188,
    market_cap_change_24h: 59879970,
    market_cap_change_percentage_24h: 1.97003,
    circulating_supply: 29039754342.3141,
    total_supply: 50001786967.3935,
    max_supply: 50001786974.3935,
    ath: 0.875563,
    ath_change_percentage: -87.81136,
    ath_date: '2018-01-03T00:00:00.000Z',
    atl: 0.00047612,
    atl_change_percentage: 22314.20199,
    atl_date: '2015-03-05T00:00:00.000Z',
    roi: null,
    last_updated: '2024-06-05T06:46:53.559Z',
  },
  {
    id: 'crypto-com-chain',
    symbol: 'cro',
    name: 'Cronos',
    image:
      'https://coin-images.coingecko.com/coins/images/7310/large/cro_token_logo.png?1696507599',
    current_price: 0.113344,
    market_cap: 3030430088,
    market_cap_rank: 45,
    fully_diluted_valuation: 3394178825,
    total_volume: 14182731,
    high_24h: 0.113226,
    low_24h: 0.105291,
    price_change_24h: 0.00518791,
    price_change_percentage_24h: 4.7967,
    market_cap_change_24h: 143106349,
    market_cap_change_percentage_24h: 4.95637,
    circulating_supply: 26784947801.5303,
    total_supply: 30000000000,
    max_supply: null,
    ath: 0.965407,
    ath_change_percentage: -88.28067,
    ath_date: '2021-11-24T15:53:54.855Z',
    atl: 0.0121196,
    atl_change_percentage: 833.52351,
    atl_date: '2019-02-08T00:00:00.000Z',
    roi: null,
    last_updated: '2024-06-05T06:47:28.984Z',
  },
  {
    id: 'arweave',
    symbol: 'ar',
    name: 'Arweave',
    image:
      'https://coin-images.coingecko.com/coins/images/4343/large/oRt6SiEN_400x400.jpg?1696504946',
    current_price: 45.77,
    market_cap: 2998758092,
    market_cap_rank: 46,
    fully_diluted_valuation: 2998758092,
    total_volume: 137926281,
    high_24h: 46.4,
    low_24h: 42.83,
    price_change_24h: 2.89,
    price_change_percentage_24h: 6.73794,
    market_cap_change_24h: 204468589,
    market_cap_change_percentage_24h: 7.31737,
    circulating_supply: 65454185.5381511,
    total_supply: 65454185.5381511,
    max_supply: 66000000,
    ath: 89.24,
    ath_change_percentage: -48.65851,
    ath_date: '2021-11-05T04:14:42.689Z',
    atl: 0.298788,
    atl_change_percentage: 15233.50925,
    atl_date: '2020-01-31T06:47:36.543Z',
    roi: {
      times: 60.84816785167118,
      currency: 'usd',
      percentage: 6084.816785167118,
    },
    last_updated: '2024-06-05T06:47:16.697Z',
  },
  {
    id: 'monero',
    symbol: 'xmr',
    name: 'Monero',
    image:
      'https://coin-images.coingecko.com/coins/images/69/large/monero_logo.png?1696501460',
    current_price: 160.95,
    market_cap: 2968763814,
    market_cap_rank: 47,
    fully_diluted_valuation: null,
    total_volume: 61465293,
    high_24h: 161.29,
    low_24h: 154.74,
    price_change_24h: 4.13,
    price_change_percentage_24h: 2.63252,
    market_cap_change_24h: 78113851,
    market_cap_change_percentage_24h: 2.70229,
    circulating_supply: 18445342.6021475,
    total_supply: 18444108,
    max_supply: null,
    ath: 542.33,
    ath_change_percentage: -70.32239,
    ath_date: '2018-01-09T00:00:00.000Z',
    atl: 0.216177,
    atl_change_percentage: 74352.64544,
    atl_date: '2015-01-14T00:00:00.000Z',
    roi: null,
    last_updated: '2024-06-05T06:47:21.950Z',
  },
  {
    id: 'okb',
    symbol: 'okb',
    name: 'OKB',
    image:
      'https://coin-images.coingecko.com/coins/images/4463/large/WeChat_Image_20220118095654.png?1696505053',
    current_price: 49.46,
    market_cap: 2957472120,
    market_cap_rank: 48,
    fully_diluted_valuation: 11630637930,
    total_volume: 14508366,
    high_24h: 49.82,
    low_24h: 46.78,
    price_change_24h: 2.5,
    price_change_percentage_24h: 5.33159,
    market_cap_change_24h: 136820841,
    market_cap_change_percentage_24h: 4.85068,
    circulating_supply: 60000000,
    total_supply: 235957685.3,
    max_supply: 300000000,
    ath: 73.8,
    ath_change_percentage: -33.19964,
    ath_date: '2024-03-14T00:30:12.502Z',
    atl: 0.580608,
    atl_change_percentage: 8391.25398,
    atl_date: '2019-01-14T00:00:00.000Z',
    roi: null,
    last_updated: '2024-06-05T06:47:12.925Z',
  },
  {
    id: 'the-graph',
    symbol: 'grt',
    name: 'The Graph',
    image:
      'https://coin-images.coingecko.com/coins/images/13397/large/Graph_Token.png?1696513159',
    current_price: 0.302329,
    market_cap: 2863919822,
    market_cap_rank: 49,
    fully_diluted_valuation: 3248900887,
    total_volume: 87148696,
    high_24h: 0.302314,
    low_24h: 0.290474,
    price_change_24h: 0.0081507,
    price_change_percentage_24h: 2.77067,
    market_cap_change_24h: 74961204,
    market_cap_change_percentage_24h: 2.68778,
    circulating_supply: 9509671264.76602,
    total_supply: 10788004319,
    max_supply: 10788004319,
    ath: 2.84,
    ath_change_percentage: -89.38708,
    ath_date: '2021-02-12T07:28:45.775Z',
    atl: 0.052051,
    atl_change_percentage: 479.3672,
    atl_date: '2022-11-22T10:05:03.503Z',
    roi: null,
    last_updated: '2024-06-05T06:47:19.659Z',
  },
  {
    id: 'bittensor',
    symbol: 'tao',
    name: 'Bittensor',
    image:
      'https://coin-images.coingecko.com/coins/images/28452/large/ARUsPeNQ_400x400.jpeg?1696527447',
    current_price: 405.37,
    market_cap: 2790133702,
    market_cap_rank: 50,
    fully_diluted_valuation: 8510196895,
    total_volume: 32914915,
    high_24h: 408.99,
    low_24h: 379.33,
    price_change_24h: 23.41,
    price_change_percentage_24h: 6.1292,
    market_cap_change_24h: 171405220,
    market_cap_change_percentage_24h: 6.54536,
    circulating_supply: 6885012,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 757.6,
    ath_change_percentage: -46.47748,
    ath_date: '2024-03-07T18:45:36.466Z',
    atl: 30.83,
    atl_change_percentage: 1215.24381,
    atl_date: '2023-05-14T08:57:53.732Z',
    roi: null,
    last_updated: '2024-06-05T06:47:10.668Z',
  },
  {
    id: 'first-digital-usd',
    symbol: 'fdusd',
    name: 'First Digital USD',
    image:
      'https://coin-images.coingecko.com/coins/images/31079/large/firstfigital.jpeg?1696529912',
    current_price: 1,
    market_cap: 2768428575,
    market_cap_rank: 51,
    fully_diluted_valuation: 2768428575,
    total_volume: 6841574050,
    high_24h: 1.007,
    low_24h: 0.994382,
    price_change_24h: 0.00045246,
    price_change_percentage_24h: 0.04526,
    market_cap_change_24h: -24924066.195611477,
    market_cap_change_percentage_24h: -0.89226,
    circulating_supply: 2762330678.96,
    total_supply: 2762330678.96,
    max_supply: null,
    ath: 1.089,
    ath_change_percentage: -8.0877,
    ath_date: '2024-05-20T19:42:15.377Z',
    atl: 0.942129,
    atl_change_percentage: 6.19725,
    atl_date: '2023-08-17T21:55:41.478Z',
    roi: null,
    last_updated: '2024-06-05T06:47:05.096Z',
  },
  {
    id: 'optimism',
    symbol: 'op',
    name: 'Optimism',
    image:
      'https://coin-images.coingecko.com/coins/images/25244/large/Optimism.png?1696524385',
    current_price: 2.52,
    market_cap: 2737960878,
    market_cap_rank: 52,
    fully_diluted_valuation: 10819358747,
    total_volume: 187128379,
    high_24h: 2.52,
    low_24h: 2.39,
    price_change_24h: 0.102957,
    price_change_percentage_24h: 4.25923,
    market_cap_change_24h: 113606633,
    market_cap_change_percentage_24h: 4.32894,
    circulating_supply: 1086889963,
    total_supply: 4294967296,
    max_supply: 4294967296,
    ath: 4.84,
    ath_change_percentage: -47.96441,
    ath_date: '2024-03-06T08:35:50.817Z',
    atl: 0.402159,
    atl_change_percentage: 526.80785,
    atl_date: '2022-06-18T20:54:52.178Z',
    roi: null,
    last_updated: '2024-06-05T06:47:30.365Z',
  },
  {
    id: 'sui',
    symbol: 'sui',
    name: 'Sui',
    image:
      'https://coin-images.coingecko.com/coins/images/26375/large/sui_asset.jpeg?1696525453',
    current_price: 1.073,
    market_cap: 2602894841,
    market_cap_rank: 53,
    fully_diluted_valuation: 10728526293,
    total_volume: 149311409,
    high_24h: 1.073,
    low_24h: 1.013,
    price_change_24h: 0.03556482,
    price_change_percentage_24h: 3.4271,
    market_cap_change_24h: 86039102,
    market_cap_change_percentage_24h: 3.41852,
    circulating_supply: 2426143880.70889,
    total_supply: 10000000000,
    max_supply: 10000000000,
    ath: 2.17,
    ath_change_percentage: -50.561,
    ath_date: '2024-03-27T17:46:02.608Z',
    atl: 0.364846,
    atl_change_percentage: 194.19331,
    atl_date: '2023-10-19T10:40:30.078Z',
    roi: null,
    last_updated: '2024-06-05T06:47:11.291Z',
  },
  {
    id: 'vechain',
    symbol: 'vet',
    name: 'VeChain',
    image:
      'https://coin-images.coingecko.com/coins/images/1167/large/VET_Token_Icon.png?1710013505',
    current_price: 0.03523878,
    market_cap: 2548662730,
    market_cap_rank: 54,
    fully_diluted_valuation: 3013798061,
    total_volume: 52059130,
    high_24h: 0.03519761,
    low_24h: 0.03333121,
    price_change_24h: 0.00148458,
    price_change_percentage_24h: 4.3982,
    market_cap_change_24h: 95906121,
    market_cap_change_percentage_24h: 3.91014,
    circulating_supply: 72714516834,
    total_supply: 85985041177,
    max_supply: 86712634466,
    ath: 0.280991,
    ath_change_percentage: -87.5262,
    ath_date: '2021-04-19T01:08:21.675Z',
    atl: 0.00191713,
    atl_change_percentage: 1728.26407,
    atl_date: '2020-03-13T02:29:59.652Z',
    roi: {
      times: 2.239082303753726,
      currency: 'eth',
      percentage: 223.9082303753726,
    },
    last_updated: '2024-06-05T06:46:45.868Z',
  },
  {
    id: 'injective-protocol',
    symbol: 'inj',
    name: 'Injective',
    image:
      'https://coin-images.coingecko.com/coins/images/12882/large/Secondary_Symbol.png?1696512670',
    current_price: 26.75,
    market_cap: 2501070173,
    market_cap_rank: 55,
    fully_diluted_valuation: 2656411194,
    total_volume: 116899815,
    high_24h: 26.72,
    low_24h: 24.21,
    price_change_24h: 1.66,
    price_change_percentage_24h: 6.61009,
    market_cap_change_24h: 146691365,
    market_cap_change_percentage_24h: 6.23058,
    circulating_supply: 94152222.33,
    total_supply: 100000000,
    max_supply: null,
    ath: 52.62,
    ath_change_percentage: -49.32758,
    ath_date: '2024-03-14T15:06:22.124Z',
    atl: 0.657401,
    atl_change_percentage: 3955.99815,
    atl_date: '2020-11-03T16:19:30.576Z',
    roi: null,
    last_updated: '2024-06-05T06:46:44.731Z',
  },
  {
    id: 'maker',
    symbol: 'mkr',
    name: 'Maker',
    image:
      'https://coin-images.coingecko.com/coins/images/1364/large/Mark_Maker.png?1696502423',
    current_price: 2660,
    market_cap: 2465216511,
    market_cap_rank: 56,
    fully_diluted_valuation: 2597704269,
    total_volume: 73396126,
    high_24h: 2673.8,
    low_24h: 2556.74,
    price_change_24h: 89.67,
    price_change_percentage_24h: 3.48853,
    market_cap_change_24h: 84039681,
    market_cap_change_percentage_24h: 3.52933,
    circulating_supply: 927770.032455703,
    total_supply: 977631.036950888,
    max_supply: 1005577,
    ath: 6292.31,
    ath_change_percentage: -57.77163,
    ath_date: '2021-05-03T21:54:29.333Z',
    atl: 168.36,
    atl_change_percentage: 1478.2728,
    atl_date: '2020-03-16T20:52:36.527Z',
    roi: null,
    last_updated: '2024-06-05T06:47:23.219Z',
  },
  {
    id: 'fantom',
    symbol: 'ftm',
    name: 'Fantom',
    image:
      'https://coin-images.coingecko.com/coins/images/4001/large/Fantom_round.png?1696504642',
    current_price: 0.850855,
    market_cap: 2384390651,
    market_cap_rank: 57,
    fully_diluted_valuation: 2700223375,
    total_volume: 171026990,
    high_24h: 0.852882,
    low_24h: 0.811301,
    price_change_24h: 0.02052386,
    price_change_percentage_24h: 2.47177,
    market_cap_change_24h: 68673419,
    market_cap_change_percentage_24h: 2.96554,
    circulating_supply: 2803634835.52659,
    total_supply: 3175000000,
    max_supply: 3175000000,
    ath: 3.46,
    ath_change_percentage: -75.40998,
    ath_date: '2021-10-28T05:19:39.845Z',
    atl: 0.00190227,
    atl_change_percentage: 44607.85791,
    atl_date: '2020-03-13T02:25:38.280Z',
    roi: {
      times: 27.36181816638976,
      currency: 'usd',
      percentage: 2736.181816638976,
    },
    last_updated: '2024-06-05T06:47:05.725Z',
  },
  {
    id: 'notcoin',
    symbol: 'not',
    name: 'Notcoin',
    image:
      'https://coin-images.coingecko.com/coins/images/33453/large/rFmThDiD_400x400.jpg?1701876350',
    current_price: 0.02252484,
    market_cap: 2315567009,
    market_cap_rank: 58,
    fully_diluted_valuation: 2315567009,
    total_volume: 2684379236,
    high_24h: 0.02637078,
    low_24h: 0.02146934,
    price_change_24h: -0.001764584994940973,
    price_change_percentage_24h: -7.26483,
    market_cap_change_24h: -150432961.39760447,
    market_cap_change_percentage_24h: -6.10028,
    circulating_supply: 102701048609.173,
    total_supply: 102701048609.173,
    max_supply: 102719221714,
    ath: 0.02836145,
    ath_change_percentage: -20.59133,
    ath_date: '2024-06-02T18:00:38.587Z',
    atl: 0.00461057,
    atl_change_percentage: 388.47482,
    atl_date: '2024-05-24T07:12:14.147Z',
    roi: null,
    last_updated: '2024-06-05T06:47:14.083Z',
  },
  {
    id: 'bonk',
    symbol: 'bonk',
    name: 'Bonk',
    image:
      'https://coin-images.coingecko.com/coins/images/28600/large/bonk.jpg?1696527587',
    current_price: 0.00003467,
    market_cap: 2303011249,
    market_cap_rank: 59,
    fully_diluted_valuation: 3248965247,
    total_volume: 547323557,
    high_24h: 0.00003534,
    low_24h: 0.00003163,
    price_change_24h: 0.00000287,
    price_change_percentage_24h: 9.02599,
    market_cap_change_24h: 192596676,
    market_cap_change_percentage_24h: 9.12601,
    circulating_supply: 66295523592414.664,
    total_supply: 93526183276778,
    max_supply: 93526183276778,
    ath: 0.00004547,
    ath_change_percentage: -23.75022,
    ath_date: '2024-03-04T17:05:29.594Z',
    atl: 8.6142e-8,
    atl_change_percentage: 40148.94884,
    atl_date: '2022-12-29T22:48:46.755Z',
    roi: null,
    last_updated: '2024-06-05T06:46:54.299Z',
  },
  {
    id: 'theta-token',
    symbol: 'theta',
    name: 'Theta Network',
    image:
      'https://coin-images.coingecko.com/coins/images/2538/large/theta-token-logo.png?1696503349',
    current_price: 2.21,
    market_cap: 2212259064,
    market_cap_rank: 60,
    fully_diluted_valuation: 2212259064,
    total_volume: 20953744,
    high_24h: 2.21,
    low_24h: 2.07,
    price_change_24h: 0.115586,
    price_change_percentage_24h: 5.50891,
    market_cap_change_24h: 118868926,
    market_cap_change_percentage_24h: 5.6783,
    circulating_supply: 1000000000,
    total_supply: 1000000000,
    max_supply: 1000000000,
    ath: 15.72,
    ath_change_percentage: -85.92685,
    ath_date: '2021-04-16T13:15:11.190Z',
    atl: 0.04039979,
    atl_change_percentage: 5375.91661,
    atl_date: '2020-03-13T02:24:16.483Z',
    roi: {
      times: 13.758336409446233,
      currency: 'usd',
      percentage: 1375.8336409446233,
    },
    last_updated: '2024-06-05T06:46:48.706Z',
  },
  {
    id: 'rocket-pool-eth',
    symbol: 'reth',
    name: 'Rocket Pool ETH',
    image:
      'https://coin-images.coingecko.com/coins/images/20764/large/reth.png?1696520159',
    current_price: 4218.15,
    market_cap: 2134306786,
    market_cap_rank: 61,
    fully_diluted_valuation: 2134306786,
    total_volume: 10024635,
    high_24h: 4255.91,
    low_24h: 4153.88,
    price_change_24h: 43.75,
    price_change_percentage_24h: 1.04804,
    market_cap_change_24h: 13623099,
    market_cap_change_percentage_24h: 0.64239,
    circulating_supply: 506585.645364874,
    total_supply: 506585.645364874,
    max_supply: null,
    ath: 4814.31,
    ath_change_percentage: -12.37889,
    ath_date: '2021-12-01T08:03:50.749Z',
    atl: 887.26,
    atl_change_percentage: 375.43397,
    atl_date: '2022-06-18T20:55:45.957Z',
    roi: null,
    last_updated: '2024-06-05T06:47:12.234Z',
  },
  {
    id: 'thorchain',
    symbol: 'rune',
    name: 'THORChain',
    image:
      'https://coin-images.coingecko.com/coins/images/6595/large/Rune200x200.png?1696506946',
    current_price: 6.31,
    market_cap: 2109122381,
    market_cap_rank: 62,
    fully_diluted_valuation: 2599867994,
    total_volume: 230053672,
    high_24h: 6.31,
    low_24h: 5.96,
    price_change_24h: 0.316112,
    price_change_percentage_24h: 5.27441,
    market_cap_change_24h: 101650741,
    market_cap_change_percentage_24h: 5.06362,
    circulating_supply: 334945596,
    total_supply: 412879946,
    max_supply: 500000000,
    ath: 20.87,
    ath_change_percentage: -69.82442,
    ath_date: '2021-05-19T00:30:09.436Z',
    atl: 0.00851264,
    atl_change_percentage: 73871.31056,
    atl_date: '2019-09-28T00:00:00.000Z',
    roi: {
      times: 165.0376253059259,
      currency: 'usd',
      percentage: 16503.76253059259,
    },
    last_updated: '2024-06-05T06:47:24.932Z',
  },
  {
    id: 'celestia',
    symbol: 'tia',
    name: 'Celestia',
    image:
      'https://coin-images.coingecko.com/coins/images/31967/large/tia.jpg?1696530772',
    current_price: 10.98,
    market_cap: 2066361804,
    market_cap_rank: 63,
    fully_diluted_valuation: 11477105056,
    total_volume: 98375551,
    high_24h: 11.06,
    low_24h: 10.58,
    price_change_24h: 0.17114,
    price_change_percentage_24h: 1.58301,
    market_cap_change_24h: 31170667,
    market_cap_change_percentage_24h: 1.53158,
    circulating_supply: 188605171.585447,
    total_supply: 1047561643.83545,
    max_supply: null,
    ath: 20.85,
    ath_change_percentage: -47.33868,
    ath_date: '2024-02-10T14:30:02.495Z',
    atl: 2.08,
    atl_change_percentage: 427.01442,
    atl_date: '2023-10-31T15:14:31.951Z',
    roi: null,
    last_updated: '2024-06-05T06:46:53.845Z',
  },
  {
    id: 'ondo-finance',
    symbol: 'ondo',
    name: 'Ondo',
    image:
      'https://coin-images.coingecko.com/coins/images/26580/large/ONDO.png?1696525656',
    current_price: 1.43,
    market_cap: 2054937745,
    market_cap_rank: 64,
    fully_diluted_valuation: 14233189840,
    total_volume: 269250437,
    high_24h: 1.47,
    low_24h: 1.39,
    price_change_24h: 0.00540849,
    price_change_percentage_24h: 0.38061,
    market_cap_change_24h: 6780427,
    market_cap_change_percentage_24h: 0.33105,
    circulating_supply: 1443764727.588207,
    total_supply: 10000000000,
    max_supply: 10000000000,
    ath: 1.48,
    ath_change_percentage: -3.75949,
    ath_date: '2024-06-03T08:29:55.744Z',
    atl: 0.082171,
    atl_change_percentage: 1631.9503,
    atl_date: '2024-01-18T12:14:30.524Z',
    roi: null,
    last_updated: '2024-06-05T06:47:21.618Z',
  },
  {
    id: 'lido-dao',
    symbol: 'ldo',
    name: 'Lido DAO',
    image:
      'https://coin-images.coingecko.com/coins/images/13573/large/Lido_DAO.png?1696513326',
    current_price: 2.3,
    market_cap: 2054930744,
    market_cap_rank: 65,
    fully_diluted_valuation: 2302904939,
    total_volume: 84797455,
    high_24h: 2.35,
    low_24h: 2.26,
    price_change_24h: 0.02693549,
    price_change_percentage_24h: 1.18273,
    market_cap_change_24h: 24610428,
    market_cap_change_percentage_24h: 1.21215,
    circulating_supply: 892321132.995658,
    total_supply: 1000000000,
    max_supply: 1000000000,
    ath: 7.3,
    ath_change_percentage: -68.45269,
    ath_date: '2021-08-20T08:35:20.158Z',
    atl: 0.40615,
    atl_change_percentage: 467.24388,
    atl_date: '2022-06-18T20:55:12.035Z',
    roi: null,
    last_updated: '2024-06-05T06:47:10.436Z',
  },
  {
    id: 'jasmycoin',
    symbol: 'jasmy',
    name: 'JasmyCoin',
    image:
      'https://coin-images.coingecko.com/coins/images/13876/large/JASMY200x200.jpg?1696513620',
    current_price: 0.03889828,
    market_cap: 1885138773,
    market_cap_rank: 66,
    fully_diluted_valuation: 1946653008,
    total_volume: 504031982,
    high_24h: 0.04213252,
    low_24h: 0.03738453,
    price_change_24h: 0.00030171,
    price_change_percentage_24h: 0.78171,
    market_cap_change_24h: 26284673,
    market_cap_change_percentage_24h: 1.41403,
    circulating_supply: 48419999999.3058,
    total_supply: 50000000000,
    max_supply: 50000000000,
    ath: 4.79,
    ath_change_percentage: -99.18698,
    ath_date: '2021-02-16T03:53:32.207Z',
    atl: 0.00275026,
    atl_change_percentage: 1316.02904,
    atl_date: '2022-12-29T20:41:09.113Z',
    roi: null,
    last_updated: '2024-06-05T06:46:51.844Z',
  },
  {
    id: 'bitget-token',
    symbol: 'bgb',
    name: 'Bitget Token',
    image:
      'https://coin-images.coingecko.com/coins/images/11610/large/icon_colour.png?1696511504',
    current_price: 1.35,
    market_cap: 1881392247,
    market_cap_rank: 67,
    fully_diluted_valuation: 2687701290,
    total_volume: 50182304,
    high_24h: 1.35,
    low_24h: 1.3,
    price_change_24h: 0.00220425,
    price_change_percentage_24h: 0.16402,
    market_cap_change_24h: -8532210.586301565,
    market_cap_change_percentage_24h: -0.45146,
    circulating_supply: 1400001000,
    total_supply: 2000000000,
    max_supply: 2000000000,
    ath: 1.48,
    ath_change_percentage: -9.10671,
    ath_date: '2024-06-01T03:50:55.951Z',
    atl: 0.0142795,
    atl_change_percentage: 9315.91819,
    atl_date: '2020-06-25T04:17:05.895Z',
    roi: null,
    last_updated: '2024-06-05T06:46:57.735Z',
  },
  {
    id: 'coredaoorg',
    symbol: 'core',
    name: 'Core',
    image:
      'https://coin-images.coingecko.com/coins/images/28938/large/file_589.jpg?1701868471',
    current_price: 2.09,
    market_cap: 1861979296,
    market_cap_rank: 68,
    fully_diluted_valuation: 4385394083,
    total_volume: 96847691,
    high_24h: 2.09,
    low_24h: 1.86,
    price_change_24h: 0.226574,
    price_change_percentage_24h: 12.14059,
    market_cap_change_24h: 199037212,
    market_cap_change_percentage_24h: 11.96898,
    circulating_supply: 891631732.080241,
    total_supply: 2100000000,
    max_supply: 2100000000,
    ath: 6.14,
    ath_change_percentage: -66.01165,
    ath_date: '2023-02-08T12:55:39.828Z',
    atl: 0.334237,
    atl_change_percentage: 524.74187,
    atl_date: '2023-11-03T01:20:55.441Z',
    roi: null,
    last_updated: '2024-06-05T06:47:20.969Z',
  },
  {
    id: 'mantle-staked-ether',
    symbol: 'meth',
    name: 'Mantle Staked Ether',
    image:
      'https://coin-images.coingecko.com/coins/images/33345/large/symbol_transparent_bg.png?1701697066',
    current_price: 3921.14,
    market_cap: 1790474917,
    market_cap_rank: 69,
    fully_diluted_valuation: 1790474917,
    total_volume: 12437829,
    high_24h: 3954.22,
    low_24h: 3849.81,
    price_change_24h: 51.19,
    price_change_percentage_24h: 1.32266,
    market_cap_change_24h: 25362608,
    market_cap_change_percentage_24h: 1.43688,
    circulating_supply: 457260.115787072,
    total_supply: 457260.115787072,
    max_supply: null,
    ath: 4729.53,
    ath_change_percentage: -17.07457,
    ath_date: '2024-03-27T05:26:27.333Z',
    atl: 2142.02,
    atl_change_percentage: 83.09761,
    atl_date: '2023-12-18T10:41:32.686Z',
    roi: null,
    last_updated: '2024-06-05T06:47:07.050Z',
  },
  {
    id: 'starknet',
    symbol: 'strk',
    name: 'Starknet',
    image:
      'https://coin-images.coingecko.com/coins/images/26433/large/starknet.png?1696525507',
    current_price: 1.37,
    market_cap: 1788632157,
    market_cap_rank: 70,
    fully_diluted_valuation: 13755409245,
    total_volume: 235279304,
    high_24h: 1.38,
    low_24h: 1.2,
    price_change_24h: 0.161893,
    price_change_percentage_24h: 13.37384,
    market_cap_change_24h: 215195565,
    market_cap_change_percentage_24h: 13.67679,
    circulating_supply: 1300311845,
    total_supply: 10000000000,
    max_supply: 10000000000,
    ath: 4.41,
    ath_change_percentage: -68.89317,
    ath_date: '2024-02-20T12:05:13.556Z',
    atl: 1.028,
    atl_change_percentage: 33.54012,
    atl_date: '2024-05-20T01:35:26.477Z',
    roi: null,
    last_updated: '2024-06-05T06:47:16.502Z',
  },
  {
    id: 'pyth-network',
    symbol: 'pyth',
    name: 'Pyth Network',
    image:
      'https://coin-images.coingecko.com/coins/images/31924/large/pyth.png?1701245725',
    current_price: 0.465778,
    market_cap: 1690590138,
    market_cap_rank: 71,
    fully_diluted_valuation: 4663711129,
    total_volume: 176388961,
    high_24h: 0.468848,
    low_24h: 0.427343,
    price_change_24h: 0.02419221,
    price_change_percentage_24h: 5.47849,
    market_cap_change_24h: 98820741,
    market_cap_change_percentage_24h: 6.20823,
    circulating_supply: 3624988964.81562,
    total_supply: 10000000000,
    max_supply: 10000000000,
    ath: 1.2,
    ath_change_percentage: -61.06485,
    ath_date: '2024-03-16T07:01:15.357Z',
    atl: 0.228806,
    atl_change_percentage: 103.58174,
    atl_date: '2024-01-08T03:29:54.594Z',
    roi: null,
    last_updated: '2024-06-05T06:47:16.905Z',
  },
  {
    id: 'gala',
    symbol: 'gala',
    name: 'GALA',
    image:
      'https://coin-images.coingecko.com/coins/images/12493/large/GALA_token_image_-_200PNG.png?1709725869',
    current_price: 0.04755772,
    market_cap: 1683785289,
    market_cap_rank: 72,
    fully_diluted_valuation: 1683785607,
    total_volume: 168674996,
    high_24h: 0.04756742,
    low_24h: 0.04426271,
    price_change_24h: 0.00295649,
    price_change_percentage_24h: 6.62871,
    market_cap_change_24h: 100339715,
    market_cap_change_percentage_24h: 6.3368,
    circulating_supply: 35449200728.3826,
    total_supply: 35449207418.6041,
    max_supply: null,
    ath: 0.824837,
    ath_change_percentage: -94.23934,
    ath_date: '2021-11-26T01:03:48.731Z',
    atl: 0.00013475,
    atl_change_percentage: 35162.50492,
    atl_date: '2020-12-28T08:46:48.367Z',
    roi: null,
    last_updated: '2024-06-05T06:47:26.506Z',
  },
  {
    id: 'eos',
    symbol: 'eos',
    name: 'EOS',
    image:
      'https://coin-images.coingecko.com/coins/images/738/large/eos-eos-logo.png?1696501893',
    current_price: 0.814384,
    market_cap: 1678100000,
    market_cap_rank: 73,
    fully_diluted_valuation: null,
    total_volume: 110478328,
    high_24h: 0.815407,
    low_24h: 0.7869,
    price_change_24h: 0.02156839,
    price_change_percentage_24h: 2.72048,
    market_cap_change_24h: 45611097,
    market_cap_change_percentage_24h: 2.79396,
    circulating_supply: 2060337095.6321,
    total_supply: null,
    max_supply: null,
    ath: 22.71,
    ath_change_percentage: -96.41377,
    ath_date: '2018-04-29T07:50:33.540Z',
    atl: 0.5024,
    atl_change_percentage: 62.11736,
    atl_date: '2017-10-23T00:00:00.000Z',
    roi: {
      times: -0.17738983268742403,
      currency: 'usd',
      percentage: -17.738983268742405,
    },
    last_updated: '2024-06-05T06:47:25.637Z',
  },
  {
    id: 'jupiter-exchange-solana',
    symbol: 'jup',
    name: 'Jupiter',
    image:
      'https://coin-images.coingecko.com/coins/images/34188/large/jup.png?1704266489',
    current_price: 1.18,
    market_cap: 1588036225,
    market_cap_rank: 74,
    fully_diluted_valuation: 11763231294,
    total_volume: 147410987,
    high_24h: 1.18,
    low_24h: 1.08,
    price_change_24h: 0.080987,
    price_change_percentage_24h: 7.39553,
    market_cap_change_24h: 112779692,
    market_cap_change_percentage_24h: 7.64475,
    circulating_supply: 1350000000,
    total_supply: 10000000000,
    max_supply: 10000000000,
    ath: 2,
    ath_change_percentage: -41.17961,
    ath_date: '2024-01-31T15:02:47.304Z',
    atl: 0.457464,
    atl_change_percentage: 157.16023,
    atl_date: '2024-02-21T18:31:05.083Z',
    roi: null,
    last_updated: '2024-06-05T06:46:55.700Z',
  },
  {
    id: 'ethena',
    symbol: 'ena',
    name: 'Ethena',
    image:
      'https://coin-images.coingecko.com/coins/images/36530/large/ethena.png?1711701436',
    current_price: 0.958764,
    market_cap: 1549080368,
    market_cap_rank: 75,
    fully_diluted_valuation: 14382177497,
    total_volume: 342245491,
    high_24h: 0.997925,
    low_24h: 0.93992,
    price_change_24h: -0.005893439697457259,
    price_change_percentage_24h: -0.61094,
    market_cap_change_24h: -1941791.432744503,
    market_cap_change_percentage_24h: -0.12519,
    circulating_supply: 1615625000,
    total_supply: 15000000000,
    max_supply: 15000000000,
    ath: 1.52,
    ath_change_percentage: -36.82793,
    ath_date: '2024-04-11T13:15:15.057Z',
    atl: 0.532381,
    atl_change_percentage: 80.08977,
    atl_date: '2024-04-02T08:20:40.884Z',
    roi: null,
    last_updated: '2024-06-05T06:47:18.997Z',
  },
  {
    id: 'algorand',
    symbol: 'algo',
    name: 'Algorand',
    image:
      'https://coin-images.coingecko.com/coins/images/4380/large/download.png?1696504978',
    current_price: 0.189008,
    market_cap: 1541873789,
    market_cap_rank: 76,
    fully_diluted_valuation: 1541873833,
    total_volume: 36371068,
    high_24h: 0.189009,
    low_24h: 0.179487,
    price_change_24h: 0.00847873,
    price_change_percentage_24h: 4.6966,
    market_cap_change_24h: 70463240,
    market_cap_change_percentage_24h: 4.78882,
    circulating_supply: 8175363405.93421,
    total_supply: 8175363642.53304,
    max_supply: 10000000000,
    ath: 3.56,
    ath_change_percentage: -94.70127,
    ath_date: '2019-06-20T14:51:19.480Z',
    atl: 0.087513,
    atl_change_percentage: 115.61908,
    atl_date: '2023-09-11T19:42:08.247Z',
    roi: {
      times: -0.9212467920902115,
      currency: 'usd',
      percentage: -92.12467920902115,
    },
    last_updated: '2024-06-05T06:47:22.493Z',
  },
  {
    id: 'sei-network',
    symbol: 'sei',
    name: 'Sei',
    image:
      'https://coin-images.coingecko.com/coins/images/28205/large/Sei_Logo_-_Transparent.png?1696527207',
    current_price: 0.526202,
    market_cap: 1537744873,
    market_cap_rank: 77,
    fully_diluted_valuation: 5257247431,
    total_volume: 49744978,
    high_24h: 0.529797,
    low_24h: 0.49887,
    price_change_24h: 0.01620687,
    price_change_percentage_24h: 3.17785,
    market_cap_change_24h: 50343170,
    market_cap_change_percentage_24h: 3.38464,
    circulating_supply: 2925000000,
    total_supply: 10000000000,
    max_supply: null,
    ath: 1.14,
    ath_change_percentage: -53.84832,
    ath_date: '2024-03-16T02:30:23.904Z',
    atl: 0.095364,
    atl_change_percentage: 451.57117,
    atl_date: '2023-10-19T08:05:30.655Z',
    roi: null,
    last_updated: '2024-06-05T06:47:26.472Z',
  },
  {
    id: 'aave',
    symbol: 'aave',
    name: 'Aave',
    image:
      'https://coin-images.coingecko.com/coins/images/12645/large/AAVE.png?1696512452',
    current_price: 103.39,
    market_cap: 1533057711,
    market_cap_rank: 78,
    fully_diluted_valuation: 1652289861,
    total_volume: 114192145,
    high_24h: 104.32,
    low_24h: 100.09,
    price_change_24h: 2.29,
    price_change_percentage_24h: 2.26215,
    market_cap_change_24h: 39273061,
    market_cap_change_percentage_24h: 2.6291,
    circulating_supply: 14845411.78877645,
    total_supply: 16000000,
    max_supply: 16000000,
    ath: 661.69,
    ath_change_percentage: -84.37863,
    ath_date: '2021-05-18T21:19:59.514Z',
    atl: 26.02,
    atl_change_percentage: 297.20426,
    atl_date: '2020-11-05T09:20:11.928Z',
    roi: null,
    last_updated: '2024-06-05T06:47:26.003Z',
  },
  {
    id: 'whitebit',
    symbol: 'wbt',
    name: 'WhiteBIT Coin',
    image:
      'https://coin-images.coingecko.com/coins/images/27045/large/wbt_token.png?1696526096',
    current_price: 9.98,
    market_cap: 1438551287,
    market_cap_rank: 79,
    fully_diluted_valuation: 3512274537,
    total_volume: 14082410,
    high_24h: 9.99,
    low_24h: 9.85,
    price_change_24h: 0.098217,
    price_change_percentage_24h: 0.99385,
    market_cap_change_24h: 16364820,
    market_cap_change_percentage_24h: 1.15068,
    circulating_supply: 144118517.10815412,
    total_supply: 351870526,
    max_supply: 400000000,
    ath: 14.64,
    ath_change_percentage: -31.85335,
    ath_date: '2022-10-28T12:32:18.119Z',
    atl: 3.06,
    atl_change_percentage: 225.955,
    atl_date: '2023-02-13T19:01:21.899Z',
    roi: null,
    last_updated: '2024-06-05T06:46:58.051Z',
  },
  {
    id: 'flow',
    symbol: 'flow',
    name: 'Flow',
    image:
      'https://coin-images.coingecko.com/coins/images/13446/large/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.png?1696513210',
    current_price: 0.933709,
    market_cap: 1405424920,
    market_cap_rank: 80,
    fully_diluted_valuation: 1405424920,
    total_volume: 27699894,
    high_24h: 0.931942,
    low_24h: 0.861644,
    price_change_24h: 0.062338,
    price_change_percentage_24h: 7.15405,
    market_cap_change_24h: 90048685,
    market_cap_change_percentage_24h: 6.84585,
    circulating_supply: 1510362347.07569,
    total_supply: 1510362347.07569,
    max_supply: null,
    ath: 42.4,
    ath_change_percentage: -97.80188,
    ath_date: '2021-04-05T13:49:10.098Z',
    atl: 0.391969,
    atl_change_percentage: 137.75927,
    atl_date: '2023-09-11T19:41:06.528Z',
    roi: null,
    last_updated: '2024-06-05T06:46:41.324Z',
  },
  {
    id: 'beam-2',
    symbol: 'beam',
    name: 'Beam',
    image:
      'https://coin-images.coingecko.com/coins/images/32417/large/chain-logo.png?1698114384',
    current_price: 0.02822902,
    market_cap: 1394477711,
    market_cap_rank: 81,
    fully_diluted_valuation: 1760053890,
    total_volume: 26446301,
    high_24h: 0.02842428,
    low_24h: 0.02752737,
    price_change_24h: 0.00025431,
    price_change_percentage_24h: 0.90909,
    market_cap_change_24h: 12713621,
    market_cap_change_percentage_24h: 0.9201,
    circulating_supply: 49466004168,
    total_supply: 62434008330,
    max_supply: 62434008330,
    ath: 0.04416304,
    ath_change_percentage: -36.0717,
    ath_date: '2024-03-10T10:40:22.381Z',
    atl: 0.0043383,
    atl_change_percentage: 550.77724,
    atl_date: '2023-10-29T08:20:14.064Z',
    roi: null,
    last_updated: '2024-06-05T06:47:31.485Z',
  },
  {
    id: 'quant-network',
    symbol: 'qnt',
    name: 'Quant',
    image:
      'https://coin-images.coingecko.com/coins/images/3370/large/5ZOu7brX_400x400.jpg?1696504070',
    current_price: 90.75,
    market_cap: 1322593580,
    market_cap_rank: 82,
    fully_diluted_valuation: 1328806061,
    total_volume: 17134403,
    high_24h: 91.76,
    low_24h: 89.82,
    price_change_24h: -0.130703182601124,
    price_change_percentage_24h: -0.14382,
    market_cap_change_24h: 1776877,
    market_cap_change_percentage_24h: 0.13453,
    circulating_supply: 14544176.164091088,
    total_supply: 14612493,
    max_supply: 14612493,
    ath: 427.42,
    ath_change_percentage: -78.72449,
    ath_date: '2021-09-11T09:15:00.668Z',
    atl: 0.215773,
    atl_change_percentage: 42044.3644,
    atl_date: '2018-08-23T00:00:00.000Z',
    roi: {
      times: 9.249142092885105,
      currency: 'eth',
      percentage: 924.9142092885104,
    },
    last_updated: '2024-06-05T06:47:08.245Z',
  },
  {
    id: 'chiliz',
    symbol: 'chz',
    name: 'Chiliz',
    image:
      'https://coin-images.coingecko.com/coins/images/8834/large/CHZ_Token_updated.png?1696508986',
    current_price: 0.145562,
    market_cap: 1293961562,
    market_cap_rank: 83,
    fully_diluted_valuation: 1293961562,
    total_volume: 93994367,
    high_24h: 0.147167,
    low_24h: 0.142844,
    price_change_24h: 0.00183143,
    price_change_percentage_24h: 1.27421,
    market_cap_change_24h: 14668407,
    market_cap_change_percentage_24h: 1.1466,
    circulating_supply: 8888888888,
    total_supply: 8888888888,
    max_supply: 8888888888,
    ath: 0.878633,
    ath_change_percentage: -83.42906,
    ath_date: '2021-03-13T08:04:21.200Z',
    atl: 0.00410887,
    atl_change_percentage: 3443.49539,
    atl_date: '2019-09-28T00:00:00.000Z',
    roi: {
      times: 5.616468708463577,
      currency: 'usd',
      percentage: 561.6468708463577,
    },
    last_updated: '2024-06-05T06:47:24.935Z',
  },
  {
    id: 'bitcoin-cash-sv',
    symbol: 'bsv',
    name: 'Bitcoin SV',
    image:
      'https://coin-images.coingecko.com/coins/images/6799/large/BSV.png?1696507128',
    current_price: 63.46,
    market_cap: 1250043613,
    market_cap_rank: 84,
    fully_diluted_valuation: 1331785517,
    total_volume: 19903002,
    high_24h: 63.62,
    low_24h: 60.49,
    price_change_24h: 2.46,
    price_change_percentage_24h: 4.02787,
    market_cap_change_24h: 48266406,
    market_cap_change_percentage_24h: 4.01625,
    circulating_supply: 19711068.75,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 489.75,
    ath_change_percentage: -87.04811,
    ath_date: '2021-04-16T17:09:04.630Z',
    atl: 21.43,
    atl_change_percentage: 195.92943,
    atl_date: '2023-06-10T04:32:12.266Z',
    roi: null,
    last_updated: '2024-06-05T06:46:58.404Z',
  },
  {
    id: 'axie-infinity',
    symbol: 'axs',
    name: 'Axie Infinity',
    image:
      'https://coin-images.coingecko.com/coins/images/13029/large/axie_infinity_logo.png?1696512817',
    current_price: 8.43,
    market_cap: 1221473280,
    market_cap_rank: 85,
    fully_diluted_valuation: 2267579807,
    total_volume: 58956621,
    high_24h: 8.43,
    low_24h: 7.96,
    price_change_24h: 0.391569,
    price_change_percentage_24h: 4.86818,
    market_cap_change_24h: 56086331,
    market_cap_change_percentage_24h: 4.81268,
    circulating_supply: 145440431.446368,
    total_supply: 270000000,
    max_supply: 270000000,
    ath: 164.9,
    ath_change_percentage: -94.90488,
    ath_date: '2021-11-06T19:29:29.482Z',
    atl: 0.123718,
    atl_change_percentage: 6691.02627,
    atl_date: '2020-11-06T08:05:43.662Z',
    roi: null,
    last_updated: '2024-06-05T06:47:25.902Z',
  },
  {
    id: 'cheelee',
    symbol: 'cheel',
    name: 'Cheelee',
    image:
      'https://coin-images.coingecko.com/coins/images/28573/large/CHEEL_%D1%82%D0%BE%D0%BD%D0%BA%D0%B0%D1%8F_%D0%BE%D0%B1%D0%B2%D0%BE%D0%B4%D0%BA%D0%B0_%283%29.png?1696527561',
    current_price: 20.98,
    market_cap: 1188089051,
    market_cap_rank: 86,
    fully_diluted_valuation: 20920561703,
    total_volume: 6510197,
    high_24h: 20.96,
    low_24h: 20.19,
    price_change_24h: 0.528519,
    price_change_percentage_24h: 2.58426,
    market_cap_change_24h: 30867935,
    market_cap_change_percentage_24h: 2.66742,
    circulating_supply: 56790494.8346584,
    total_supply: 1000000000,
    max_supply: 1000000000,
    ath: 20.96,
    ath_change_percentage: 0.07675,
    ath_date: '2024-06-05T06:30:39.624Z',
    atl: 3.44,
    atl_change_percentage: 510.06557,
    atl_date: '2023-02-13T02:53:08.933Z',
    roi: null,
    last_updated: '2024-06-05T06:45:32.480Z',
  },
  {
    id: 'singularitynet',
    symbol: 'agix',
    name: 'SingularityNET',
    image:
      'https://coin-images.coingecko.com/coins/images/2138/large/singularitynet.png?1696503103',
    current_price: 0.92422,
    market_cap: 1182554825,
    market_cap_rank: 87,
    fully_diluted_valuation: 1298484639,
    total_volume: 106486100,
    high_24h: 0.924368,
    low_24h: 0.871655,
    price_change_24h: 0.03891577,
    price_change_percentage_24h: 4.39575,
    market_cap_change_24h: 47236270,
    market_cap_change_percentage_24h: 4.16062,
    circulating_supply: 1284793189.63146,
    total_supply: 1410745772.9512,
    max_supply: 2000000000,
    ath: 1.46,
    ath_change_percentage: -36.96146,
    ath_date: '2024-03-10T00:24:59.207Z',
    atl: 0.00747159,
    atl_change_percentage: 12225.24777,
    atl_date: '2020-03-13T02:24:16.528Z',
    roi: {
      times: 8.242198090910907,
      currency: 'usd',
      percentage: 824.2198090910907,
    },
    last_updated: '2024-06-05T06:47:11.666Z',
  },
  {
    id: 'ordinals',
    symbol: 'ordi',
    name: 'ORDI',
    image:
      'https://coin-images.coingecko.com/coins/images/30162/large/ordi.png?1696529082',
    current_price: 56.07,
    market_cap: 1177905632,
    market_cap_rank: 88,
    fully_diluted_valuation: 1177905632,
    total_volume: 431437616,
    high_24h: 57.45,
    low_24h: 47.32,
    price_change_24h: 7.82,
    price_change_percentage_24h: 16.19935,
    market_cap_change_24h: 170093001,
    market_cap_change_percentage_24h: 16.87744,
    circulating_supply: 21000000,
    total_supply: 21000000,
    max_supply: null,
    ath: 95.52,
    ath_change_percentage: -41.25688,
    ath_date: '2024-03-05T01:45:22.816Z',
    atl: 2.86,
    atl_change_percentage: 1861.31666,
    atl_date: '2023-09-11T15:22:32.140Z',
    roi: null,
    last_updated: '2024-06-05T06:47:18.246Z',
  },
  {
    id: 'flare-networks',
    symbol: 'flr',
    name: 'Flare',
    image:
      'https://coin-images.coingecko.com/coins/images/28624/large/FLR-icon200x200.png?1696527609',
    current_price: 0.02864123,
    market_cap: 1171905306,
    market_cap_rank: 89,
    fully_diluted_valuation: 2924978983,
    total_volume: 11008058,
    high_24h: 0.02920329,
    low_24h: 0.02813154,
    price_change_24h: 0.00003283,
    price_change_percentage_24h: 0.11477,
    market_cap_change_24h: 1471891,
    market_cap_change_percentage_24h: 0.12576,
    circulating_supply: 40907956501.0293,
    total_supply: 102102885298.361,
    max_supply: null,
    ath: 0.150073,
    ath_change_percentage: -80.91277,
    ath_date: '2023-01-10T03:14:05.921Z',
    atl: 0.00827405,
    atl_change_percentage: 246.19995,
    atl_date: '2023-10-19T03:35:41.663Z',
    roi: null,
    last_updated: '2024-06-05T06:47:22.089Z',
  },
  {
    id: 'dydx-chain',
    symbol: 'dydx',
    name: 'dYdX',
    image:
      'https://coin-images.coingecko.com/coins/images/32594/large/dydx.png?1698673495',
    current_price: 2.09,
    market_cap: 1165360224,
    market_cap_rank: 90,
    fully_diluted_valuation: 1573407363,
    total_volume: 28419511,
    high_24h: 2.1,
    low_24h: 1.97,
    price_change_24h: 0.092435,
    price_change_percentage_24h: 4.63727,
    market_cap_change_24h: 55056660,
    market_cap_change_percentage_24h: 4.9587,
    circulating_supply: 558480505,
    total_supply: 754030660,
    max_supply: 1000000000,
    ath: 4.52,
    ath_change_percentage: -53.82063,
    ath_date: '2024-03-07T22:19:11.131Z',
    atl: 1.71,
    atl_change_percentage: 22.20008,
    atl_date: '2024-04-13T21:30:37.696Z',
    roi: null,
    last_updated: '2024-06-05T06:47:20.911Z',
  },
  {
    id: 'wormhole',
    symbol: 'w',
    name: 'Wormhole',
    image:
      'https://coin-images.coingecko.com/coins/images/35087/large/womrhole_logo_full_color_rgb_2000px_72ppi_fb766ac85a.png?1708688954',
    current_price: 0.644416,
    market_cap: 1157639939,
    market_cap_rank: 91,
    fully_diluted_valuation: 6431332996,
    total_volume: 108402442,
    high_24h: 0.668608,
    low_24h: 0.633888,
    price_change_24h: -0.02261564118691284,
    price_change_percentage_24h: -3.39049,
    market_cap_change_24h: -46427604.94004297,
    market_cap_change_percentage_24h: -3.8559,
    circulating_supply: 1800000000,
    total_supply: 10000000000,
    max_supply: 10000000000,
    ath: 1.66,
    ath_change_percentage: -61.15075,
    ath_date: '2024-04-03T11:46:35.308Z',
    atl: 0.472549,
    atl_change_percentage: 36.28474,
    atl_date: '2024-04-13T21:31:54.997Z',
    roi: null,
    last_updated: '2024-06-05T06:47:08.785Z',
  },
  {
    id: 'gatechain-token',
    symbol: 'gt',
    name: 'Gate',
    image:
      'https://coin-images.coingecko.com/coins/images/8183/large/gate.png?1696508395',
    current_price: 8.83,
    market_cap: 1149603487,
    market_cap_rank: 92,
    fully_diluted_valuation: 2645619496,
    total_volume: 5175618,
    high_24h: 9.03,
    low_24h: 8.35,
    price_change_24h: 0.383221,
    price_change_percentage_24h: 4.53656,
    market_cap_change_24h: 48585382,
    market_cap_change_percentage_24h: 4.41277,
    circulating_supply: 130359277.55886991,
    total_supply: 300000000,
    max_supply: null,
    ath: 12.94,
    ath_change_percentage: -31.80935,
    ath_date: '2021-05-12T11:39:16.531Z',
    atl: 0.25754,
    atl_change_percentage: 3326.70312,
    atl_date: '2020-03-13T02:18:02.481Z',
    roi: null,
    last_updated: '2024-06-05T06:46:55.696Z',
  },
  {
    id: 'kelp-dao-restaked-eth',
    symbol: 'rseth',
    name: 'Kelp DAO Restaked ETH',
    image:
      'https://coin-images.coingecko.com/coins/images/33800/large/Icon___Dark.png?1702991855',
    current_price: 3848.65,
    market_cap: 1143079377,
    market_cap_rank: 93,
    fully_diluted_valuation: 1143079377,
    total_volume: 10468860,
    high_24h: 3881.68,
    low_24h: 3790.92,
    price_change_24h: 38.23,
    price_change_percentage_24h: 1.00342,
    market_cap_change_24h: 13734255,
    market_cap_change_percentage_24h: 1.21613,
    circulating_supply: 297153.440903189,
    total_supply: 297153.440903189,
    max_supply: null,
    ath: 4033.48,
    ath_change_percentage: -4.58977,
    ath_date: '2024-03-13T08:55:33.936Z',
    atl: 2069.62,
    atl_change_percentage: 85.9443,
    atl_date: '2024-01-23T14:25:53.609Z',
    roi: null,
    last_updated: '2024-06-05T06:47:12.594Z',
  },
  {
    id: 'based-brett',
    symbol: 'brett',
    name: 'Brett',
    image:
      'https://coin-images.coingecko.com/coins/images/35529/large/1000050750.png?1709031995',
    current_price: 0.114242,
    market_cap: 1131978368,
    market_cap_rank: 94,
    fully_diluted_valuation: 1131978368,
    total_volume: 60158846,
    high_24h: 0.121298,
    low_24h: 0.10739,
    price_change_24h: -0.005391807467008639,
    price_change_percentage_24h: -4.50691,
    market_cap_change_24h: -51841947.26887655,
    market_cap_change_percentage_24h: -4.37921,
    circulating_supply: 9910226780.45456,
    total_supply: 9910226780.45456,
    max_supply: 9999998988,
    ath: 0.127119,
    ath_change_percentage: -10.12961,
    ath_date: '2024-06-02T15:05:24.826Z',
    atl: 0.00084753,
    atl_change_percentage: 13379.49962,
    atl_date: '2024-02-29T08:40:24.951Z',
    roi: null,
    last_updated: '2024-06-05T06:46:56.981Z',
  },
  {
    id: 'bittorrent',
    symbol: 'btt',
    name: 'BitTorrent',
    image:
      'https://coin-images.coingecko.com/coins/images/22457/large/btt_logo.png?1696521780',
    current_price: 0.00000116,
    market_cap: 1126477260,
    market_cap_rank: 95,
    fully_diluted_valuation: 1151785800,
    total_volume: 33498326,
    high_24h: 0.00000117,
    low_24h: 0.00000113,
    price_change_24h: 3.4675e-8,
    price_change_percentage_24h: 3.07085,
    market_cap_change_24h: 33144674,
    market_cap_change_percentage_24h: 3.03153,
    circulating_supply: 968246428571000,
    total_supply: 990000000000000,
    max_supply: 990000000000000,
    ath: 0.00000343,
    ath_change_percentage: -66.07297,
    ath_date: '2022-01-21T04:00:31.909Z',
    atl: 3.65368e-7,
    atl_change_percentage: 218.62461,
    atl_date: '2023-10-13T05:10:41.241Z',
    roi: null,
    last_updated: '2024-06-05T06:47:11.852Z',
  },
  {
    id: 'worldcoin-wld',
    symbol: 'wld',
    name: 'Worldcoin',
    image:
      'https://coin-images.coingecko.com/coins/images/31069/large/worldcoin.jpeg?1696529903',
    current_price: 4.89,
    market_cap: 1123471130,
    market_cap_rank: 96,
    fully_diluted_valuation: 48760419522,
    total_volume: 219077740,
    high_24h: 4.89,
    low_24h: 4.69,
    price_change_24h: 0.135228,
    price_change_percentage_24h: 2.84305,
    market_cap_change_24h: 32146591,
    market_cap_change_percentage_24h: 2.94565,
    circulating_supply: 230406370.750589,
    total_supply: 10000000000,
    max_supply: 10000000000,
    ath: 11.74,
    ath_change_percentage: -58.34956,
    ath_date: '2024-03-10T00:10:42.330Z',
    atl: 0.973104,
    atl_change_percentage: 402.5176,
    atl_date: '2023-09-13T07:36:44.064Z',
    roi: null,
    last_updated: '2024-06-05T06:47:30.253Z',
  },
  {
    id: 'neo',
    symbol: 'neo',
    name: 'NEO',
    image:
      'https://coin-images.coingecko.com/coins/images/480/large/NEO_512_512.png?1696501735',
    current_price: 15.22,
    market_cap: 1071651724,
    market_cap_rank: 97,
    fully_diluted_valuation: 1519426803,
    total_volume: 24495116,
    high_24h: 15.22,
    low_24h: 14.64,
    price_change_24h: 0.514709,
    price_change_percentage_24h: 3.5008,
    market_cap_change_24h: 38482606,
    market_cap_change_percentage_24h: 3.72472,
    circulating_supply: 70530000,
    total_supply: 100000000,
    max_supply: null,
    ath: 198.38,
    ath_change_percentage: -92.34088,
    ath_date: '2018-01-15T00:00:00.000Z',
    atl: 0.078349,
    atl_change_percentage: 19292.96029,
    atl_date: '2016-10-21T00:00:00.000Z',
    roi: {
      times: 421.70370996505085,
      currency: 'usd',
      percentage: 42170.37099650508,
    },
    last_updated: '2024-06-05T06:47:09.616Z',
  },
  {
    id: 'elrond-erd-2',
    symbol: 'egld',
    name: 'MultiversX',
    image:
      'https://coin-images.coingecko.com/coins/images/12335/large/egld-token-logo.png?1696512162',
    current_price: 39.77,
    market_cap: 1070216586,
    market_cap_rank: 98,
    fully_diluted_valuation: 1070420622,
    total_volume: 21566720,
    high_24h: 39.72,
    low_24h: 38.62,
    price_change_24h: 0.935228,
    price_change_percentage_24h: 2.40835,
    market_cap_change_24h: 24877507,
    market_cap_change_percentage_24h: 2.37985,
    circulating_supply: 27023485,
    total_supply: 27028637,
    max_supply: 31415926,
    ath: 545.64,
    ath_change_percentage: -92.7269,
    ath_date: '2021-11-23T10:33:26.737Z',
    atl: 6.51,
    atl_change_percentage: 509.91168,
    atl_date: '2020-10-07T01:44:53.554Z',
    roi: null,
    last_updated: '2024-06-05T06:46:53.930Z',
  },
  {
    id: 'the-sandbox',
    symbol: 'sand',
    name: 'The Sandbox',
    image:
      'https://coin-images.coingecko.com/coins/images/12129/large/sandbox_logo.jpg?1696511971',
    current_price: 0.469293,
    market_cap: 1059620694,
    market_cap_rank: 99,
    fully_diluted_valuation: 1403017738,
    total_volume: 82076267,
    high_24h: 0.469296,
    low_24h: 0.445623,
    price_change_24h: 0.01913146,
    price_change_percentage_24h: 4.24991,
    market_cap_change_24h: 42030683,
    market_cap_change_percentage_24h: 4.13041,
    circulating_supply: 2265731926.2233224,
    total_supply: 3000000000,
    max_supply: 3000000000,
    ath: 8.4,
    ath_change_percentage: -94.42262,
    ath_date: '2021-11-25T06:04:40.957Z',
    atl: 0.02897764,
    atl_change_percentage: 1516.14753,
    atl_date: '2020-11-04T15:59:14.441Z',
    roi: null,
    last_updated: '2024-06-05T06:47:17.229Z',
  },
  {
    id: 'akash-network',
    symbol: 'akt',
    name: 'Akash Network',
    image:
      'https://coin-images.coingecko.com/coins/images/12785/large/akash-logo.png?1696512580',
    current_price: 4.48,
    market_cap: 1050502061,
    market_cap_rank: 100,
    fully_diluted_valuation: 1073808661,
    total_volume: 9919547,
    high_24h: 4.53,
    low_24h: 4.3,
    price_change_24h: 0.090455,
    price_change_percentage_24h: 2.06243,
    market_cap_change_24h: 23597352,
    market_cap_change_percentage_24h: 2.29791,
    circulating_supply: 234090486.767749,
    total_supply: 239284054.222104,
    max_supply: 388539008,
    ath: 8.07,
    ath_change_percentage: -44.59608,
    ath_date: '2021-04-06T18:59:48.484Z',
    atl: 0.164994,
    atl_change_percentage: 2611.52417,
    atl_date: '2022-11-21T20:30:53.727Z',
    roi: null,
    last_updated: '2024-06-05T06:47:08.291Z',
  },
]

export function CryptoApi() {
  //   type validation for tsx

  const [crytoMappedApi, setCrytoMappedApi] = useState<
    CryptoMappedImagesType[]
  >([])

  // filter state

  const [filter, setFilter] = useState<string>('')

  const [inpReq, setInpReq] = useState<string>('')

  const [inpReqOk, setInpReqOk] = useState<string>('')

  // Filtered data based on the filter state
  const filteredData = crytoMappedApi.filter((item) =>
    item.id.toLowerCase().includes(filter.toLowerCase()),
  )

  // star clr state

  const [isFilled, setIsFilled] = useState(false)

  // star id only ID'S
  const [selectedStars, setSelectedStars] = useState<string[]>([]) // Store the IDs of the selected stars

  // FUNCTION FOR FORMATTING NUMBERS

  // Function to format prices
  const formatPrice = (price: number): string => {
    let formattedPrice: string = (Math.round(price * 100) / 100).toFixed(2)

    // Check if the price is greater than 999
    if (+formattedPrice > 999) {
      // Format the price with commas
      formattedPrice = formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return `$${formattedPrice}`
  }

  function getFirstTwoDecimalNumbers(num: number): number {
    // Convert the number to a string with two decimal places using toFixed
    const truncatedString: string = num.toFixed(2)
    // Parse the truncated string back to a number
    const truncatedNumber: number = parseFloat(truncatedString)
    return truncatedNumber
  }

  // API CALL 1

  useEffect(() => {
    async function cryptoCatagoriesImgFetch() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
        )

        const data = await response.json()

        setCrytoMappedApi(data)

        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    cryptoCatagoriesImgFetch()
  }, [])

  const buttonRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([])

  useEffect(() => {
    filteredData.forEach((_, index) => {
      // Ensure the buttonRefs array has enough space for all buttons
      if (!buttonRefs.current[index]) {
        buttonRefs.current[index] = React.createRef<HTMLDivElement>()
      }
    })

    // Filter out null values from buttonRefs.current array
    const validButtonRefs = buttonRefs.current.filter(
      (ref) => ref.current !== null,
    )

    validButtonRefs.forEach((buttonRef) => {
      tippy(buttonRef.current!, {
        content: 'Remember',
        placement: 'top',
        theme: 'translucent',
        // Additional options as needed
        appendTo: () => document.body, // Ensuring the tooltip is appended to body
        allowHTML: true, // Allow HTML content in the tooltip
        onShow(instance) {
          // Adding a custom class to the tooltip content
          const tooltipContent = instance.popper?.querySelector(
            '.tippy-content',
          )

          if (tooltipContent) {
            const currentTheme = document.documentElement.getAttribute(
              'data-theme',
            )
            if (currentTheme === 'light') {
              ;(tooltipContent as HTMLElement).style.color = '#fff'
              ;(tooltipContent as HTMLElement).style.fontWeight = '#000'
            } else {
              // ;(tooltipContent as HTMLElement).parentNode.style.background ===
              //   '#fff'
              ;(tooltipContent as HTMLElement).style.color = '#000'
              ;(tooltipContent as HTMLElement).style.fontWeight = 'bold'
              ;(tooltipContent as HTMLElement).style.background = '#fff'
            }
          }
        },
      })
    })
  }, [filteredData])

  // white space regular ex.
  const regexInp = /^\s*$/

  // length of input is no more than 15
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= 21) {
      setFilter(value)
    }
    if (regexInp.test(value)) {
      setFilter('')
    }
    if (!regexInp.test(value)) {
      setInpReqOk('')
    }

    if (value.length === 0) {
      setInpReq('')
    }

    if (regexInp.test(value) && value.length !== 0) {
      setInpReq(' ❌ No starting empty space allowed ❌')
    }
  }

  function startClckedFav(id: string) {
    // changing the star color to filled when clicked
    setIsFilled(!isFilled)
    // setSelectedStars((prevSelectedStars) => {
    // // Check if the star is already selected
    // if (prevSelectedStars.includes(id)) {
    //   // If it is, remove it from the selected stars array
    //   return prevSelectedStars.filter((starId) => starId !== id)
    // } else {
    //   // If it's not, add it to the selected stars array
    //   return [...selectedStars, id]
    // }
    // Check if the clicked star is already selected

    setSelectedStars((prevSelectedStars) => {
      if (prevSelectedStars.includes(id)) {
        console.log(9)
        return prevSelectedStars.filter((starId) => starId !== id)
      } else {
        return [id]
      }
    })
    // return selectedStars

    console.log(selectedStars)
  }

  return (
    <>
      <div>
        <LightAndDarkMode />
      </div>
      <div className="flex flex-col items-center">
        <p onChange={handleFilterChange}>
          {regexInp.test(filter) ? (
            <span className="Blvk">{inpReq}</span>
          ) : (
            <span>{inpReqOk}</span>
          )}
        </p>
      </div>
      {/* filter input */}
      <div className="m-7">
        <input
          type="text"
          placeholder="Crypto search..."
          value={filter}
          className={
            filter.length > 0
              ? 'form-control mx-auto w-96 bg-yellow-400 text-black placeholder:text-black placeholder:p-5 p-1 rounded font-bold INPLGHT'
              : 'form-control mx-auto w-96 bg-yellow-400 text-black placeholder:text-black placeholder:p-5 p-1 border-2 rounded font-bold search INPLGHT'
          }
          onChange={handleFilterChange}
        />
      </div>
      {/* end filtering input */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:hidden">
        {/* Use the buttonRef for the button element */}

        {filteredData?.map((cryptos, index) => (
          <>
            <div className="border-2 BC MHIGHT" key={index}>
              <h3 className="flex px-3 text-2xl">{`${cryptos.market_cap_rank})`}</h3>
              <div className="flex flex-col justify-start items-center">
                <div
                  className={`bg-transparent text-color border-0 ST`}
                  ref={buttonRefs.current[index]}
                >
                  {/* <FontAwesomeIcon
                    key={index}
                    icon={farStar}
                    onClick={() => startClckedFav(index)}
                    className="m-2 starSize hover:cursor-pointer"
                  /> */}
                  <FontAwesomeIcon
                    key={index}
                    icon={isFilled ? faStarSolid : faStarRegular}
                    onClick={() => startClckedFav(cryptos.id)} // Use cryptoTBLEData.id directly
                    className="mt-2 starSize hover:cursor-pointer"
                    color={isFilled ? 'yellow' : 'white'}
                  />
                </div>

                <p className="capitalize first-letter:text-yellow-500 first-letter:font-bold CN">
                  coin:
                </p>
                <img
                  src={cryptos.image}
                  className="crytoImageHeight object-contain capitalize p-7"
                  alt={`${cryptos.symbol}.`}
                  title={cryptos.id}
                />
              </div>
              <p className="text-center capitalize font-bold p-1 ST">
                {cryptos.id}
              </p>
              <small className="text-center capitalize font-light ST">
                {`(${cryptos.symbol})`}
              </small>
              <h3 className="capitalize m-2 ST">current price:</h3>
              <p className="text-center capitalize font-bold ST">
                {formatPrice(cryptos.current_price)}{' '}
              </p>
              <div className="flex flex-col items-center p-4">
                <h3 className="ST">24h:</h3>
                {(cryptos.price_change_24h / 2) * 100 >=
                  cryptos.market_cap_change_percentage_24h ||
                (cryptos.price_change_24h / 2) * 100 <=
                  cryptos.market_cap_change_percentage_24h ? (
                  <>
                    <p className="text-green-400">
                      <svg
                        className="mx-auto"
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 320 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="text-green-400"
                          d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                        ></path>
                      </svg>
                      {getFirstTwoDecimalNumbers(
                        cryptos.price_change_percentage_24h,
                      )}
                      %
                    </p>
                  </>
                ) : (
                  <>
                    <svg
                      className="mx-auto"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 320 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="text-red-400"
                        d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
                      ></path>
                    </svg>
                    <p className="text-green-400">
                      {getFirstTwoDecimalNumbers(
                        cryptos.price_change_percentage_24h,
                      )}
                      %
                    </p>
                  </>
                )}
              </div>

              <div className="flex flex-col items-center p-4">
                <h3 className="ST">1W:</h3>
                <p>
                  {cryptos.price_change_24h - 7 / 2 <=
                  cryptos.market_cap_change_percentage_24h ? (
                    <>
                      <p className="text-red-400">
                        <svg
                          className="mx-auto text-red-400"
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 320 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"></path>
                        </svg>
                        {getFirstTwoDecimalNumbers(
                          cryptos.price_change_percentage_24h / 3.5,
                        )}
                        %
                      </p>
                    </>
                  ) : (
                    <>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        className="mx-auto text-green-400"
                        stroke-width="0"
                        viewBox="0 0 320 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"></path>
                      </svg>
                      <p className="text-green-400 font-bold">
                        {getFirstTwoDecimalNumbers(
                          cryptos.price_change_percentage_24h / 3.5,
                        )}
                        %
                      </p>
                    </>
                  )}
                </p>
                <div>
                  <span className="ST">
                    <FaArrowAltCircleDown />
                  </span>
                </div>
                <h2 className="capitalize p-2 ST">24h volume</h2>
                <p className="ST">{formatPrice(cryptos.total_volume)}</p>
              </div>
              <h2 className="capitalize p-2 ST">Market cap</h2>
              <p className="ST">{formatPrice(cryptos.market_cap)}</p>
            </div>
            <hr className="hidden" />
          </>
        ))}
      </div>

      {/* END VIEWPORT 1 */}
      <table className="hidden TBLgr xl:flex xl:flex-col">
        <hr
          className={
            regexInp.test(filter)
              ? 'flex justify-around m-2 capitalize mx-auto'
              : 'hidden'
          }
        />
        {filteredData.length !== 0 && (
          <div>
            <tr className="flex justify-around m-2 capitalize mx-auto">
              {/* {filteredData.length === 0 &&} */}

              <th className="Blvk">#</th>
              <th className="ST text-2xl text-center first-letter:text-yellow-500 BLFL">
                coin
              </th>
              <hr className="invisible" />
              <th className="ST text-2xl">current price</th>
              <th className="ST text-2xl">24h</th>
              <th className="ST text-2xl">1W</th>
              <th className="ST text-2xl">24h volume</th>
              <th className="ST text-2xl">market cap</th>
            </tr>
          </div>
        )}
        {filteredData.length !== 0 && <hr className="border-t-4 mb-2" />}
        {initialData.map((cryptoTBLEData, index) => (
          <>
            <tr key={index}>
              <div>
                <tr className="flex justify-around capitalize mx-auto m-1 items-center">
                  <span
                    className={`bg-transparent text-color ST`}
                    ref={buttonRefs.current[index]}
                  >
                    {/* <FontAwesomeIcon
                      key={index}
                      icon={isFilled ? faStarSolid : faStarRegular}
                      onClick={() => startClckedFav(Number(cryptoTBLEData.id))}
                      className="mt-2 starSize hover:cursor-pointer"
                      color={isFilled ? 'yellow' : 'white'}
                    /> */}
                    <FontAwesomeIcon
                      key={index}
                      icon={isFilled ? faStarSolid : faStarRegular}
                      onClick={() => startClckedFav(cryptoTBLEData.id)} // Use cryptoTBLEData.id directly
                      className="mt-2 starSize hover:cursor-pointer"
                      color={isFilled ? 'yellow' : 'white'}
                    />
                  </span>
                  <div className="flex items-center">
                    <p className="Blvk">{`${cryptoTBLEData.market_cap_rank})`}</p>
                    <div className="block">
                      <img
                        src={cryptoTBLEData.image}
                        alt={`${cryptoTBLEData.symbol}.`}
                        className="h-14 p-2 pl-3"
                        title={cryptoTBLEData.id}
                      />
                    </div>
                  </div>

                  <hr className="invisible" />
                  <p className="ST text-2xl">
                    {formatPrice(cryptoTBLEData.current_price)}{' '}
                  </p>
                  <td className="ST">
                    {cryptoTBLEData.price_change_24h * 100 >
                      cryptoTBLEData.market_cap_change_percentage_24h ||
                    (cryptoTBLEData.price_change_24h / 2) * 100 <=
                      cryptoTBLEData.market_cap_change_percentage_24h ? (
                      <>
                        <p className="text-green-400">
                          <svg
                            className="mx-auto"
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 320 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="text-green-400"
                              d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                            ></path>
                          </svg>
                          {getFirstTwoDecimalNumbers(
                            cryptoTBLEData.price_change_percentage_24h,
                          )}
                          %
                        </p>
                      </>
                    ) : (
                      <>
                        <svg
                          className="mx-auto"
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 320 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="text-red-400"
                            d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
                          ></path>
                        </svg>
                        <p className="text-red-400">
                          {getFirstTwoDecimalNumbers(
                            cryptoTBLEData.price_change_percentage_24h,
                          )}
                          %
                        </p>
                      </>
                    )}
                  </td>
                  <td className="ST">
                    {(cryptoTBLEData.price_change_24h * 7) / 2 <=
                    cryptoTBLEData.market_cap_change_percentage_24h ? (
                      <>
                        <p className="text-red-400">
                          <svg
                            className="mx-auto text-red-400"
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 320 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"></path>
                          </svg>
                          {getFirstTwoDecimalNumbers(
                            cryptoTBLEData.price_change_percentage_24h / 3.5,
                          )}
                          %
                        </p>
                      </>
                    ) : (
                      <>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          className="mx-auto text-green-400"
                          stroke-width="0"
                          viewBox="0 0 320 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"></path>
                        </svg>
                        <p className="text-green-400 font-bold">
                          {getFirstTwoDecimalNumbers(
                            cryptoTBLEData.price_change_percentage_24h / 3.5,
                          )}
                          %
                        </p>
                      </>
                    )}
                  </td>
                  <p className="ST">
                    {formatPrice(cryptoTBLEData.total_volume)}
                  </p>
                  <p className="ST">{formatPrice(cryptoTBLEData.market_cap)}</p>
                </tr>
              </div>
              <hr className="" />
            </tr>
          </>
        ))}
      </table>
      {filteredData.length === 0 && (
        <>
          <div className="flex justify-center items-center flex-col mt-20">
            {filter.length > 20 ? (
              <div className="flex flex-col m-auto items-center">
                <img src={noEntry} className="btcBL" alt="" />
                <p className="m-3 text-2xl">Maximum character's reached</p>
              </div>
            ) : (
              <div className="text-2xl">
                <img
                  src={noBtcBL}
                  className={regexInp.test(filter) ? 'hidden' : 'btcBL'}
                  alt="NO CURRENCY."
                />
                <h2 className={regexInp.test(filter) ? 'hidden' : 'm-3'}>
                  "{filter}"
                </h2>
                <p className={regexInp.test(filter) ? 'hidden' : 'm-3'}>
                  Currency not found
                </p>
              </div>
            )}

            {/* {regexInp.test(filter) ? <p>x</p> : <p>ssxxsfdfd</p>} */}
          </div>
        </>
      )}
    </>
  )
}
