import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [myTip, setMytip] = useState(0);
  const [myFriendTip, setMyFriendTip] = useState(0);

  function handleReset() {
    setBill(0);
    setMytip(0);
    setMyFriendTip(0);
  }

  return (
    <>
      <BillInput bill={bill} onBill={setBill}></BillInput>
      <TipPercentage selectedPercentage={myTip} onTip={setMytip}>
        <p>How did you like the service?</p>
      </TipPercentage>
      <TipPercentage selectedPercentage={myFriendTip} onTip={setMyFriendTip}>
        <p>How did your friend like the service?</p>
      </TipPercentage>
      <Output bill={bill} myTip={myTip} myFriendTip={myFriendTip}></Output>
      {bill === 0 && myTip === 0 && myFriendTip === 0 ? null : (
        <Button handleReset={handleReset}></Button>
      )}
    </>
  );
}

function BillInput({ bill, onBill }) {
  return (
    <>
      <div className="div-info">
        <p>How much was the bill?</p>
        <input
          type="text"
          value={bill}
          onChange={(e) => onBill(Number(e.target.value))}
        />
      </div>
    </>
  );
}

function TipPercentage({ children, onTip, selectedPercentage }) {
  function handleOption(e) {
    const tip = Number(e.target.value);

    onTip(tip);
    console.log(selectedPercentage);
  }

  return (
    <div className="div-info">
      {children}
      <select value={selectedPercentage} onChange={(e) => handleOption(e)}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="0.05">It was okay (5%)</option>
        <option value="0.1">It was good (10%)</option>
        <option value="0.2">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, myTip, myFriendTip }) {
  const totalTip = (bill * ((myTip + myFriendTip) / 2)).toFixed(1);
  const totalBill = bill + Number(totalTip);
  // console.log(typeof totalBill);

  // const outputText = `You pay $${bill} my tip: ${myTip} my friend tip: ${myFriendTip} total Tip ${totalTip}`;
  const outputText =
    myTip === 0 && myFriendTip === 0
      ? `You pay $${totalBill}`
      : `You pay $${totalBill} ($${bill} + $${totalTip} tip)`;

  return <p>{!isNaN(bill) && bill !== 0 ? outputText : ""}</p>;
}

function Button({ handleReset }) {
  return <button onClick={() => handleReset()}>Reset</button>;
}
