import axios, { Axios, AxiosError } from "axios";
import { HistoryCallback, IBasicDataFeed, LibrarySymbolInfo, OnReadyCallback, PeriodParams, ResolutionString, ResolveCallback, SearchSymbolsCallback, SubscribeBarsCallback, SymbolResolveExtension } from "__static/charting_library";

export class Datafeed implements IBasicDataFeed {

  onReady(callback: OnReadyCallback) {
    callback({
      exchanges: [
        {
          value: "",
          name: "All Exchanges",
          desc: "",
        },
        {
          value: "Binance",
          name: "Binance",
          desc: "Bitcoin Price Index",
        },
      ],
      symbols_types: [
        {
          name: "BTC",
          value: "bitcoin",
        },
        {
          name: "ETH",
          value: "ethereum",
        },
        {
          name: "ADA",
          value: "cardano",
        },
        {
          name: "BNB",
          value: "binancecoin",
        },
      ],
    });
  }

  searchSymbols(
    userInput: string,
    exchange: string,
    symbolType: string,
    onResult: SearchSymbolsCallback
  ) {
    onResult([
      {
        symbol: "BTC/USDT",
        full_name: "BTCUSDT",
        description: "BTC",
        exchange: "Binance",
        type: "bitcoin",
        ticker: "BTCUSDT",
      },
      {
        symbol: "ETH/USDT",
        full_name: "ETHUSDT",
        description: "ETH",
        exchange: "Bitso",
        type: "ethereum",
        ticker: "ETHUSDT",
      },
      {
        symbol: "ADA/USDT",
        full_name: "ADAUSDT",
        description: "ADA",
        exchange: "Binance",
        type: "cardano",
        ticker: "ADAUSDT",
      },
      {
        symbol: "BNB/USDT",
        full_name: "BNBUSDT",
        description: "BNB",
        exchange: "Binance",
        type: "binancecoin",
        ticker: "BNBUSDT",
      },
    ]);
  }

  resolveSymbol(
    symbolName: string,
    onResolve: ResolveCallback,
    onError: (err: string) => void,
    extension?: SymbolResolveExtension
  ) {
    const symbols = ["BTCUSDT", "ETHUSDT", "ADAUSDT", "BNBUSDT"];


    if (!symbols.includes(symbolName)) {
      onError("Símbolo não suportado");
    } else {
      onResolve({
        name: symbolName,
        exchange: "Binance",
        description: symbolName,
        type: "crypto",
        session: "24x7",
        timezone: "Etc/UTC",
        ticker: symbolName,
        minmov: 1,
        pricescale: 100,
        has_intraday: true,
        supported_resolutions: ["1", "3", "5", "15", "30", "60", "120", "180", "240", "1D", "1W", "1M"],
        format: "price",
        volume_precision: 8,
        data_status: "streaming",
      });
    }
  }

  async getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onResult: HistoryCallback,
    onError: (error: string) => void
  ): Promise<void> {
    
    const symbol = symbolInfo.name;
    let interval: string;

    switch (resolution) {
      case "1":
        interval = "1m";
        break;
      case "3":
        interval = "3m";
        break;
      case "5":
        interval = "5m";
        break;
      case "15":
        interval = "15m";
        break;
      case "30":
        interval = "30m";
        break;
      case "60":
        interval = "1h";
        break;
      case "120":
        interval = "2h";
        break;
      case "180":
        interval = "3h";
      case "240":
        interval = "4h";
        break;
      case "1D":
        interval = "1d";
        break;
      case "1W":
        interval = "1w";
        break;
      case "1M":
        interval = "1M";
        break;
      default:
        interval = "1d";
    }

    try {
      const bars: any[] = [];
      const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`;
      const response = await axios.get(url);
      for (let i = 0; i < response.data.length; i++) {
        bars.push({
          time: response.data[i][0],
          open: response.data[i][1],
          high: response.data[i][2],
          low: response.data[i][3],
          close: response.data[i][4],
          volume: response.data[i][5],
        });
      }
      onResult(bars, { noData: false });
    } catch (error: any) {
      onError(error);
    }
  }

  subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: () => void
  ) {
    const interval = setInterval(() => {
      this.getBars(
        symbolInfo,
        resolution,
        { to: Date.now() } as PeriodParams,
        (bars) => {
          onTick(bars[bars.length - 1]);
        },
        () => {}
      );
    }, 1000);
    return function () {
      clearInterval(interval);
    };
  }

  unsubscribeBars(listenerGuid: string) {
    clearInterval(listenerGuid);
  }
}