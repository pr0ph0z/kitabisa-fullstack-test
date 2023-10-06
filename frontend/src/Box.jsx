import PropTypes from "prop-types";

export default function Box(props) {
  return (
    <div style={{ width: "100px", border: "1px solid black" }}>
      <h3 style={{ textTransform: "uppercase", margin: "0px" }}>
        {props.code}
      </h3>
      <span>{props.rate}</span>
    </div>
  );
}

Box.propTypes = {
  code: PropTypes.string,
  rate: PropTypes.number,
};
