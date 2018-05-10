import React from 'react';
import './Output.js';
const Output = (props) => {
  return(
    <div className="Output">
      <p className="Output-porez">Porez: {props.porez}HRK</p>
      <p className="Output-prirez">Prirez: {props.prirez}HRK</p>
      <p className="Output-troskovi">Troškovi: {props.troskovi}HRK</p>
      <p className="Output-profit">Profit: {props.profit}HRK</p>
    </div>
  );
}

export default Output;