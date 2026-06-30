import { useState, useEffect } from "react";
import motors from "./images/Motors.jpg";
import nedbank from "./images/banks/nedbank.svg";
import absa from "./images/banks/absa.svg";
import investec from "./images/banks/investec.svg";
import wesbank from "./images/banks/wesbank.svg";
import standardbank from "./images/banks/standardbank.svg";

export default function FinancePage() {
  const [vehiclePrice, setVehiclePrice] = useState("");
  const [deposit, setDeposit] = useState("");
  const [interestRate, setInterestRate] = useState("11.25");
  const [term, setTerm] = useState("72");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [loanAmount, setLoanAmount] = useState(null);
  const [calcError, setCalcError] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const banks = [
    { name: "Nedbank", logo: nedbank },
    { name: "ABSA", logo: absa },
    { name: "Investec", logo: investec },
    { name: "WesBank", logo: wesbank },
    { name: "Standard Bank", logo: standardbank },
  ];

  const bullets = [
    "No deposit options available",
    "Same-day delivery",
    "Black listed welcome",
  ];

  function calculate() {
    var price = parseFloat(vehiclePrice.replace(/[^\d.]/g, ""));
    var dep = parseFloat(deposit.replace(/[^\d.]/g, "") || "0");
    var rate = parseFloat(interestRate);
    var months = parseInt(term);

    if (!price || !rate || !months) {
      setCalcError("Please fill in all required fields.");
      return;
    }
    if (dep >= price) {
      setCalcError(
        "Deposit cannot be greater than or equal to the vehicle price."
      );
      return;
    }

    setCalcError("");
    var principal = price - dep;
    var monthlyRate = rate / 100 / 12;
    var payment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
      (Math.pow(1 + monthlyRate, months) - 1);

    setLoanAmount(principal);
    setMonthlyPayment(payment);
  }

  function fmt(val) {
    return (
      "R " +
      val.toLocaleString("en-ZA", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }

  var waMsg = monthlyPayment
    ? "Hi, I used your Finance Calculator. Vehicle Price: R" +
      vehiclePrice +
      ", Deposit: R" +
      (deposit || "0") +
      ", Term: " +
      term +
      " months. Estimated monthly payment: " +
      fmt(monthlyPayment) +
      ". I'd like to apply for finance."
    : "";

  var heroBg = {
    position: "relative",
    height: isMobile ? "200px" : "300px",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.45)), url(" +
      motors +
      ")",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    padding: isMobile ? "0 20px" : "0 48px",
  };

  var inputStyle = {
    width: "100%",
    padding: "14px 16px",
    border: "1.5px solid #e8e8e8",
    borderRadius: "6px",
    fontSize: "15px",
    color: "#111",
    outline: "none",
    boxSizing: "border-box",
  };

  var labelStyle = {
    display: "block",
    fontSize: "11px",
    color: "#999",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "8px",
  };

  return (
    <div
      id="finance"
      style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      {/* HERO BANNER */}
      <div style={heroBg}>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: isMobile ? "22px" : "40px",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.5px",
              lineHeight: 1.15,
              maxWidth: "580px",
            }}
          >
            Drive Away Today —<br />
            Finance Made Easy
          </h1>
          <p
            style={{
              color: "#ccc",
              marginTop: "14px",
              fontSize: isMobile ? "12px" : "15px",
              maxWidth: "500px",
              lineHeight: 1.6,
            }}
          >
            Fast approvals. Flexible terms. We work with South Africa's leading
            banks to get you on the road.
          </p>
        </div>
      </div>

      {/* PAGE BODY */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "32px 20px 48px",
        }}
      >
        {/* INTRO CARD */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: isMobile ? "20px 18px" : "32px 36px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
            marginBottom: "20px",
            display: "grid",

            gap: "28px",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                color: "#444",
                fontSize: isMobile ? "12px" : "15px",
                lineHeight: 1.7,
              }}
            >
              With our instant finance approval process, you don't have to wait.
              Use our calculator to estimate your monthly repayments, then apply
              online in minutes.
            </p>
            {bullets.map(function (item) {
              return (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      width: isMobile ? "14px" : "26px",
                      height: isMobile ? "14px" : "26px",
                      borderRadius: "50%",
                      backgroundColor: "#c9000a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        color: "white",
                        fontSize: isMobile ? "11px" : "13px",
                        fontWeight: 900,
                      }}
                    >
                      ✓
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: isMobile ? "12px" : "14px",
                      color: "#333",
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CALCULATOR CARD */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: isMobile ? "20px 18px" : "36px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              height: "3px",
              width: "48px",
              backgroundColor: "#c9000a",
              borderRadius: "10px",
              marginBottom: "12px",
            }}
          />
          <h2
            style={{
              margin: "0 0 4px",
              fontSize: "22px",
              fontWeight: 900,
              color: "#111",
            }}
          >
            Finance Calculator
          </h2>
          <p style={{ margin: "0 0 24px", color: "#888", fontSize: "13px" }}>
            Estimate your monthly repayment instantly.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            <div>
              <label style={labelStyle}>Vehicle Price (R) *</label>
              <input
                type="text"
                value={vehiclePrice}
                onChange={function (e) {
                  setVehiclePrice(e.target.value);
                }}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Deposit (R)</label>
              <input
                type="text"
                value={deposit}
                onChange={function (e) {
                  setDeposit(e.target.value);
                }}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Interest Rate (%) *</label>
              <input
                type="number"
                placeholder="e.g. 11.25"
                value={interestRate}
                onChange={function (e) {
                  setInterestRate(e.target.value);
                }}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Repayment Term *</label>
              <select
                value={term}
                onChange={function (e) {
                  setTerm(e.target.value);
                }}
                style={Object.assign({}, inputStyle, {
                  background: "white",
                  cursor: "pointer",
                })}
              >
                <option value="12">12 months</option>
                <option value="24">24 months</option>
                <option value="36">36 months</option>
                <option value="48">48 months</option>
                <option value="60">60 months</option>
                <option value="72">72 months</option>
              </select>
            </div>
          </div>

          {calcError && (
            <p
              style={{
                color: "#c9000a",
                fontSize: "13px",
                marginBottom: "16px",
                background: "#fff0f0",
                border: "1px solid #ffd0d0",
                padding: "10px 14px",
                borderRadius: "6px",
              }}
            >
              {calcError}
            </p>
          )}

          <button
            onClick={calculate}
            style={{
              background: "#c9000a",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "16px 40px",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Calculate Monthly Payment
          </button>

          {monthlyPayment !== null && (
            <div style={{ marginTop: "24px" }}>
              <div
                style={{
                  background: "#111",
                  borderRadius: "10px",
                  padding: isMobile ? "20px 16px" : "28px 32px",
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                  gap: "20px",
                  textAlign: "center",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#888",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Loan Amount
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 900,
                      color: "white",
                    }}
                  >
                    {fmt(loanAmount)}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#888",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Monthly Payment
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 900,
                      color: "#c9000a",
                    }}
                  >
                    {fmt(monthlyPayment)}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#888",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    Term
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 900,
                      color: "white",
                    }}
                  >
                    {term} months
                  </div>
                </div>
                <div
                  style={{
                    gridColumn: "1 / -1",
                    borderTop: "1px solid #333",
                    paddingTop: "14px",
                    fontSize: "11px",
                    color: "#666",
                  }}
                >
                  * Estimates only. Final rates subject to credit approval and
                  lender terms.
                </div>
              </div>
              <a
                href={
                  "https://wa.me/27789125551?text=" + encodeURIComponent(waMsg)
                }
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  backgroundColor: "#25D366",
                  color: "white",
                  textDecoration: "none",
                  padding: "16px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              >
                <span style={{ fontSize: "20px" }}>💬</span>
                Send My Estimate on WhatsApp & Apply Now
              </a>
            </div>
          )}
        </div>

        {/* APPLICATION FORM */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: isMobile ? "20px 18px" : "36px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              height: "3px",
              width: "48px",
              backgroundColor: "#c9000a",
              borderRadius: "10px",
              marginBottom: "12px",
            }}
          />
          <h2
            style={{
              margin: "0 0 4px",
              fontSize: "22px",
              fontWeight: 900,
              color: "#111",
            }}
          >
            Apply for Finance
          </h2>
          <p style={{ margin: "0 0 28px", color: "#888", fontSize: "13px" }}>
            Fill in your details below and we will contact you within minutes.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "18px",
              marginBottom: "18px",
            }}
          >
            {/* Full Name */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#999",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                Full Name *
              </label>
              <input
                id="fa-name"
                type="text"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1.5px solid #e8e8e8",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#111",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={function (e) {
                  e.currentTarget.style.borderColor = "#c9000a";
                }}
                onBlur={function (e) {
                  e.currentTarget.style.borderColor = "#e8e8e8";
                }}
              />
            </div>

            {/* Phone */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#999",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                Phone Number *
              </label>
              <input
                id="fa-phone"
                type="tel"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1.5px solid #e8e8e8",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#111",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={function (e) {
                  e.currentTarget.style.borderColor = "#c9000a";
                }}
                onBlur={function (e) {
                  e.currentTarget.style.borderColor = "#e8e8e8";
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#999",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                Email Address
              </label>
              <input
                id="fa-email"
                type="email"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1.5px solid #e8e8e8",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#111",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={function (e) {
                  e.currentTarget.style.borderColor = "#c9000a";
                }}
                onBlur={function (e) {
                  e.currentTarget.style.borderColor = "#e8e8e8";
                }}
              />
            </div>

            {/* ID Number */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#999",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                SA ID Number *
              </label>
              <input
                id="fa-id"
                type="text"
                maxLength={13}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1.5px solid #e8e8e8",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#111",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={function (e) {
                  e.currentTarget.style.borderColor = "#c9000a";
                }}
                onBlur={function (e) {
                  e.currentTarget.style.borderColor = "#e8e8e8";
                }}
              />
            </div>

            {/* Employment Status */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#999",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                Employment Status *
              </label>
              <select
                id="fa-employment"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1.5px solid #e8e8e8",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#111",
                  outline: "none",
                  boxSizing: "border-box",
                  background: "white",
                  cursor: "pointer",
                }}
                onFocus={function (e) {
                  e.currentTarget.style.borderColor = "#c9000a";
                }}
                onBlur={function (e) {
                  e.currentTarget.style.borderColor = "#e8e8e8";
                }}
              >
                <option value="">Select status...</option>
                <option value="Employed (Permanent)">
                  Employed — Permanent
                </option>
                <option value="Employed (Contract)">Employed — Contract</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Under Debt Review">Under Debt Review</option>
                <option value="Blacklisted">Blacklisted</option>
                <option value="Pensioner">Pensioner</option>
              </select>
            </div>

            {/* Monthly Income */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#999",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                Gross Monthly Income *
              </label>
              <select
                id="fa-income"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1.5px solid #e8e8e8",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#111",
                  outline: "none",
                  boxSizing: "border-box",
                  background: "white",
                  cursor: "pointer",
                }}
                onFocus={function (e) {
                  e.currentTarget.style.borderColor = "#c9000a";
                }}
                onBlur={function (e) {
                  e.currentTarget.style.borderColor = "#e8e8e8";
                }}
              >
                <option value="">Select range...</option>
                <option value="Below R5 000">Below R5 000</option>
                <option value="R5 000 – R10 000">R5 000 – R10 000</option>
                <option value="R10 000 – R15 000">R10 000 – R15 000</option>
                <option value="R15 000 – R25 000">R15 000 – R25 000</option>
                <option value="R25 000 – R40 000">R25 000 – R40 000</option>
                <option value="R40 000 – R60 000">R40 000 – R60 000</option>
                <option value="Above R60 000">Above R60 000</option>
              </select>
            </div>

            {/* Vehicle of Interest */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#999",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                Vehicle of Interest
              </label>
              <input
                id="fa-vehicle"
                type="text"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1.5px solid #e8e8e8",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#111",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={function (e) {
                  e.currentTarget.style.borderColor = "#c9000a";
                }}
                onBlur={function (e) {
                  e.currentTarget.style.borderColor = "#e8e8e8";
                }}
              />
            </div>

            {/* Deposit Available */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  color: "#999",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  fontWeight: 600,
                }}
              >
                Deposit Available
              </label>
              <select
                id="fa-deposit"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  border: "1.5px solid #e8e8e8",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#111",
                  outline: "none",
                  boxSizing: "border-box",
                  background: "white",
                  cursor: "pointer",
                }}
                onFocus={function (e) {
                  e.currentTarget.style.borderColor = "#c9000a";
                }}
                onBlur={function (e) {
                  e.currentTarget.style.borderColor = "#e8e8e8";
                }}
              >
                <option value="No deposit">No deposit</option>
                <option value="Below R5 000">Below R5 000</option>
                <option value="R5 000 – R10 000">R5 000 – R10 000</option>
                <option value="R10 000 – R20 000">R10 000 – R20 000</option>
                <option value="R20 000 – R50 000">R20 000 – R50 000</option>
                <option value="Above R50 000">Above R50 000</option>
              </select>
            </div>
          </div>

          {/* DISCLAIMER */}
          <p
            style={{
              fontSize: "11px",
              color: "#bbb",
              lineHeight: "1.6",
              margin: "0 0 20px",
            }}
          >
            * Required fields. Your information is used solely to process your
            finance application and will not be shared with third parties.
          </p>

          {/* SUBMIT */}
          <button
            onClick={function () {
              var name = document.getElementById("fa-name").value.trim();
              var phone = document.getElementById("fa-phone").value.trim();
              var email = document.getElementById("fa-email").value.trim();
              var id = document.getElementById("fa-id").value.trim();
              var employment = document.getElementById("fa-employment").value;
              var income = document.getElementById("fa-income").value;
              var vehicle = document.getElementById("fa-vehicle").value.trim();
              var deposit = document.getElementById("fa-deposit").value;

              if (!name || !phone || !id || !employment || !income) {
                alert(
                  "Please fill in all required fields (Name, Phone, ID Number, Employment Status, Monthly Income)."
                );
                return;
              }

              var msg =
                "Hi Car Deal Warehouse, I would like to APPLY FOR FINANCE.\n\n" +
                "Full Name: " +
                name +
                "\n" +
                "Phone: " +
                phone +
                "\n" +
                (email ? "Email: " + email + "\n" : "") +
                "SA ID Number: " +
                id +
                "\n" +
                "Employment Status: " +
                employment +
                "\n" +
                "Gross Monthly Income: " +
                income +
                "\n" +
                (vehicle ? "Vehicle of Interest: " + vehicle + "\n" : "") +
                "Deposit Available: " +
                deposit +
                "\n\n" +
                "Please contact me to proceed with my application.";

              window.open(
                "https://wa.me/27789125551?text=" + encodeURIComponent(msg),
                "_blank"
              );
            }}
            onMouseEnter={function (e) {
              e.currentTarget.style.background = "#a50008";
            }}
            onMouseLeave={function (e) {
              e.currentTarget.style.background = "#c9000a";
            }}
            style={{
              background: "#c9000a",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: isMobile ? "12px 22px" : "16px 40px",
              fontSize: isMobile ? "12px" : "13px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              cursor: "pointer",
              width: "100%",
              transition: "background 0.2s ease",
            }}
          >
            Submit Application via WhatsApp
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#bbb",
              marginTop: "14px",
              marginBottom: 0,
            }}
          >
            Clicking submit opens WhatsApp with your details pre-filled. We
            respond within minutes.
          </p>
        </div>

        {/* BANK PARTNERS */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: isMobile ? "20px 18px" : "28px 36px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#999",
              letterSpacing: "2px",
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            Finance Partners
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: isMobile ? "20px" : "40px",
              flexWrap: "wrap",
            }}
          >
            {banks.map(function (bank) {
              var isSmall =
                bank.name === "Nedbank" || bank.name === "Standard Bank";
              return (
                <div
                  key={bank.name}
                  style={{
                    width: "110px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "visible",
                  }}
                >
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      transform: isSmall ? "scale(1.5)" : "none",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
