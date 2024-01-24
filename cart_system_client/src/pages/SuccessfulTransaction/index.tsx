"use client";
import React from "react";
import "./index.scss";
import { useRouter } from "next/navigation";

const SuccessfulTransaction: React.FC = () => {
  const navigate = useRouter();

  const handleBack = () => {
    navigate.push("/");
  };

  return (
    <div className="successful-transaction">
      <div className="successful-transaction__container">
        <h1 className="successful-transaction__heading">Payment Successful!</h1>
        <p className="successful-transaction__message">Thank you for your purchase!</p>
        <button className="successful-transaction__backButton" onClick={handleBack}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessfulTransaction;