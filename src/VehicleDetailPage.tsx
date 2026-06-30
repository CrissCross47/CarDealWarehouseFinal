/**
 * VehicleDetailPage.tsx
 * ─────────────────────
 * Drop-in standalone vehicle details page for Car Deal Warehouse.
 *
 * USAGE IN App.tsx:
 *   1. Copy this file into your /src folder.
 *   2. Add the import at the top of App.tsx:
 *        import VehicleDetailPage from "./VehicleDetailPage";
 *   3. Replace your current `if (selectedCar) { return (...) }` block with:
 *        if (selectedCar) {
 *          return (
 *            <VehicleDetailPage
 *              car={selectedCar}
 *              onBack={() => setSelectedCar(null)}
 *              onNavigate={navigate}
 *              onContactNav={() => { setScrollTarget("contact"); setSelectedCar(null); }}
 *            />
 *          );
 *        }
 *
 * REQUIREMENTS:
 *   - react, react-router-dom already installed (you have these)
 *   - logo image imported in this file (update the path if needed)
 *   - No new npm packages required
 */

import React, { useState, useEffect, CSSProperties } from "react";
import logo from "./images/logo.jpg";

// ─── Types ───────────────────────────────────────────────────────────────────
type Car = {
  id: number;
  name: string;
  price: string;
  year: string;
  mileage: string;
  fuel: string;
  transmission: string;
  description?: string;
  performance?: string;
  finance?: string;
  folder: string;
  images?: string[];
};

type Props = {
  car: Car;
  onBack: () => void;
  onNavigate: (path: string) => void;
  onContactNav: () => void;
};

// ─── Constants ───────────────────────────────────────────────────────────────
const ACCENT = "#c9000a";
const WHATSAPP_NUMBER = "27789125551";

// ─── Component ───────────────────────────────────────────────────────────────
export default function VehicleDetailPage({
  car,
  onBack,
  onNavigate,
  onContactNav,
}: Props) {
  const images: string[] = car.images || [];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");

  const prevImage = () =>
    setSelectedImage((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () =>
    setSelectedImage((i) => (i === images.length - 1 ? 0 : i + 1));

  const waMessage = encodeURIComponent(
    `Hello, I'm interested in the ${car.name}.\n\nName: ${customerName}\nPhone: ${customerPhone}\nEmail: ${customerEmail}`
  );

  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        background: "#f5f5f5",
        minHeight: "100vh",
        color: "#111",
      }}
    >
      {/* ── STICKY HEADER ─────────────────────────────────────────────── */}
      <header
        style={{
          background: "#111",
          position: "sticky",
          top: 0,
          zIndex: 9999,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "0 18px" : "0 48px",
          height: isMobile ? "68px" : "90px",
          boxShadow: "0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* LOGO */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={logo}
            alt="CDW"
            style={{
              width: isMobile ? "44px" : "62px",
              height: isMobile ? "44px" : "62px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #c9000a",
            }}
          />
          <div>
            <div
              style={{
                color: "white",
                fontWeight: 800,
                fontSize: isMobile ? "13px" : "25px",
                letterSpacing: isMobile ? "1px" : "2px",
                textTransform: "uppercase",
              }}
            >
              Car Deal Warehouse
            </div>
            {!isMobile && (
              <div
                style={{
                  color: "#c9000a",
                  fontSize: "10px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginTop: "1px",
                }}
              >
                Drive Away Today
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP NAV */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
            {[
              { label: "Home", action: onBack },
              { label: "Buy Cars", action: () => onNavigate("/vehicles") },
              { label: "Finance", action: () => onNavigate("/finance") },
              { label: "Contact", action: onContactNav },
            ].map((link) => (
              <span
                key={link.label}
                onClick={link.action}
                style={{
                  color: "#aaa",
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#aaa";
                }}
              >
                {link.label}
              </span>
            ))}
            <button
              onClick={() => onNavigate("/finance")}
              style={{
                background: "#c9000a",
                color: "white",
                border: "none",
                borderRadius: "3px",
                padding: "10px 24px",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Apply Now
            </button>
          </div>
        )}

        {/* MOBILE HAMBURGER */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "2px",
                background: "white",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                transform: menuOpen
                  ? "rotate(45deg) translate(5px, 5px)"
                  : "none",
              }}
            />
            <div
              style={{
                width: "24px",
                height: "2px",
                background: "white",
                borderRadius: "2px",
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            />
            <div
              style={{
                width: "24px",
                height: "2px",
                background: "white",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                transform: menuOpen
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : "none",
              }}
            />
          </button>
        )}
      </header>

      {/* MOBILE DROPDOWN MENU */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: "68px",
            left: 0,
            right: 0,
            background: "#111",
            zIndex: 9998,
            borderTop: menuOpen ? "1px solid #222" : "none",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            maxHeight: menuOpen ? "400px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.35s ease",
          }}
        >
          {[
            { label: "Home", action: onBack },
            {
              label: "Buy Cars",
              action: () => {
                setMenuOpen(false);
                onNavigate("/vehicles");
              },
            },
            {
              label: "Finance",
              action: () => {
                setMenuOpen(false);
                onNavigate("/finance");
              },
            },
            {
              label: "Contact",
              action: () => {
                setMenuOpen(false);
                onContactNav();
              },
            },
          ].map((link) => (
            <div
              key={link.label}
              onClick={link.action}
              style={{
                padding: "18px 28px",
                color: "#ccc",
                fontSize: "13px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                cursor: "pointer",
                borderBottom: "1px solid #1c1c1c",
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1a1a1a";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#ccc";
              }}
            >
              {link.label}
            </div>
          ))}
          <div style={{ padding: "18px 28px" }}>
            <button
              onClick={() => {
                setMenuOpen(false);
                onNavigate("/finance");
              }}
              style={{
                width: "100%",
                background: "#c9000a",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "15px",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Apply For Finance
            </button>
          </div>
        </div>
      )}
      {/* ── HERO IMAGE ────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          background: "#0a0a0a",
          height: isMobile ? 260 : 480,
        }}
      >
        {/* Main photo */}
        <img
          src={images[selectedImage]}
          alt={car.name}
          onClick={() => setLightboxOpen(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            background: "#0a0a0a",
            cursor: "zoom-in",
          }}
        />

        {/* Directional fade overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Bottom fade + car name */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
            padding: isMobile ? "2px 6px 1px" : "40px 32px 12px",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: isMobile ? 6 : 10,
              marginBottom: isMobile ? 6 : 10,
            }}
          >
            <span
              style={{
                background: ACCENT,
                color: "white",
                fontSize: isMobile ? 6 : 9,
                fontWeight: 600,
                letterSpacing: isMobile ? "1px" : "2px",
                textTransform: "uppercase",
                padding: isMobile ? "3px 8px" : "4px 10px",
                borderRadius: 2,
              }}
            >
              Available Now
            </span>
            <span
              style={{
                border: "1px solid rgba(255,255,255,0.3)",
                color: "rgba(255,255,255,0.7)",
                fontSize: isMobile ? 6 : 9,
                fontWeight: 600,
                letterSpacing: isMobile ? "1px" : "1.5px",
                textTransform: "uppercase",
                padding: isMobile ? "3px 8px" : "4px 10px",
                borderRadius: 2,
              }}
            >
              Certified Pre-Owned
            </span>
          </div>
          <h1
            style={{
              color: "white",
              margin: 0,
              fontSize: isMobile ? 14 : 30,
              fontWeight: 700,
              letterSpacing: "-0.5px",
              lineHeight: 1,
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            {car.year} {car.name}
          </h1>
        </div>

        {/* Prev / Next arrows */}
        <button onClick={prevImage} style={arrowStyle("left")}>
          &#8249;
        </button>
        <button onClick={nextImage} style={arrowStyle("right")}>
          &#8250;
        </button>

        {/* Photo counter */}
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            color: "white",
            padding: isMobile ? "3px 8px" : "6px 14px",
            borderRadius: 3,
            fontSize: isMobile ? 7 : 12,
            fontWeight: 600,
            letterSpacing: "1px",
          }}
        >
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* ── THUMBNAIL STRIP ───────────────────────────────────────────── */}
      <div
        style={{
          background: "#111",
          padding: isMobile ? "10px 14px" : "12px 52px",
          display: "flex",
          gap: isMobile ? 6 : 8,
          overflowX: "auto",
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setSelectedImage(i)}
            style={{
              width: isMobile ? 70 : 100,
              height: isMobile ? 46 : 64,
              borderRadius: 3,
              overflow: "hidden",
              cursor: "pointer",
              flexShrink: 0,
              outline:
                selectedImage === i
                  ? `2px solid ${ACCENT}`
                  : "2px solid transparent",
              outlineOffset: 1,
            }}
          >
            <img
              src={img}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: selectedImage === i ? 1 : 0.45,
                transition: "opacity 0.2s",
              }}
            />
          </div>
        ))}
      </div>

      {/* ── MAIN BODY ─────────────────────────────────────────────────── */}
      {isMobile && (
        <div style={{ padding: "12px 16px", background: "#f5f5f5" }}>
          <button
            onClick={onBack}
            style={{
              background: "transparent",
              border: "1.5px solid #ddd",
              borderRadius: 4,
              padding: "8px 16px",
              fontSize: 11,
              fontWeight: 700,
              color: "#555",
              cursor: "pointer",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            ← Back to Listings
          </button>
        </div>
      )}
      <div
        style={{
          maxWidth: 1380,
          margin: "0 auto",
          padding: isMobile ? "12px 16px" : "36px 52px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 380px",
          gap: isMobile ? 20 : 32,
          alignItems: "start",
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <div>
          {/* SPEC BAR */}
          <div
            style={{
              background: "white",
              borderRadius: 6,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(2, 1fr)"
                : "repeat(4, 1fr)",
              overflow: "hidden",
              marginBottom: 32,
              border: "1px solid #e8e8e8",
            }}
          >
            {[
              { label: "Year", value: car.year },
              { label: "Mileage", value: car.mileage },
              { label: "Fuel Type", value: car.fuel },
              { label: "Gearbox", value: car.transmission },
            ].map((s, i, arr) => (
              <div
                key={s.label}
                style={{
                  padding: isMobile ? "5px 5px" : "20px",
                  borderRight:
                    i < arr.length - 1 ? "1px solid #efefef" : "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? 8 : 9,
                    color: "#999",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginBottom: 3,
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: isMobile ? 11 : 14,

                    fontWeight: 600,
                    color: "#111",
                  }}
                >
                  {s.value || "—"}
                </div>
              </div>
            ))}
          </div>
          {/* TRUST BADGES */}
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 28,
            }}
          >
            {[
              { icon: "◎", label: "Roadworthy Certified" },
              { icon: "◈", label: "Finance Available" },
              { icon: "◇", label: "Nationwide Delivery" },
            ].map(function (b) {
              return (
                <div
                  key={b.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "transparent",
                    border: "1.5px solid #e0e0e0",
                    borderRadius: 4,
                    padding: isMobile ? "10px 10px" : "12px",
                    fontSize: isMobile ? 9 : 12,
                    color: "#333",
                    fontWeight: 600,
                    letterSpacing: "0.3px",
                  }}
                >
                  <span style={{ color: "#c9000a", fontSize: 15 }}>
                    {b.icon}
                  </span>
                  {b.label}
                </div>
              );
            })}
          </div>

          {/* PERFORMANCE */}
          {/* PERFORMANCE */}
          {car.performance && (
            <div style={{ marginBottom: 32 }}>
              <SectionTitle>Performance</SectionTitle>
              <div
                style={{
                  background: "white",
                  border: "1px solid #ebebeb",
                  borderRadius: 6,
                  padding: isMobile ? "10px 12px" : "22px 26px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                {car.performance
                  .split("\n")
                  .map((line: string, index: number) => {
                    const colonIdx = line.indexOf(":");
                    if (colonIdx === -1)
                      return (
                        <p
                          key={index}
                          style={{
                            margin: 0,
                            marginBottom: 8,
                            fontSize:isMobile ? 12 : 16,
                            color: "#555",
                          }}
                        >
                          {line}
                        </p>
                      );
                    const heading = line.substring(0, colonIdx);
                    const value = line.substring(colonIdx + 1);
                    return (
                      <p
                        key={index}
                        style={{
                          margin: 0,
                          marginBottom: 10,
                          fontSize: isMobile ? 11 : 15,
                          color: "#555",
                        }}
                      >
                        <strong style={{ color: "#111" }}>{heading}:</strong>
                        {value}
                      </p>
                    );
                  })}
              </div>
            </div>
          )}

          {/* DESCRIPTION */}
          {car.description && (
            <div style={{ marginBottom: isMobile ? 10 : 32 }}>
              <SectionTitle>About This Vehicle</SectionTitle>
              <div
                style={{
                  background: "white",
                  border: "1px solid #ebebeb",
                  borderRadius: 6,
                  padding: isMobile ? "14px 16px" : "24px 26px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    lineHeight: 1.9,
                    color: "#555",
                    fontSize: isMobile ? 12 : 16,
                  }}
                >
                  {car.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            position: isMobile ? "static" : "sticky",
            top: 88,
          }}
        >
          {/* PRICE CARD */}
          <div
            style={{
              background: "#111",
              borderRadius: 6,
              padding: isMobile ? "14px 14px 14px" : "28px 28px 24px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            }}
          >
            <div
              style={{
                fontSize: isMobile ? 8 : 10,
                color: "#666",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: isMobile ? 2 : 6,
              }}
            >
              Price*
            </div>
            <div
              style={{
                fontSize: isMobile ? 30 : 34,
                fontWeight: 900,
                color: ACCENT,
                lineHeight: 1,
                marginBottom: isMobile ? 4 : 6,
              }}
            >
              {car.price}
            </div>
            <div
              style={{
                fontSize: isMobile ? 9 : 11,
                color: "#555",
                letterSpacing: "0.5px",
              }}
            >
              VAT Included &nbsp;·&nbsp;
            </div>
          </div>

          {/* FINANCE CARD */}
          {car.finance && (
            <div
              style={{
                background: "white",
                border: "1px solid #e5e5e5",
                padding: isMobile ? "10px 10px 10px" : "20px 20px 20px",
                borderRadius: 6,

                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: ACCENT,
                  padding: "12px 22px",
                  display: "flex",

                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: isMobile ? 8 : 9,
                    fontWeight: 700,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                  }}
                >
                  Estimated Finance
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: isMobile ? 8 : 9,
                  }}
                >
                  72 months
                </div>
              </div>
              <div
                style={{
                  padding: isMobile ? "8px 8px 8px" : "16px 20px 18px",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? 18 : 24,
                    fontWeight: 900,
                    color: "#111",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {car.finance}
                  <span
                    style={{
                      fontSize: isMobile ? 10 : 14,
                      color: "#999",
                      fontWeight: 400,
                    }}
                  >
                    {" "}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: isMobile ? 8 : 11,
                    color: "#aaa",
                    marginBottom: 15,
                  }}
                >
                  Based on 11.75% interest rate
                </div>
                <button
                  onClick={() => onNavigate("/finance")}
                  style={{
                    width: "100%",
                    background: "#111",
                    color: "white",
                    border: "none",
                    padding: isMobile ? "8px" : "14px",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: isMobile ? 10 : 12,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Apply For Finance
                </button>
              </div>
            </div>
          )}

          {/* ENQUIRY FORM */}
          <div
            style={{
              background: "white",
              border: "1px solid #e5e5e5",
              borderRadius: 6,
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            {/* HEADER BAR */}
            <div
              style={{
                background: "#111",
                padding: isMobile ? "10px 14px" : "16px 22px",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? 8 : 10,
                  color: "#c9000a",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: 2,
                }}
              >
                Enquire About This Vehicle
              </div>
              <div
                style={{
                  fontSize: isMobile ? 11 : 14,
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.8,
                }}
              >
                {car.year} {car.name}
              </div>
            </div>

            {/* FORM BODY */}
            <div
              style={{
                padding: isMobile ? "10px 10px 10px" : "20px 22px 22px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: isMobile ? 10 : 14,
                      color: "#aaa",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      marginBottom: 6,
                      fontWeight: 600,
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: "1.5px solid #e8e8e8",
                      borderRadius: 4,
                      fontSize: isMobile ? 10 : 14,
                      color: "#111",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#c9000a";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#e8e8e8";
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: isMobile ? 10 : 14,
                      color: "#aaa",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      marginBottom: 6,
                      fontWeight: 600,
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 082 000 0000"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      border: "1.5px solid #e8e8e8",
                      borderRadius: 4,

                      fontSize: isMobile ? 10 : 14,
                      color: "#111",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#c9000a";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#e8e8e8";
                    }}
                  />
                </div>
              </div>

              {/* WHATSAPP — PRIMARY CTA */}
              <a
                href={"https://wa.me/" + WHATSAPP_NUMBER + "?text=" + waMessage}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  textDecoration: "none",
                  background: "#25d366",
                  color: "white",
                  padding: "12px 12px",
                  borderRadius: 4,
                  fontWeight: 800,
                  fontSize: isMobile ? 9 : 13,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  boxShadow: "0 4px 14px rgba(37,211,102,0.35)",
                }}
              >
                <span style={{ fontSize: isMobile ? 12 : 18 }}>✉</span>
                Enquire via WhatsApp
              </a>

              {/* CALL — SECONDARY CTA */}
              <a
                href="tel:+27789125551"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  textDecoration: "none",
                  background: "transparent",
                  color: "#333",
                  border: "1.5px solid #e0e0e0",
                  padding: "12px 14px",
                  borderRadius: 4,
                  fontWeight: 700,
                  fontSize: isMobile ? 9 : 12,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                ✆ Call the Dealer
              </a>

              {/* BACK LINK */}
              <button
                onClick={onBack}
                style={{
                  width: "100%",
                  background: "transparent",
                  color: "#bbb",
                  border: "none",
                  padding: "8px",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: 11,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                ← Back to Listings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 10 }} />

      {lightboxOpen && (
                <div
                onClick={() => setLightboxOpen(false)}
                onTouchStart={(e) => {
                  e.currentTarget.dataset.touchStartX = String(e.touches[0].clientX);
                }}
                onTouchEnd={(e) => {
                  const startX = Number(e.currentTarget.dataset.touchStartX);
                  const endX = e.changedTouches[0].clientX;
                  if (startX - endX > 50) {
                    setSelectedImage((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1
                    );
                  }
                  if (endX - startX > 50) {
                    setSelectedImage((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1
                    );
                  }
                }}
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 99999,
                  background: "rgba(0,0,0,0.96)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
          {/* Image */}
          <img
            src={images[selectedImage]}
            alt={car.name}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "100vw",
              maxHeight: "100vh",
              objectFit: "contain",
              display: "block",
            }}
          />

          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            style={{
              position: "fixed",
              top: isMobile ? 12 : 16,
              right: isMobile ? 12 : 16,
              background: "rgba(255,255,255,0.15)",
              border: "none",
              borderRadius: "50%",
              width: isMobile ? 38 : 44,
              height: isMobile ? 38 : 44,
              color: "white",
              fontSize: isMobile ? 18 : 22,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100000,
            }}
          >
            ✕
          </button>

          {/* Left arrow */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                );
              }}
              style={{
                position: "fixed",
                left: isMobile ? 8 : 20,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: isMobile ? 40 : 52,
                height: isMobile ? 40 : 52,
                color: "white",
                fontSize: isMobile ? 22 : 30,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 100000,
              }}
            >
              ‹
            </button>
          )}

          {/* Right arrow */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                );
              }}
              style={{
                position: "fixed",
                right: isMobile ? 8 : 20,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: isMobile ? 40 : 52,
                height: isMobile ? 40 : 52,
                color: "white",
                fontSize: isMobile ? 22 : 30,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 100000,
              }}
            >
              ›
            </button>
          )}

          {/* Counter */}
          <div
            style={{
              position: "fixed",
              bottom: isMobile ? 16 : 24,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.6)",
              color: "white",
              padding: isMobile ? "4px 12px" : "6px 16px",
              borderRadius: 20,
              fontSize: isMobile ? 11 : 13,
              fontWeight: 600,
              letterSpacing: "1px",
              zIndex: 100000,
            }}
          >
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
/>
    </div>
  );
}

// ─── Helper components ────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: 16,
      }}
    >
      <div
        style={{ width: 3, height: 18, background: "#c9000a", borderRadius: 2 }}
      />
      <h2
        style={{
          margin: 0,
          fontSize: 12,
          fontWeight: 800,
          color: "#111",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        {children}
      </h2>
    </div>
  );
}

function arrowStyle(side: "left" | "right"): CSSProperties {
  const mobile = window.innerWidth < 768;
  return {
    position: "absolute",
    [side]: mobile ? 8 : 20,
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(6px)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 4,
    width: mobile ? 34 : 48,
    height: mobile ? 34 : 48,
    fontSize: mobile ? 20 : 28,
    fontWeight: 300,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1",
  };
}
