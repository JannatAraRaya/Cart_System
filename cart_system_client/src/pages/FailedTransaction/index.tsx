"use client";
import React from "react";
import "./index.scss";
import { useRouter } from "next/navigation";

const FailedTransaction: React.FC = () => {
  const navigate = useRouter();

  const handleBack = () => {
    navigate.push("/");
  };

  return (
    <div className="failed-transaction">
      <div className="failed-transaction__container">
        <h1 className="failed-transaction__heading">Sorry! Transaction failed...</h1>
        <p className="failed-transaction__message">Thanks for being with us.</p>
        <button className="failed-transaction__backButton" onClick={handleBack}>
          Go to home
        </button>
      </div>
    </div>
  );
};

export default FailedTransaction;