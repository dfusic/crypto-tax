import React from 'react';
import './Input.css';

const Input = (props) => {
  return(
    <div className="Input">
      <label htmlFor="ulozeno">Uloženo</label>
      <input type="number" min='1' id="ulozeno" placeholder="" onChange={props.ulozenoChange}/>
      <label htmlFor="prodano">Prodano</label>
      <input type="number" min='1' id="prodano" placeholder="" onChange={props.prodanoChange}/>
      <label htmlFor="stanovanje">Mjesto stanovanja</label>
      <input type="text" id="stanovanje" placeholder="" onChange={props.stanovanjeChange}/>
    </div>
  );
}

export default Input;