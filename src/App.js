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
    mjestoStanovanja: ''
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
      })
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
        profit={this.state.profit}/>
        <input 
        type="submit" 
        value="Calculate" 
        onClick={this.SubmitEventHandler}/>
      </div>
    );
  }
}

export default App;
