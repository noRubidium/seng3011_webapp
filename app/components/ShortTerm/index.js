import React, {PropTypes} from 'react';

export default class ShortTerm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <div className='page-title'>Short Term Trading</div>
      <div className='sub-title' data-toggle='collapse' href='#techana'>
          <span className='caret'></span> What is Technical Analysis?
      </div>
      <div className='collapse' id='techana'>
        <div className='well'>
          <p>
            Technical analysis is a trading tool employed to evaluate securities and attempt to forecast their future movement by analyzing statistics gathered from trading activity, such as price movement and volume. Unlike fundamental analysts who attempt to evaluate a security's intrinsic value, technical analysts focus on charts of price movement and various analytical tools to evaluate a security's strength or weakness and forecast future price changes.
          </p>
        </div>
      </div>
      <div className='sub-title' data-toggle='collapse' href='#howtouse'>
          <span className='caret'></span> How Technical Analysis Is Used?
      </div>
      <div className='collapse' id='howtouse'>
        <div className='well'>
          <p>
            Technical analysis is used to attempt to forecast the price movement of virtually any tradable instrument that is generally subject to forces of supply and demand, including stocks, bonds, futures and currency pairs. In fact, technical analysis can be viewed as simply the study of supply and demand forces as reflected in the market price movements of a security. It is most commonly applied to price changes, but some analysts may additionally track numbers other than just price, such as trading volume or open interest figures.
          </p>
          <p>
            Over the years, numerous technical indicators have been developed by analysts in attempts to accurately forecast future price movements. Some indicators are focused primarily on identifying the current market trend, including support and resistance areas, while others are focused on determining the strength of a trend and the likelihood of its continuation. Commonly used technical indicators include trendlines, moving averages and momentum indicators such as the moving average convergence divergence (MACD) indicator.
          </p>
          <p>
            Technical analysts apply technical indicators to charts of various timeframes. Short-term traders may use charts ranging from one-minute timeframes to hourly or four-hour timeframes, while traders analyzing longer-term price movement scrutinize daily, weekly or monthly charts.
          </p>
        </div>
      </div>
      <div className='sub-title' data-toggle='collapse' href='#yyy'>
          <span className='caret'></span> How to do Technical Analysis?
      </div>
      <div className='collapse' id='yyy'>
        <div className='well'>
          <p>
            Technical analysis is based on three assumptions:
          </p>
          <p>
            The market discounts everything.
          </p>
          <p>
            Price moves in trends.
          </p>
          <p>
            History tends to repeat itself.
          </p>
          <p>1. The Market Discounts Everything</p>
<p>
Many experts criticize technical analysis because it only considers price movements and ignores fundamental factors. The counterargument is based on the Efficient Market Hypothesis, which states that a stock’s price already reflects everything that has or could affect a company – including fundamental factors. Technical analysts believe that everything from a company’s fundamentals to broad market factors to market psychology are already priced into the stock. This removes the need to consider the factors separately before making an investment decision. The only thing remaining is the analysis of price movements, which technical analysts view as the product of supply and demand for a particular stock in the market.
</p><p>
2. Price Moves in Trends
</p><p>
Technical analysts believe that prices move in short-, medium-, and long-term trend. In other words, a stock price is more likely to continue a past trend than move erratically. Most technical trading strategies are based on this assumption.
</p><p>
3. History Tends to Repeat Itself
</p><p>
Technical analysts believe that history tends to repeat itself. The repetitive nature of price movements is often attributed to market psychology, which tends to be very predictable based on emotions like fear or excitement. Technical analysis uses chart patterns to analyze these emotions and subsequent market movements to understand trends. While many form of technical analysis have been used for more than 100 years, they are still believed to be relevant because they illustrate patterns in price movements that often repeat themselves.
</p>
        </div>
      </div>
      <div className='sub-title' data-toggle='collapse' href='#chart'>
          <span className='caret'></span> How to use charts?
      </div>
      <div className='collapse' id='chart'>
        <div className='well'>
          <p>
            The idea of a trend is perhaps the most important concept in technical analysis. The meaning in finance isn’t all that different from the general definition of the term – a trend is really nothing more than the general direction in which a security or market is headed.

Take a look at the following chart:


<img src='http://i.investopedia.com/content/technical_analysis_/2_new.jpg' />
<p></p>Figure 1 – 5-Year S&P 500 SPDR (SPY) Chart – Source: StockCharts.com

<p></p>It isn’t difficult to see the trend higher in Figure 1. However, it’s not always that easy, as demonstrated in Figure 2 below.


<img src="http://i.investopedia.com/content/technical_analysis_/1new.jpg" />
<p></p>Figure 2 – 2-Month S&P 500 (SPY) Chart – Source: StockCharts.com

There are a lot of ups and downs in this chart, but there isn’t a clear definition of which direction the stock is headed.

A Formal Definition
Trends aren’t always easy to spot because prices almost never move in straight lines. Rather, prices tend to move in a series of highs and lows over time. In technical analysis, it is the overall direction of these highs and lows that constitute a trend. An uptrend is classified as a series of higher highs and higher lows, while a downtrend consists of lower lows and lower highs.
          </p>
        </div>
      </div>
      <div className='sub-title' data-toggle='collapse' href='#uuu'>
          <span className='caret'></span> Some suggestions
      </div>
      <div className='collapse' id='uuu'>
        <div className='well'>
          <p>
            WE LOVE OPTIVER :)
          </p>
        </div>
      </div>
    </div>);
  }
}

ShortTerm.propTypes = {
};
