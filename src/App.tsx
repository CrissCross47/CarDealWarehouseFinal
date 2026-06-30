import { supabase } from "./supabase";
// @ts-ignore: no declaration file for FinancePage.jsx
import FinancePage from "./FinancePage";
import VehicleDetailPage from "./VehicleDetailPage";
import logo from "./images/logo.jpg";
import audi from "./images/brands/audi.svg";
import ford from "./images/brands/ford.svg";
import bmw from "./images/brands/bmw.svg";
import hyundai from "./images/brands/hyundai.svg";
import mercedes from "./images/brands/mercedes.svg";
import nissan from "./images/brands/nissan.svg";
import toyota from "./images/brands/toyota.svg";
import volkswagen from "./images/brands/volkswagen.svg";
import cdw from "./images/CDW.jpg";
import motors from "./images/Motors.jpg";
import moto from "./images/moto.jpg";
import f30f from "./images/f30 F.jfif";
import f30int from "./images/F30 INT.jfif";
import f30int2 from "./images/F30 INT 2.jfif";
import f30s from "./images/f30 s.jfif";
import f30ss from "./images/f30 ss.jfif";
import f30 from "./images/f30.jfif";
import i20M from "./images/2019 Hyundai i20 M.jfif";
import i20F from "./images/2019 Hyundai i20 F.jfif";
import i20R from "./images/2019 Hyundai i20 R.jfif";
import i20S from "./images/i20 S.jfif";
import i20S1 from "./images/i20 S1.jfif";
import i20i from "./images/i20 i.jpg";
import i20i2 from "./images/i20 i2.jpg";
import i20e from "./images/i20 e.jpg";
import i20b from "./images/i20 b.jpg";
import { useState, useEffect, useRef, CSSProperties } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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

const normalizeImages = (images: string | string[] | undefined): string[] => {
  if (!images) return [];
  if (Array.isArray(images)) return images;
  return images.split(",");
};

function Layout({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const sections = ["home", "buycars", "finance", "contact"];
    const handleScroll = () => {
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const goToSection = (sectionId: string) => {
    setMenuOpen(false);
    if (window.location.pathname !== "/") {
      navigate("/#" + sectionId);
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", action: () => goToSection("home") },
    {
      label: "Buy Cars",
      action: () => {
        setMenuOpen(false);
        navigate("/vehicles");
      },
    },
    {
      label: "Finance",
      action: () => {
        setMenuOpen(false);
        navigate("/finance");
      },
    },
    { label: "Contact", action: () => goToSection("contact") },
  ];

  return (
    <div style={{ fontFamily: "Arial" }}>
      {/* ── HEADER ── */}
      <header
        style={{
          background: "#111",
          position: "sticky",
          top: 0,
          zIndex: 9999,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "0 17px" : "0 48px",
          height: isMobile ? "68px" : "90px",
          boxShadow: "none",
        }}
      >
        {/* LOGO */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={logo}
            alt="CDW"
            style={{
              width: isMobile ? "52px" : "62px",
              height: isMobile ? "52px" : "62px",
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
                fontSize: isMobile ? "15px" : "25px",
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
            {navLinks.map((link) => (
              <span
                key={link.label}
                onClick={link.action}
                style={{
                  color: "#aaa",
                  fontSize: "12px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  cursor: "pointer",
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
              onClick={() => navigate("/finance")}
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

        {/* HAMBURGER BUTTON */}
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
                transition: "all 0.3s ease",
                opacity: menuOpen ? 0 : 1,
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
            boxShadow: menuOpen ? "0 8px 24px rgba(0,0,0,0.5)" : "none",
            maxHeight: menuOpen ? "400px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.35s ease",
          }}
        >
          {navLinks.map((link) => (
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
                navigate("/finance");
              }}
              style={{
                width: "100%",
                background: "#c9000a",
                color: "white",
                border: "none",
                borderRadius: "5px",
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

      {/* PAGE CONTENT */}
      <div style={{ backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
        {children}
      </div>
    </div>
  );
}
function AllVehiclesPage({
  cars,
  brands,
  setSelectedCar,
  setSelectedImage,
  loading,
}: {
  cars: Car[];
  brands: { name: string; logo: string }[];
  setSelectedCar: (car: Car | null) => void;
  setSelectedImage: (index: number) => void;
  loading: boolean;
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const [search, setSearch] = useState(
    () => localStorage.getItem("vehicleSearch") ?? ""
  );
  useEffect(() => {
    localStorage.setItem("vehicleSearch", search);
  }, [search]);

  const [selectedMake, setSelectedMake] = useState(
    () => localStorage.getItem("vehicleMake") || ""
  );
  useEffect(() => {
    localStorage.setItem("vehicleMake", selectedMake);
  }, [selectedMake]);

  const [selectedYear, setSelectedYear] = useState(
    () => localStorage.getItem("vehicleYear") || ""
  );
  const [selectedPrice, setSelectedPrice] = useState(
    () => localStorage.getItem("vehiclePrice") || ""
  );
  const [sortBy, setSortBy] = useState(
    () => localStorage.getItem("vehicleSort") || ""
  );
  useEffect(() => {
    localStorage.setItem("vehicleYear", selectedYear);
  }, [selectedYear]);
  useEffect(() => {
    localStorage.setItem("vehiclePrice", selectedPrice);
  }, [selectedPrice]);
  useEffect(() => {
    localStorage.setItem("vehicleSort", sortBy);
  }, [sortBy]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const availableYears = Array.from(
    new Set(cars.map((c) => c.year).filter(Boolean))
  ).sort((a, b) => Number(b) - Number(a));

  const filteredCars = cars
    .filter((car) => {
      const matchesSearch = car.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesMake =
        selectedMake === "" ||
        car.name.toLowerCase().includes(selectedMake.toLowerCase());
      const matchesYear = selectedYear === "" || car.year === selectedYear;
      const priceNumber = Number(car.price.replace(/[^\d]/g, ""));
      const matchesPrice =
        selectedPrice === "" || priceNumber <= Number(selectedPrice);
      return matchesSearch && matchesMake && matchesYear && matchesPrice;
    })
    .sort((a, b) => {
      const priceA = Number(a.price.replace(/[^\d]/g, ""));
      const priceB = Number(b.price.replace(/[^\d]/g, ""));
      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      return 0;
    });

  const clearAll = () => {
    setSearch("");
    setSelectedMake("");
    setSelectedYear("");
    setSelectedPrice("");
    setSortBy("");
    localStorage.removeItem("vehicleSearch");
    localStorage.removeItem("vehicleMake");
    localStorage.removeItem("vehicleYear");
    localStorage.removeItem("vehiclePrice");
    localStorage.removeItem("vehicleSort");
  };
  const sidebarInputStyle: CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    border: "1.5px solid #e8e8e8",
    borderRadius: "4px",
    fontSize: "13px",
    color: "#222",
    background: "white",
    outline: "none",
    cursor: "pointer",
    boxSizing: "border-box",
  };

  const labelStyle: CSSProperties = {
    fontSize: "10px",
    color: "#999",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "8px",
  };

  return (
    <div
      style={{
        background: "#f4f4f4",
        minHeight: "100vh",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* PAGE TITLE */}
      <div
        style={{
          background: "#111",
          padding: isMobile ? "16px 20px" : "20px 52px",
          borderBottom: "3px solid #c9000a",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            color: "#c9000a",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "10px",
            fontWeight: 700,
          }}
        >
          Home › Buy Cars
        </div>
        <h1
          style={{
            margin: 0,
            color: "white",
            fontSize: "26px",
            fontWeight: 900,
            letterSpacing: "1px",
            marginBottom: "12px",
          }}
        >
          Available Vehicles
        </h1>
        <p style={{ margin: "6px 0 0", color: "#666", fontSize: "12px" }}>
          Browse our hand-picked pre-owned stock — verified and ready to drive
          away.
        </p>
      </div>

      {/* BRANDS STRIP */}
      <div
        style={{
          background: "white",
          padding: "18px 0",
          overflow: "hidden",
        }}
      >
        <style>{`
          @keyframes scrollBrandsAVP {
            from { transform: translateX(0); }
            to { transform: translateX(-30%); }
          }
        `}</style>
        <div
          style={{
            display: "flex",
            gap: "50px",
            alignItems: "center",
            width: "max-content",
            animation: "scrollBrandsAVP 20s linear infinite",
          }}
        >
          {[...brands, ...brands].map((brand, index) => (
            <img
              key={index}
              src={brand.logo}
              alt={brand.name}
              style={{
                width: "80px",
                height: "44px",
                objectFit: "contain",
              }}
            />
          ))}
        </div>
      </div>

      {/* BODY */}
      <div
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: isMobile ? "16px 14px" : "24px 40px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "210px 1fr",
          gap: "16px",
          alignItems: "start",
        }}
      >
        {/* SIDEBAR */}
        {isMobile && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              width: "100%",
              background: "#111",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: isMobile ? "8px" : "13px",
              fontSize: isMobile ? 9 : 12,
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              cursor: "pointer",
              marginBottom: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {showFilters ? "✕ Hide Filters" : "⚙ Filter & Sort"}
          </button>
        )}
        <div
          style={{
            background: "white",
            border: "1px solid #e8e8e8",
            borderRadius: "6px",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            position: isMobile ? "static" : "sticky",
            top: "88px",
            display: isMobile && !showFilters ? "none" : "block",
          }}
        >
          <div
            style={{
              background: "#111",
              padding: isMobile ? "6px 9px" : "13px 18px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: isMobile ? 9 : 11,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Filter Stock
            </span>
            <span
              onClick={clearAll}
              style={{
                color: "#c9000a",
                fontSize: "11px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Clear All
            </span>
          </div>
          <div style={{ padding: "18px" }}>
            <div style={{ marginBottom: "18px" }}>
              <label style={labelStyle}>Search</label>
              <input
                type="text"
                placeholder="Make or model..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={sidebarInputStyle}
              />
            </div>
            <div style={{ marginBottom: "18px" }}>
              <label style={labelStyle}>Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={sidebarInputStyle}
              >
                <option value="">All Years</option>
                {availableYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: "18px" }}>
              <label style={labelStyle}>Make</label>
              <select
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                style={sidebarInputStyle}
              >
                <option value="">All Makes</option>
                <option value="Toyota">Toyota</option>
                <option value="Ford">Ford</option>
                <option value="BMW">BMW</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Audi">Audi</option>
                <option value="Nissan">Nissan</option>
                <option value="Hyundai">Hyundai</option>
              </select>
            </div>
            <div style={{ marginBottom: "4px" }}>
              <label style={labelStyle}>Max Price</label>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                style={sidebarInputStyle}
              >
                <option value="">Any Price</option>
                <option value="100000">Under R 100 000</option>
                <option value="200000">Under R 200 000</option>
                <option value="300000">Under R 300 000</option>
                <option value="500000">Under R 500 000</option>
                <option value="1000000">Under R 1 000 000</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          {/* RESULTS BAR */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              gap: isMobile ? "10px" : "0",
              marginBottom: "20px",
              background: "white",
              border: "1px solid #e8e8e8",
              borderRadius: "6px",
              padding: isMobile ? "12px 14px" : "13px 18px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <span style={{ fontSize: "13px", color: "#555" }}>
              Showing{" "}
              <strong style={{ color: "#111" }}>{filteredCars.length}</strong>{" "}
              vehicle{filteredCars.length !== 1 ? "s" : ""}
              {selectedMake ? ` · ${selectedMake}` : ""}
              {selectedYear ? ` · ${selectedYear}` : ""}
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: isMobile ? "100%" : "auto",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  color: "#999",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  flex: isMobile ? 1 : "unset",
                  border: "1.5px solid #e8e8e8",
                  borderRadius: "4px",
                  padding: "7px 12px",
                  fontSize: "12px",
                  color: "#222",
                  background: "white",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="">Default</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
              </select>
            </div>
          </div>

          {/* GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: isMobile ? "14px" : "18px",
            }}
          >
            {loading && (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  background: "white",
                  borderRadius: "6px",
                  border: "1px solid #e8e8e8",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    border: "3px solid #e8e8e8",
                    borderTop: "3px solid #c9000a",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                    margin: "0 auto 16px",
                  }}
                />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <p style={{ color: "#999", fontSize: "13px", margin: 0 }}>
                  Loading vehicles...
                </p>
              </div>
            )}
            {!loading &&
              filteredCars.map((car, index) => (
                <div
                  key={car.id}
                  onMouseEnter={() => setHoveredCard(car.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => {
                    setSelectedCar(car);
                    setSelectedImage(0);
                    window.scrollTo(0, 0);
                  }}
                  style={{
                    background: "white",
                    borderRadius: "6px",
                    overflow: "hidden",
                    border: "1px solid #e8e8e8",
                    boxShadow:
                      hoveredCard === car.id
                        ? "0 8px 32px rgba(0,0,0,0.13)"
                        : "0 2px 8px rgba(0,0,0,0.06)",
                    transform:
                      hoveredCard === car.id ? "translateY(-3px)" : "none",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      height: "210px",
                      overflow: "hidden",
                      background: "#000",
                    }}
                  >
                    <img
                      src={normalizeImages(car.images)[0]}
                      alt={car.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.4s ease",
                        transform:
                          hoveredCard === car.id ? "scale(1.04)" : "scale(1)",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        background: "#c9000a",
                        color: "white",
                        fontSize: "9px",
                        fontWeight: 800,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        padding: "4px 9px",
                        borderRadius: "2px",
                      }}
                    >
                      Available
                    </span>
                    {car.year && (
                      <span
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          background: "rgba(0,0,0,0.6)",
                          color: "white",
                          fontSize: "9px",
                          fontWeight: 600,
                          padding: "4px 8px",
                          borderRadius: "2px",
                        }}
                      >
                        {car.year}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      padding: "15px 16px 16px",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 8px",
                        fontSize: "15px",
                        fontWeight: 800,
                        color: "#111",
                        lineHeight: 1.3,
                      }}
                    >
                      {car.name}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        flexWrap: "wrap",
                        marginBottom: "14px",
                      }}
                    >
                      {car.mileage && (
                        <span
                          style={{
                            background: "#f3f3f3",
                            border: "1px solid #e8e8e8",
                            borderRadius: "3px",
                            padding: "3px 9px",
                            fontSize: "11px",
                            color: "#555",
                            fontWeight: 500,
                          }}
                        >
                          {car.mileage}
                        </span>
                      )}
                      {car.transmission && (
                        <span
                          style={{
                            background: "#f3f3f3",
                            border: "1px solid #e8e8e8",
                            borderRadius: "3px",
                            padding: "3px 9px",
                            fontSize: "11px",
                            color: "#555",
                            fontWeight: 500,
                          }}
                        >
                          {car.transmission}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "auto",
                        paddingTop: "12px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "9px",
                            color: "#aaa",
                            letterSpacing: "1.5px",
                            textTransform: "uppercase",
                            marginBottom: "2px",
                          }}
                        >
                          Asking Price
                        </div>
                        <div
                          style={{
                            fontSize: "20px",
                            fontWeight: 900,
                            color: "#c9000a",
                            lineHeight: 1,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {car.price}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCar(car);
                          setSelectedImage(0);
                          window.scrollTo(0, 0);
                        }}
                        style={{
                          background: "#111",
                          color: "white",
                          border: "none",
                          borderRadius: "3px",
                          padding: "10px 16px",
                          cursor: "pointer",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          flexShrink: 0,
                        }}
                      >
                        View Deal
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {filteredCars.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "80px 20px",
                background: "white",
                borderRadius: "6px",
                border: "1px solid #e8e8e8",
              }}
            >
              <div style={{ fontSize: "36px", marginBottom: "14px" }}>🔍</div>
              <h3
                style={{ margin: "0 0 6px", fontSize: "17px", color: "#111" }}
              >
                No vehicles match your filters
              </h3>
              <p
                style={{
                  color: "#999",
                  fontSize: "13px",
                  margin: "0 0 20px",
                }}
              >
                Try adjusting or clearing your filters.
              </p>
              <button
                onClick={clearAll}
                style={{
                  background: "#c9000a",
                  color: "white",
                  border: "none",
                  borderRadius: "3px",
                  padding: "11px 26px",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default function App() {
  const navigate = useNavigate();

  const heroImages = [cdw, motors, moto];
  const [heroIndex, setHeroIndex] = useState(0);
  const heroTitles = [
    "DRIVE AWAY TODAY",
    "PREMIUM PRE-OWNED",
    "UNMATCHED QUALITY",
  ];

  const heroSubtitles = [
    "Fast, Easy Finance Approvals.",
    "Browse our latest quality vehicles at unbeatable prices.",
    "Tell us what vehicle you need and we'll find it for you.",
  ];
  const heroButtons = ["Apply For Finance", "View Stock", "Buy Cars"];
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const brands = [
    { name: "BMW", logo: bmw },
    { name: "Audi", logo: audi },
    { name: "Ford", logo: ford },
    { name: "Hyundai", logo: hyundai },
    { name: "Mercedes", logo: mercedes },
    { name: "Nissan", logo: nissan },
    { name: "Toyota", logo: toyota },
    { name: "Volkswagen", logo: volkswagen },
  ];
  const [search, setSearch] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [carsLoading, setCarsLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [scrollTarget, setScrollTarget] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  useEffect(() => {
    fetchCars();
  }, []);

  /*useEffect(() => {
    if (!selectedCar && scrollTarget) {
      setTimeout(() => {
        document.getElementById(scrollTarget)?.scrollIntoView({
          behavior: "smooth",
        });

        if (scrollTarget === "finance") {
          setTimeout(() => {
            financeInputRef.current?.focus();
          }, 500);
        }

        setScrollTarget("");
      }, 100);
    }
  }, [selectedCar, scrollTarget]);*/
  /*useEffect(() => {
    if (!vehiclePrice || !deposit || !interestRate || !term) {
      setMonthlyPayment(null);
      setLoanAmount(null);
      setFinanceError("");
    }
  }, [vehiclePrice, deposit, interestRate, term]);*/
  const fetchCars = async () => {
    setCarsLoading(true);
    const { data, error } = await supabase.from("cars").select("*");

    if (error) {
      console.log(error);
      setCarsLoading(false);
      return;
    }

    const carsWithImages = await Promise.all(
      data.map(async (car: any) => {
        console.log("Folder name =", JSON.stringify(car.folder));

        const { data: files, error } = await supabase.storage
          .from("cars")
          .list(car.folder.trim());

        console.log("Error =", error);
        console.log("Files =", files);
        console.log("Folder:", car.folder);
        console.log("Files:", files);

        if (error) {
          console.log(error);
          return {
            ...car,
            images: [],
          };
        }

        const imageUrls = files.map((file: any) => {
          const { data } = supabase.storage
            .from("cars")
            .getPublicUrl(`${car.folder.trim()}/${file.name}`);

          return data.publicUrl;
        });
        console.log("Image URLs:", imageUrls);

        return {
          ...car,
          images: imageUrls,
        };
      })
    );

    setCars(carsWithImages as any);
    setCarsLoading(false);
  };
  // DETAIL PAGE
  if (selectedCar) {
    return (
      <VehicleDetailPage
        car={selectedCar}
        onBack={() => setSelectedCar(null)}
        onNavigate={navigate}
        onContactNav={() => {
          setScrollTarget("contact");
          setSelectedCar(null);
        }}
      />
    );
  }

  function HomePage() {
    const navigate = useNavigate();
    const [showBackTop, setShowBackTop] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
      const onResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);

    const styles = `
  @keyframes scrollBrands {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
  .vehicle-card {
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .vehicle-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  `;
    // HOME PAGE
    return (
      <div
        style={{
          fontFamily: "Arial",
          backgroundColor: "#f4f4f4",
          minHeight: "100vh",
        }}
      >
        <style>{styles}</style>

        <section
          id="home"
          style={{
            backgroundImage: `
            linear-gradient(
              rgba(0,0,0,0.55),
              rgba(0,0,0,0.35)
              ),
url(${heroImages[heroIndex]})
`,
            backgroundSize: isMobile ? "cover" : "cover",
            backgroundPosition: isMobile ? "left center" : "left",
            backgroundRepeat: "no-repeat",
            transition: "1s ease",
            animation: "fadeIn 1s",
            backgroundAttachment: isMobile ? "scroll" : "fixed",
            height: isMobile ? "90vh" : "100vh",

            position: "relative",
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "flex-start",
            paddingTop: isMobile ? "70px" : "0",
          }}
        >
          <div
            style={{
              textAlign: "left",
              marginLeft: isMobile ? "0" : "3%",
              color: "white",
              width: "100%",
              maxWidth: isMobile ? "80%" : "700px",
              marginTop: isMobile ? "30px" : "-60px",
              padding: isMobile ? "0 18px" : "0",
            }}
          >
            <div
              style={{
                color: "#ff2d2d",
                fontSize: isMobile ? "9px" : "18px",
                fontWeight: "800",
                letterSpacing: isMobile ? "2px" : "5px",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              | CAR DEAL WAREHOUSE
            </div>
            <h1
              style={{
                fontSize: isMobile ? "24px" : "46px",
                letterSpacing: isMobile ? "0" : "1px",
                marginTop: "0px",
                lineHeight: "1.15",
                marginBottom: isMobile ? "12px" : "16px",
                fontWeight: "900",
                maxWidth: isMobile ? "100%" : "600px",
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              {heroTitles[heroIndex]}
            </h1>

            <p
              style={{
                fontSize: isMobile ? "12px" : "16px",
                fontWeight: "300",
                maxWidth: isMobile ? "80%" : "560px",
                margin: "0",
                color: "#ddd",
                marginBottom: isMobile ? "16px" : "20px",
                marginTop: "0px",
                lineHeight: "1.9",
                textAlign: "left",
              }}
            >
              {heroSubtitles[heroIndex]}
            </p>
            {heroIndex === 1 ? (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                }}
              >
                <input
                  placeholder="Search make or model"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    padding: "14px 20px",
                    borderRadius: "10px",
                    border: "none",
                    width: "100%",
                    maxWidth: "500px",
                    fontSize: "10px",
                  }}
                />

                <button
                  onClick={() => navigate("/vehicles")}
                  style={{
                    backgroundColor: "#d40000",
                    color: "white",
                    border: "none",
                    padding: isMobile ? "10px 20px" : "18px 38px",
                    borderRadius: "999px",
                    fontSize: isMobile ? "10px" : "18px",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    cursor: "pointer",
                    boxShadow: "0 8px 25px rgba(212,0,0,0.35)",
                    transition: "0.3s ease",
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  View Stock
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (heroIndex === 0) {
                    navigate("/finance");
                  } else {
                    window.open("https://wa.me/27789125551", "_blank");
                  }
                }}
                style={{
                  backgroundColor: "#d40000",
                  color: "#fff",
                  border: "none",
                  padding: isMobile ? "10px 20px" : "18px 38px",
                  borderRadius: "50px",
                  fontSize: isMobile ? "10px" : "16px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  width: isMobile ? "70%" : "auto",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {heroButtons[heroIndex]}
              </button>
            )}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "10px",
            }}
          >
            {heroImages.map((_, index) => (
              <div
                key={index}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: heroIndex === index ? "red" : "white",
                  transition: "0.5s",
                }}
              />
            ))}
          </div>
        </section>

        <div
          style={{
            background: "#fff",
            borderTop: "1px solid #efefef",
            borderBottom: "1px solid #efefef",
            padding: "22px 0",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "64px",
              animation: "scrollBrands 60s linear infinite",
              width: "max-content",
            }}
          >
            {brands.concat(brands).map(function (brand, i) {
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    opacity: 0.95,

                    padding: "0 8px",
                  }}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    style={{
                      height: "34px",
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "9px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "#999",
                      fontWeight: 700,
                    }}
                  >
                    {brand.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <section
          id="buycars"
          style={{ padding: isMobile ? "32px 16px" : "40px 40px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#c9000a",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                  fontWeight: 700,
                }}
              ></div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "26px",
                  fontWeight: 900,
                  color: "#111",
                }}
              >
                Featured Vehicles
              </h2>
            </div>
            <button
              onClick={() => navigate("/vehicles")}
              style={{
                background: "transparent",
                color: "#111",
                border: "2px solid #111",
                borderRadius: "3px",
                padding: "10px 24px",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#111";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#111";
              }}
            >
              View All Stock →
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(280px, 1fr))",
              gap: isMobile ? "14px" : "20px",
              marginTop: "20px",
            }}
          >
            {cars
              .filter((car) =>
                car.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((car) => (
                <div
                  key={car.id}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 40px rgba(0,0,0,0.13)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 12px rgba(0,0,0,0.07)";
                  }}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "6px",
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                    transition: "all 0.25s ease",
                    cursor: "pointer",
                    border: "1px solid #efefef",
                  }}
                >
                  {/* IMAGE */}
                  <div
                    style={{
                      position: "relative",
                      height: "210px",
                      overflow: "hidden",
                      background: "#f0f0f0",
                    }}
                  >
                    <img
                      src={normalizeImages(car.images)[0] || ""}
                      alt={car.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.4s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        background: "#c9000a",
                        color: "white",
                        fontSize: "9px",
                        fontWeight: 800,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        padding: "5px 10px",
                        borderRadius: "2px",
                      }}
                    >
                      Featured
                    </span>
                    {car.year && (
                      <span
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          background: "rgba(0,0,0,0.6)",
                          color: "white",
                          fontSize: "10px",
                          fontWeight: 600,
                          padding: "4px 9px",
                          borderRadius: "2px",
                        }}
                      >
                        {car.year}
                      </span>
                    )}
                  </div>

                  {/* CARD BODY */}
                  <div style={{ padding: "18px 18px 20px" }}>
                    <h3
                      style={{
                        fontSize: "15px",
                        fontWeight: 800,
                        color: "#111",
                        margin: "0 0 10px",
                        lineHeight: 1.3,
                      }}
                    >
                      {car.name}
                    </h3>

                    {/* SPEC PILLS */}
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        flexWrap: "wrap",
                        marginBottom: "14px",
                      }}
                    >
                      {car.mileage && (
                        <span
                          style={{
                            background: "#f5f5f5",
                            border: "1px solid #eaeaea",
                            borderRadius: "2px",
                            padding: "3px 9px",
                            fontSize: "11px",
                            color: "#666",
                            fontWeight: 500,
                          }}
                        >
                          {car.mileage}
                        </span>
                      )}
                      {car.transmission && (
                        <span
                          style={{
                            background: "#f5f5f5",
                            border: "1px solid #eaeaea",
                            borderRadius: "2px",
                            padding: "3px 9px",
                            fontSize: "11px",
                            color: "#666",
                            fontWeight: 500,
                          }}
                        >
                          {car.transmission}
                        </span>
                      )}
                      {car.fuel && (
                        <span
                          style={{
                            background: "#f5f5f5",
                            border: "1px solid #eaeaea",
                            borderRadius: "2px",
                            padding: "3px 9px",
                            fontSize: "11px",
                            color: "#666",
                            fontWeight: 500,
                          }}
                        >
                          {car.fuel}
                        </span>
                      )}
                    </div>

                    {/* PRICE + CTA */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        borderTop: "1px solid #f0f0f0",
                        paddingTop: "14px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "9px",
                            color: "#bbb",
                            letterSpacing: "1.5px",
                            textTransform: "uppercase",
                            marginBottom: "3px",
                          }}
                        >
                          Asking Price
                        </div>
                        <div
                          style={{
                            fontSize: "22px",
                            fontWeight: 900,
                            color: "#c9000a",
                            lineHeight: 1,
                          }}
                        >
                          {car.price}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedCar(car);
                          setSelectedImage(0);
                          window.scrollTo(0, 0);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#c9000a";
                          e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#111";
                          e.currentTarget.style.color = "white";
                        }}
                        style={{
                          background: "#111",
                          color: "white",
                          border: "none",
                          borderRadius: "3px",
                          padding: "10px 16px",
                          cursor: "pointer",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          transition: "background 0.2s ease",
                        }}
                      >
                        View Deal
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
        <section
          style={{
            padding: isMobile ? "24px 16px" : "28px 40px",
            backgroundColor: "#111",
            marginBottom: "0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#c9000a",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                Just In
              </div>
              <h2
                style={{
                  fontSize: isMobile ? "24px" : "34px",
                  fontWeight: 900,
                  margin: 0,
                  color: "white",
                  letterSpacing: "-0.5px",
                }}
              >
                Recently Added
              </h2>
            </div>
            <button
              onClick={() => navigate("/vehicles")}
              style={{
                background: "transparent",
                color: "white",
                border: "2px solid rgba(255,255,255,0.25)",
                borderRadius: "3px",
                padding: "10px 22px",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "11px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#c9000a";
                e.currentTarget.style.color = "#c9000a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                e.currentTarget.style.color = "white";
              }}
            >
              View All Stock →
            </button>
          </div>

          {/* CARDS GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr 1fr"
                : "repeat(auto-fit, minmax(250px, 1fr))",
              gap: isMobile ? "12px" : "20px",
            }}
          >
            {cars.slice(0, 4).map((car) => (
              <div
                key={car.id}
                onClick={() => {
                  setSelectedCar(car);
                  setSelectedImage(0);
                  window.scrollTo(0, 0);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(0,0,0,0.3)";
                }}
                style={{
                  background: "#1a1a1a",
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                  border: "1px solid #2a2a2a",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* IMAGE */}
                <div
                  style={{
                    position: "relative",
                    height: isMobile ? "130px" : "220px",
                    overflow: "hidden",
                    background: "#000",
                  }}
                >
                  <img
                    src={normalizeImages(car.images)[0] || ""}
                    alt={car.name}
                    style={{
                      width: "100%",
                      height: isMobile ? "130px" : "220px",
                      objectFit: "cover",
                      backgroundColor: "black",
                      boxShadow: "0 0 20px rgba(255,0,0,0.5)",
                      transition: "0.4s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                  {/* NEW IN badge */}
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "#c9000a",
                      color: "white",
                      fontSize: "9px",
                      fontWeight: 800,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      padding: "5px 10px",
                      borderRadius: "2px",
                    }}
                  >
                    New In
                  </span>
                  {/* Year badge */}
                  {car.year && (
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "rgba(0,0,0,0.65)",
                        color: "white",
                        fontSize: "10px",
                        fontWeight: 600,
                        padding: "4px 9px",
                        borderRadius: "2px",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {car.year}
                    </span>
                  )}
                  {/* Bottom gradient */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "80px",
                      background:
                        "linear-gradient(transparent, rgba(26,26,26,0.95))",
                    }}
                  />
                </div>

                {/* CARD BODY */}
                <div
                  style={{
                    padding: isMobile ? "10px 12px 14px" : "18px 20px 22px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <h3
                    style={{
                      fontSize: isMobile ? "12px" : "16px",
                      fontWeight: 800,
                      margin: "0 0 6px",
                      color: "white",
                      lineHeight: 1.3,
                    }}
                  >
                    {car.name}
                  </h3>
                  {/* Specs row */}
                  <div
                    style={{
                      display: "flex",
                      gap: isMobile ? "5px" : "10px",
                      flexWrap: "wrap",
                      marginBottom: isMobile ? "10px" : "16px",
                    }}
                  >
                    {car.mileage && (
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#888",
                          background: "#242424",
                          padding: "3px 9px",
                          borderRadius: "2px",
                        }}
                      >
                        {car.mileage}
                      </span>
                    )}
                    {car.transmission && (
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#888",
                          background: "#242424",
                          padding: "3px 9px",
                          borderRadius: "2px",
                        }}
                      >
                        {car.transmission}
                      </span>
                    )}
                    {car.fuel && (
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#888",
                          background: "#242424",
                          padding: "3px 9px",
                          borderRadius: "2px",
                        }}
                      >
                        {car.fuel}
                      </span>
                    )}
                  </div>

                  {/* Price + CTA */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid #2a2a2a",
                      paddingTop: "14px",
                      marginTop: "auto",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "9px",
                          color: "#666",
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          marginBottom: "3px",
                        }}
                      >
                        Price
                      </div>
                      <div
                        style={{
                          fontSize: isMobile ? "16px" : "20px",
                          fontWeight: 900,
                          color: "#c9000a",
                          lineHeight: 1,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {car.price}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCar(car);
                        setSelectedImage(0);
                        window.scrollTo(0, 0);
                      }}
                      style={{
                        background: "#c9000a",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        padding: isMobile ? "4px 4px" : "10px 16px",
                        cursor: "pointer",
                        fontSize: isMobile ? "6px" : "11px",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        transition: "background 0.2s ease",
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#a50008";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#c9000a";
                      }}
                    >
                      View Deal
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            padding: isMobile ? "32px 14px" : "42px 20px",
            backgroundColor: "#0a0a0a",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "6px" }}>
            <div
              style={{
                fontSize: "11px",
                color: "#c9000a",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: "10px",
              }}
            >
              Our Advantage
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: isMobile ? "25px" : "38px",
                fontWeight: 900,
                color: "white",
                letterSpacing: "-0.5px",
                marginBottom: "10px",
              }}
            >
              Why Buy From Us
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "2px",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            {[
              {
                icon: "◈",
                title: "In-House Finance",
                body: "We finance all individuals prior to Affordability and Deposit — no stress, no runaround.",
              },
              {
                icon: "◉",
                title: "Blacklisted or Under Debt Review?",
                body: "We assist clients who are Blacklisted, Self-Employed & under Debt Review. We find a way.",
              },
              {
                icon: "◎",
                title: "Nationwide Delivery",
                body: "We deliver vehicles safely and efficiently throughout South Africa — door to door.",
              },
              {
                icon: "◇",
                title: "Quick Finance Approval",
                body: "Fast approvals from South Africa's leading banks with competitive rates and flexible terms.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: isMobile ? "10px 11px" : "26px 22px",
                  borderLeft: "3px solid #c9000a",
                  background: "#141414",
                  transition: "background 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1c1c1c";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#141414";
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    color: "#c9000a",
                    marginBottom: "14px",
                    lineHeight: 1,
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  style={{
                    color: "white",
                    fontWeight: 800,
                    fontSize: isMobile ? "14px" : "16px",
                    margin: "0 0 10px",
                    letterSpacing: "0.3px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "#888",
                    fontWeight: 400,
                    lineHeight: "1.7",
                    margin: 0,
                    fontSize: isMobile ? "10px" : "13px",
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            background: "linear-gradient(135deg, #c9000a 0%, #8a0007 100%)",
            color: "white",
            padding: isMobile ? "28px 4px" : "44px 20px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "repeat(2, 1fr)"
                : "repeat(4, 1fr)",
              gap: isMobile ? "32px 16px" : "20px",
              textAlign: "center",
              maxWidth: "960px",
              margin: "0 auto",
            }}
          >
            {[
              { value: "100+", label: "Vehicles Delivered" },
              { value: "98%", label: "Finance Approval Rate" },
              { value: "10+", label: "Years in Business" },
              { value: "24/7", label: "Customer Support" },
            ].map((stat, i) => (
              <div key={i} style={{ padding: "0 10px" }}>
                <div
                  style={{
                    fontSize: isMobile ? "28px" : "38px",
                    fontWeight: 900,
                    color: "white",
                    lineHeight: 1,
                    letterSpacing: "-1px",
                    marginBottom: "4px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.75)",
                    fontWeight: 600,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section
          style={{
            padding: isMobile ? "36px 14px" : "52px 20px",
            backgroundColor: "#f7f7f7",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div
              style={{
                fontSize: "11px",
                color: "#c9000a",
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: "5px",
              }}
            >
              Testimonials
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: isMobile ? "26px" : "36px",
                fontWeight: 900,
                color: "#111",
              }}
            >
              What Our Clients Say
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "20px",
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            {[
              {
                quote:
                  "Amazing service and smooth finance process. Highly recommend Car Deal Warehouse.",
                name: "Themba M.",
                location: "Johannesburg",
              },
              {
                quote:
                  "Vehicle was exactly as advertised. Excellent customer support from start to finish.",
                name: "Sarah K.",
                location: "Pretoria",
              },
              {
                quote:
                  "Professional dealership with quality vehicles. Will definitely buy again.",
                name: "Jason P.",
                location: "Cape Town",
              },
            ].map((review, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "white",
                  padding: "22px",
                  borderRadius: "6px",
                  border: "1px solid #ebebeb",
                  borderTop: "4px solid #c9000a",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    color: "#c9000a",
                    fontSize: "13px",
                    letterSpacing: "2px",
                    marginBottom: "8px",
                  }}
                >
                  ★★★★★
                </div>
                <p
                  style={{
                    color: "#444",
                    lineHeight: "1.8",
                    fontSize: "12px",
                    margin: "0 0 20px",
                    fontStyle: "italic",
                  }}
                >
                  "{review.quote}"
                </p>
                <div
                  style={{
                    borderTop: "1px solid #f0f0f0",
                    paddingTop: "8px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: "12px",
                      color: "#111",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {review.name}
                  </div>
                  <div
                    style={{
                      fontSize: "9px",
                      color: "#aaa",
                      marginTop: "2px",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    {review.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <style>{`
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.55); }
            70% { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
          }
          .float-btn-label {
            position: absolute;
            right: 58px;
            top: 50%;
            transform: translateY(-50%);
            background: #111;
            color: white;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            white-space: nowrap;
            padding: 7px 12px;
            border-radius: 4px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
          }
          .float-btn:hover .float-btn-label {
            opacity: 1;
          }
          .float-btn:hover {
            transform: scale(1.1);
          }
          .float-btn {
            transition: transform 0.2s ease;
          }
        `}</style>

        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "flex-end",
          }}
        >
          {/* WHATSAPP */}
          <div className="float-btn" style={{ position: "relative" }}>
            <span className="float-btn-label">Chat on WhatsApp</span>
            <a
              href="https://wa.me/27789125551"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                backgroundColor: "#25D366",
                color: "white",
                textDecoration: "none",
                fontWeight: 900,
                fontSize: "22px",
                animation: "pulse 2s infinite",
                boxShadow: "0 4px 16px rgba(37,211,102,0.45)",
              }}
              title="WhatsApp Us"
            >
              ✉
            </a>
          </div>

          {/* CALL */}
          <div className="float-btn" style={{ position: "relative" }}>
            <span className="float-btn-label">Call the Dealer</span>
            <a
              href="tel:+27789125551"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                backgroundColor: "#111",
                color: "white",
                textDecoration: "none",
                fontWeight: 900,
                fontSize: "20px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                border: "2px solid #2a2a2a",
              }}
              title="Call Dealer"
            >
              ✆
            </a>
          </div>
        </div>
        {/* ENQUIRY FORM SECTION */}
        <section
          id="contact"
          style={{
            background: "linear-gradient(135deg, #0a0a0a 0%, #1a0000 100%)",
            padding: isMobile ? "56px 20px" : "80px 40px",
          }}
        >
          <div
            style={{
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            {/* HEADING */}
            <div style={{ textAlign: "center", marginBottom: "44px" }}>
              <div
                style={{
                  fontSize: "11px",
                  color: "#c9000a",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                Get In Touch
              </div>
              <h2
                style={{
                  margin: "0 0 12px",
                  fontSize: isMobile ? "26px" : "36px",
                  fontWeight: 900,
                  color: "white",
                  letterSpacing: "-0.5px",
                }}
              >
                Send Us an Enquiry
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "14px",
                  margin: 0,
                  lineHeight: "1.6",
                }}
              >
                Fill in your details and we will reply on WhatsApp within
                minutes.
              </p>
            </div>

            {/* FORM */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "14px",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label
                  style={{
                    fontSize: "10px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#666",
                    fontWeight: 700,
                  }}
                >
                  Full Name
                </label>
                <input
                  id="enq-name"
                  type="text"
                  style={{
                    background: "#161616",
                    border: "1px solid #2a2a2a",
                    borderRadius: "4px",
                    padding: "14px 16px",
                    color: "white",
                    fontSize: "14px",
                    outline: "none",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#c9000a";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#2a2a2a";
                  }}
                />
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                <label
                  style={{
                    fontSize: "10px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#666",
                    fontWeight: 700,
                  }}
                >
                  Phone Number
                </label>
                <input
                  id="enq-phone"
                  type="tel"
                  style={{
                    background: "#161616",
                    border: "1px solid #2a2a2a",
                    borderRadius: "4px",
                    padding: "14px 16px",
                    color: "white",
                    fontSize: "14px",
                    outline: "none",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#c9000a";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#2a2a2a";
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  gridColumn: isMobile ? "1" : "1 / -1",
                }}
              >
                <label
                  style={{
                    fontSize: "10px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#666",
                    fontWeight: 700,
                  }}
                >
                  Message
                </label>
                <textarea
                  id="enq-msg"
                  placeholder="e.g. I am interested in the BMW 3 Series. Please contact me."
                  rows={4}
                  style={{
                    background: "#161616",
                    border: "1px solid #2a2a2a",
                    borderRadius: "4px",
                    padding: "14px 16px",
                    color: "white",
                    fontSize: "14px",
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "Arial",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#c9000a";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#2a2a2a";
                  }}
                />
              </div>

              {/* SUBMIT */}
              <div
                style={{
                  gridColumn: isMobile ? "1" : "1 / -1",
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "stretch" : "center",
                  gap: "16px",
                }}
              >
                <button
                  onClick={() => {
                    const nameVal = (
                      document.getElementById("enq-name") as HTMLInputElement
                    ).value.trim();
                    const phoneVal = (
                      document.getElementById("enq-phone") as HTMLInputElement
                    ).value.trim();
                    const msgVal = (
                      document.getElementById("enq-msg") as HTMLTextAreaElement
                    ).value.trim();
                    if (!nameVal || !phoneVal) {
                      alert("Please enter your name and phone number.");
                      return;
                    }
                    const text =
                      "Hi Car Deal Warehouse, my name is " +
                      nameVal +
                      " and my number is " +
                      phoneVal +
                      ". " +
                      (msgVal || "I would like more information.");
                    window.open(
                      "https://wa.me/27789125551?text=" +
                        encodeURIComponent(text),
                      "_blank"
                    );
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#a50008";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#c9000a";
                  }}
                  style={{
                    background: "#c9000a",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "16px 36px",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  Send via WhatsApp
                </button>
                <span
                  style={{
                    color: "#444",
                    fontSize: "12px",
                    lineHeight: "1.5",
                  }}
                >
                  We respond within minutes during business hours.
                </span>
              </div>
            </div>
          </div>
        </section>

        <footer
          id="contact"
          style={{
            backgroundColor: "#0a0a0a",
            color: "white",
            padding: isMobile ? "56px 24px 32px" : "72px 40px 36px",
            borderTop: "3px solid #c9000a",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr",
              gap: isMobile ? "30px" : "50px",
              maxWidth: "1100px",
              margin: "0 auto 56px",
            }}
          >
            {/* BRAND COLUMN */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "20px",
                }}
              >
                <img
                  src={logo}
                  alt="CDW"
                  style={{
                    width: "68px",
                    height: "68px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #c9000a",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: "17px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "white",
                    }}
                  >
                    Car Deal Warehouse
                  </div>
                  <div
                    style={{
                      color: "#c9000a",
                      fontSize: "7px",
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      marginTop: "2px",
                    }}
                  >
                    Drive Away Today
                  </div>
                </div>
              </div>
              <p
                style={{
                  color: "#666",
                  lineHeight: "1.8",
                  fontSize: "14px",
                  margin: "0 0 24px",
                  maxWidth: "340px",
                }}
              >
                Premium pre-owned vehicles across South Africa. In-house finance
                available — even if you are blacklisted or under debt review.
              </p>
              <a
                href="https://wa.me/27789125551"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  background: "#25D366",
                  color: "white",
                  textDecoration: "none",
                  padding: "10px 20px",
                  borderRadius: "3px",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                WhatsApp Us
              </a>
            </div>

            {/* QUICK LINKS COLUMN */}
            <div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#c9000a",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                Navigate
              </div>
              {[
                {
                  label: "Home",
                  action: () =>
                    document
                      .getElementById("home")
                      ?.scrollIntoView({ behavior: "smooth" }),
                },
                { label: "View Stock", action: () => navigate("/vehicles") },
                { label: "Finance", action: () => navigate("/finance") },
                {
                  label: "Contact",
                  action: () =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" }),
                },
              ].map((link) => (
                <div
                  key={link.label}
                  onClick={link.action}
                  style={{
                    color: "#666",
                    fontSize: "14px",
                    marginBottom: "12px",
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#666";
                  }}
                >
                  {link.label}
                </div>
              ))}
            </div>

            {/* CONTACT COLUMN */}
            <div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#c9000a",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                Get In Touch
              </div>
              {[
                { icon: "◎", text: "Gauteng, South Africa" },
                { icon: "◈", text: "+27 78 912 5551" },
                { icon: "◇", text: "sales@cardealwarehouse.co.za" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      color: "#c9000a",
                      fontSize: "14px",
                      lineHeight: "1.5",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </span>
                  <span
                    style={{
                      color: "#666",
                      fontSize: "13px",
                      lineHeight: "1.6",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
              <a
                href="tel:+27789125551"
                style={{
                  display: "inline-block",
                  background: "transparent",
                  color: "white",
                  textDecoration: "none",
                  padding: "10px 20px",
                  borderRadius: "3px",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  border: "2px solid #333",
                  marginTop: "4px",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#c9000a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#333";
                }}
              >
                Call Dealer
              </a>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div
            style={{
              borderTop: "1px solid #1a1a1a",
              paddingTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            <span style={{ color: "#444", fontSize: "12px" }}>
              © 2026 Car Deal Warehouse. All rights reserved.
            </span>
            <span
              style={{
                fontSize: "10px",
                color: "#333",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Gauteng · South Africa
            </span>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/vehicles"
        element={
          <Layout>
            <AllVehiclesPage
              cars={cars}
              brands={brands}
              setSelectedCar={setSelectedCar}
              setSelectedImage={setSelectedImage}
              loading={carsLoading}
            />
          </Layout>
        }
      />
      <Route
        path="/finance"
        element={
          <Layout>
            <FinancePage />
          </Layout>
        }
      />
    </Routes>
  );
}
const financeInput: CSSProperties = {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  width: "100%",
  backgroundColor: "#fafafa",
  fontSize: "15px",
  boxSizing: "border-box",
};
