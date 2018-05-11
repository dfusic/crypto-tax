import React, { Component } from 'react';
import Input from './components/Input/Input';
import Output from './components/Output/Output';
import './App.css';

class App extends Component {
  
  state = {
    porez:'0.00',
    prirez: '0.00',
    troskovi: '0.00',
    profit: '0.00',
    ulozeno: '0.00',
    prodano: '0.00',
    mjestoStanovanja: '',
    profitUSD: '0.00',
    profitEUR: '0.00',
    profitBTC: '0.00',
    profitETH: '0.00'
  }

  UlozenoInputChangeHandler = (event) => {
    this.setState({
      ulozeno: event.target.value
    });
  }
  ProdanoInputChangeHandler = (event) => {
    this.setState({
      prodano: event.target.value
    });
  }
  StanovanjeInputChangeHandler = (event) => {
    this.setState({
      mjestoStanovanja: event.target.value
      });
  }
  CalculatePorez = () => {
    let razlika = this.state.prodano - this.state.ulozeno;
    let porez = razlika * (12 / 100);
    return porez.toFixed(2);
  }

  CalculatePrirez= () => {
    fetch('https://api.jsonbin.io/b/5af2de2a0fb4d74cdf23d908')
    .then((response)=>{
      return response.json();
    }).then((myJson) => {
      this.setState({
        porez: this.CalculatePorez()
      });
      let prirezJson = myJson.prirez;
      for(let i = 0; i < prirezJson.length; i++){
        if(prirezJson[i][0].toLowerCase() === this.state.mjestoStanovanja.toLowerCase()){
          let prirezMultiplier = prirezJson[i][1] / 100;
          console.log(prirezMultiplier);
          this.setState({
            prirez: this.state.porez * prirezMultiplier
          })
        }
      }
      const razlika = this.state.prodano - this.state.ulozeno;
      const troskovi = razlika - (razlika - this.state.porez - this.state.prirez);
      const profit = razlika - this.state.porez - this.state.prirez;
      this.setState({
        troskovi: troskovi.toFixed(2),
        profit: profit.toFixed(2)
      });
      // get profit USD price
      fetch('https://free.currencyconverterapi.com/api/v5/convert?q=USD_HRK,HRK_USD&compact=ultra')
        .then((response)=>{
          return response.json();
        }).then((json) =>{
          let profitUsd= this.state.profit * json.HRK_USD;
          this.setState({
            profitUSD: profitUsd.toFixed(2)
          });
          fetch('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&limit=2')
          .then((response) => {
            return response.json();
          }).then((json)=>{
            console.log(json)
            let btcUsdPrice = json.data[1].quotes.USD.price;
            let usdBtcPrice = 1 / btcUsdPrice;
            let ethUsdPrice = json.data[1027].quotes.USD.price;
            let usdEthPrice = 1 / ethUsdPrice;
            this.setState({
              profitBTC: this.state.profitUSD * usdBtcPrice,
              profitETH: this.state.profitUSD * usdEthPrice,
            });
          })
        });
        // profit EUR price
        fetch('https://free.currencyconverterapi.com/api/v5/convert?q=EUR_HRK,HRK_EUR&compact=ultra')
          .then((response)=>{
            return response.json();
          }).then((json)=>{
            let profitEur = this.state.profit * json.HRK_EUR
            this.setState({
              profitEUR: profitEur.toFixed(2),
            })
          });
          
          
    })
  }

  SubmitEventHandler = (event) => {
    event.preventDefault();
    this.CalculatePrirez();
  }

  render() {
    return (
      <div className="App">
        <h1 className="App-title">CryptoTax</h1>
        <p className="App-desc">Aplikacija za izračunavanje poreza na kriptovalute.</p>
        <Input 
        ulozenoChange={this.UlozenoInputChangeHandler} 
        prodanoChange={this.ProdanoInputChangeHandler} 
        stanovanjeChange={this.StanovanjeInputChangeHandler}/>
        <Output 
        porez={this.state.porez} 
        prirez={this.state.prirez} 
        troskovi={this.state.troskovi} 
        profit={this.state.profit}
        profitUSD={this.state.profitUSD}
        profitEUR={this.state.profitEUR}
        profitBTC={this.state.profitBTC}
        profitETH={this.state.profitETH}/>
        <input 
        type="submit" 
        value="Calculate" 
        onClick={this.SubmitEventHandler}/>
      </div>
    );
  }
}

export default App;
