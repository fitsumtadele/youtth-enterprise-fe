import React from "react";

export const Features = (props) => {
  return (
    <div
      id="features"
      style={{
        textAlign: "center",
        padding: "50px 0",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          className="section-title"
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>Insight</h2>
        </div>
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {props.data
            ? props.data.map((d, i) => (
                <div
                  key={`${d.title}-${i}`}
                  style={{
                    width: "23%",
                    minWidth: "200px",
                    padding: "15px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <i
                    className={d.icon}
                    style={{
                      fontSize: "48px",
                      color: "#007bff",
                      marginBottom: "15px",
                    }}
                  ></i>
                  <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "10px" }}>{d.title}</h3>
                  <p style={{ fontSize: "16px", color: "#666" }}>{d.text}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
