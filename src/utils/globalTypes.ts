import { Dispatch, SetStateAction } from 'react';

export class NetworkError extends Error {
  status: number;
  date: Date;

  constructor(status: number, message: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NetworkError);
    }

    this.name = 'NetworkError';
    this.status = status;
    this.date = new Date();
  }
}

export interface IOffering {
  id?: string;
  offering_id?: string;
  offering_name?: string;
  asset_type?: string;
  media?: string[];

  geo_location?: LatLon;
  geo_shape?: GeoShape;
  gallery_media?: Array<IGalleryItem>;

  currency?: string;

  [key: string]: unknown;
}

export interface IAssetFilterData extends IOffering {
  quantity_holding_investor?: number;
  quantity_executed_int_buy_investor?: number;
  quantity_executed_bid_buy_investor?: number;
  quantity_executed_bid_sell_investor?: number;
  quantity_pending_int_buy_investor?: number;
  quantity_pending_bid_buy_investor?: number;
  quantity_pending_bid_sell_investor?: number;
  watch?: boolean;
}

export interface IOfferingSearch extends IOffering {
  location: string;
  formatted_place: string;
  description?: string;
  geo_location?: LatLon;
  geo_shape?: GeoShape;
  quantity_holding_investor?: number;
  quantity_executed_int_buy_investor?: number;
  quantity_executed_bid_buy_investor?: number;
  quantity_executed_bid_sell_investor?: number;
  quantity_pending_int_buy_investor?: number;
  quantity_pending_bid_buy_investor?: number;
  quantity_pending_bid_sell_investor?: number;
}

export interface IOfferingInfo extends IOffering {
  offering_status?: number;
  asset_valuation?: number;
  asset_valuation_current?: number;
  quantity?: number;
  total_quantity?: number;
  price?: number;
  buy_price?: number;
  valuation?: number;
  discount?: number;
  ttm_dividends?: number;
  dividends_yield?: number;
  hold_period?: number;
  start_at?: number;
  end_at?: number;
  days_start?: number;
  days_left?: number;
  funding_progress?: number;
  funded_count?: number;
  max_funded_count?: number;
  watch?: boolean;

  min_price_pending_bid_sell?: number;
  quantity_holding_investor?: number;
  avg_price_executed_buy_investor?: number;

  quantity_pending_investor_any?: number;
  quantity_pending_int_buy_investor?: number;
  quantity_pending_bid_buy_investor?: number;
  quantity_pending_bid_sell_investor?: number;
  avg_price_pending_bid_buy_investor?: number;
  avg_price_pending_bid_sell_investor?: number;

  volume_pending_int_buy?: number;
  volume_pending_bid_buy?: number;
  volume_pending_bid_sell?: number;

  total_dividends_investor?: number;
  dividends_yield_investor?: number;
}

export interface IAssetBrowsingData extends IOfferingInfo {
  description?: string;
  sponsor_name?: string;
  asset_name?: string;
  quantity_holding?: number;
  quantity_holding_investor?: number;
  quantity_executed_int_buy?: number;
  quantity_executed_bid_buy?: number;
  quantity_executed_bid_sell?: number;
  quantity_executed_buy?: number;
  quantity_executed_buy_investor?: number;
  quantity_executed_int_buy_investor?: number;
  quantity_executed_bid_buy_investor?: number;
  quantity_executed_bid_sell_investor?: number;
  quantity_pending_buy?: number;
  quantity_pending_int_buy?: number;
  quantity_pending_bid_buy?: number;
  quantity_pending_bid_sell?: number;
  quantity_pending_int_buy_investor?: number;
  quantity_pending_bid_buy_investor?: number;
  quantity_pending_bid_sell_investor?: number;
  quantity_pending_investor_any?: number;
  avg_price_pending_int_buy?: number;
  avg_price_pending_bid_buy?: number;
  avg_price_pending_bid_sell?: number;
  avg_price_pending_bid_buy_investor?: number;
  avg_price_pending_bid_sell_investor?: number;
  avg_price_executed_buy?: number;
  avg_price_executed_buy_investor?: number;
  avg_price_executed_int_buy_investor?: number;
  avg_price_executed_bid_buy_investor?: number;
  avg_price_executed_bid_sell_investor?: number;

  last_trade_created_at?: number;
  last_trade_quantity?: number;
  last_trade_price?: number;
  last_trade_currency?: string;

  min_pending_bid_sell_quantity?: number;
  min_pending_bid_sell_price?: number;
  min_pending_bid_sell_currency?: string;

  total_shares_sell_investor?: number;
  total_shares_buy_investor?: number;
  total_dividends_investor?: number;
}

export interface IAggBucket {
  key: string;
  name?: string;
  from?: string;
  to?: string;
  isSelected?: boolean;
  doc_count?: number;
}

export interface IFilterOptionsItem {
  keyName?: string;
  filterType?: string;
  isSelected?: boolean;
  isOpen?: boolean;
  filterValues?: IAggBucket[];
}

export interface IFilter {
  field: string;
  value?: string[];
}

export interface ILocationFilter {
  field?: string;
  value?: Envelope;
}

export type LatLon = {
  lat?: number;
  lon?: number;
};

export type Envelope = {
  tlLon: number;
  brLon: number;
  tlLat: number;
  brLat: number;
};

export type GeoShape = {
  coordinates: [];
  type: string;
};

export type Deal = {
  attributes: {
    contentful_id: string;
    asset_contentful_id: string;
    sponsor_contentful_id: string;
    asset_id: string;
    currency: string;
    id: string;
    name: string;
    price: number;
    quantity: number;
    sponsor_id: string;
  };
  type: string;
};

export interface IDealTitle {
  name?: string;
  description?: string;
  type?: string;
  offeringId?: string;
  buyEnabled?: boolean;
  sellEnabled?: boolean;
  withButton?: boolean;
  customClass?: string;
  redirectPath?: string;
}

// json table
export interface ITableData {
  data?: Array<{
    [key: string]: {
      text: string;
      className?: string;
    };
  }>;
  tableHeadings?: Array<{
    key: string;
    className?: string;
  }>;
}

// rich text json
export interface IRichText {
  data: Record<string, unknown>;
  content: {
    data: Record<string, unknown>;
    content: {
      data: Record<string, unknown>;
      marks?: never[];
      value?: string;
      nodeType: string;
    }[];
    nodeType?: string;
  }[];
  nodeType: string;
}

export type IMediaData = {
  fields: {
    file: {
      url: string;
      details?: {
        image: {
          height: number;
          width: number;
        };
      };
    };
    title?: string;
    description?: string;
  };
};

// Gallery
export interface IGalleryItem {
  original: string;
  thumbnail?: string;
  title?: string;
}

// Capital Stack
export interface ICapitalStack {
  stack: { title: string; color: string; percentage: number }[];
  total: number;
}

// Plans
export type plansType = Array<{
  item: Array<IGalleryItem>;
  prefix?: IRichText;
  label: string;
}>;

export interface IPerformanceData {
  [key: string]: {
    noi: number;
    rent: number;
    dividends: number;
  };
}

// Security Ratings
export interface IRatingItem {
  title: string;
  content: {
    percentage?: number;
    icon?: string;
    text?: string;
    color?: string;
  };
  description: string;
}

// Tables
export type tablesType = Array<{
  item: ITableData;
  prefix?: IRichText;
  label: string;
}>;

// RichTexts
export type richTextsType = Array<{
  item: IRichText;
  label: string;
}>;

export type ISponsorInfo = {
  name?: string;
  short_description?: string;
  description?: IRichText;
  contact?: {
    Website?: string[];
    Email?: string[];
    Phone?: string[];
  };
  logo?: IMediaData;
};

export type IMediaList = Array<IMediaData>;

export type INeighborhoodData = {
  neighborhood_media?: IMediaData;
  neighborhood_name?: IRichText;
};

export type IPhysicalDetails = {
  details: {
    [key: string]: string;
  };
  formatted_address: string;
};

export type IFinancialSummary = {
  financial_details_title?: string;
  financial_details?: {
    [key: string]: string;
  };
  financial?: Record<string, unknown>[];
  financial_title?: string;
};

export type IReq = {
  req?: Record<string, unknown>;
};

// Personal details
export interface IPersonalDetails {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  birth_date?: string;
  zipcode?: string;
  country?: string;
  phone?: string;
  gender?: string;

  [key: string]: unknown;
}

// Financial details
export interface IFinancialDetails {
  annual_income?: string;
  want_to_invest?: string;
  net_worth?: string;
  accredited_investor?: string;
  investment_experience?: string[];

  [key: string]: unknown;
}

export type SSRProps = {
  req: Record<string, unknown>;
  res: Record<string, unknown>;
  query: Record<string, unknown>;
};

export type AuthProps = {
  setMode: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
  error?: string;
};

// Comments Module
export interface ICommentsModule {
  post_id: string;
  parent_id?: string;
  message: string;
  display_name: string;
  created_at: number;
}

export interface INavItem {
  name: string;
  url: string;
  icon?: string;
  newTab?: boolean;
  auth?: boolean;
  system?: boolean;
  sponsor?: boolean;
  sideBar?: boolean;
  transparent?: boolean;
  background?: boolean;
  mobile?: boolean;
  tablet?: boolean;
  menuItems?: MenuItem[];
}

export interface ISideNavItem {
  url: string;
  name: string;
  links: Array<{
    name: string;
    url: string;
    system?: boolean;
    sponsor?: boolean;
  }>;
}

export type MenuItem = { name: string; action?: string; url?: string; newTab?: boolean };
