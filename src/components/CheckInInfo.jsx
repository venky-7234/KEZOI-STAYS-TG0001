import React from 'react';

export default function CheckInInfo() {
  return (
    <div className="policy-block stay-guide">
      <span className="policy-eyebrow">Before You Settle In</span>
      <div className="settle-times" aria-label="Check-in and check-out times">
        <div><span>Check-in</span><strong>2:00 PM</strong></div>
        <div><span>Check-out</span><strong>11:00 AM</strong></div>
      </div>
      <ul className="settle-copy">
        <li>Smart-lock access makes arriving easy.</li>
        <li>A valid government-issued ID is required before check-in.</li>
        <li>Early check-in and late check-out are subject to availability and applicable charges.</li>
        <li>Please respect the home and care for the things around you.</li>
        <li>Please help us keep the surroundings peaceful.</li>
        <li>Smoking is permitted on the balconies only.</li>
      </ul>
      <div className="settle-signature">
        <span>Come as you are. Feel at home.</span>
      </div>
    </div>
  );
}
