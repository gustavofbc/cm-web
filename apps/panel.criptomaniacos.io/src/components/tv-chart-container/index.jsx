import React, { Fragment, useEffect } from "react";
import styles from "./index.module.css";
import { widget } from "__static/charting_library";
import { Datafeed } from "./widgets/datafeed";

function TVChartContainer() {
  const ref = React.createRef();

  useEffect(() => {
    let tvWidget = new widget({
      symbol: "BTCUSDT",
      datafeed: new Datafeed(),
      theme: "dark",
      interval: "D",
      container: ref.current,
      library_path: "/static/charting_library/",
      locale: "en",
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: "https://saveload.tradingview.com",
      charts_storage_api_version: "1.1",
      client_id: "tradingview.com",
      user_id: "public_user_id",
      autosize: true,
      // fullscreen: true,
      studies_overrides: {},
    });

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!");
            },
          }),
        );
        button.innerHTML = "Check API";
      });
    });

    return () => {
      if (tvWidget !== null) {
        tvWidget.remove();
        tvWidget = null;
      }
    };
  }, [ref]);

  return (
    <div>
      <div ref={ref} className={styles.TVChartContainer} />
    </div>
  );
}

export default TVChartContainer
