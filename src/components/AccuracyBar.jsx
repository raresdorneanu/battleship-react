import React, { useState, useEffect } from "react";

const AccuracyBar = (props) => {
  const [width, setWidth] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [strikes, setStrikes] = useState(0);

  useEffect(() => {
    let hitsCount = 0;
    let missesCount = 0;
    let totalStrikes = 0;
    props.gameDetails?.moves?.forEach((move) => {
      if (move.playerId === props.myId && move.result === true) {
        hitsCount += 1;
      } else if (move.playerId === props.myId && move.result === false) {
        missesCount += 1;
      }
      if (
        move.playerId === props.myId &&
        (move.result === true || move.result === false)
      ) {
        totalStrikes += 1;
      }
    });
    const percentage = totalStrikes > 0 ? (hitsCount / totalStrikes) * 100 : 0;
    setWidth(percentage);
    setHits(hitsCount);
    setMisses(missesCount);
    setStrikes(totalStrikes);
  }, [props.gameDetails, props.myId]);

  return (
    <div className="acc-container">
      <h2>
        Accuracy: <span style={{ color: "#fff" }}>{Math.round(width)} %</span>
      </h2>
      <div
        className="acc-bar"
        style={{
          border: "1px solid #ccc",
          width: "100%",
          height: "20px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            height: "100%",
            backgroundColor: "green",
            width: `${width}%`,
            transition: "all 0.5s ease-in-out",
            top: "0",
            left: "0",
            borderRadius: "5px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default AccuracyBar;
