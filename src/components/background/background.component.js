import { useEffect, useState } from "react";
import "./background.style.scss";

const Background = (props) => {
  const [disableFlex, setDisableFlex] = useState(props.showFlex);

  useEffect(() => {
    setDisableFlex(props.showFlex);
  }, [props.showFlex]);

  return (
    <div className="homepage">
      <div className={`homepage-bg-image ${disableFlex ? "no-flex" : ""}`}>
        {props.children}
      </div>
    </div>
  );
};

export default Background;
