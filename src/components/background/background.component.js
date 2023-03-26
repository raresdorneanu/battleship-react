import "./background.style.scss";
const Background = ({ children }) => {
  return (
    <div className="homepage">
      <div className="homepage-bg-image">{children}</div>
    </div>
  );
};

export default Background;
