import React, { useState, useEffect } from "react";

const ProgressBar = (props) => {
  const [width, setWidth] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);

  useEffect(() => {
    let hitsCount = 0;
    let missesCount = 0;

    props.gameDetails?.moves?.forEach((move) => {
      if (move.playerId === props.myId && move.result === true) {
        hitsCount += 1;
      } else if (move.playerId === props.myId && move.result === false) {
        missesCount += 1;
      }
    });
    const progressPercentage = (hitsCount / 31) * 100;
    setHits(hitsCount);
    setMisses(missesCount);
    setWidth(progressPercentage);
  }, [props.gameDetails, props.myId]);

  return (
    <div className="prog-container">
      <h2>
        Progress: <span style={{ color: "#fff" }}>{Math.round(width)} %</span>
      </h2>
      <div
        className="prog-bar"
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

export default ProgressBar;
