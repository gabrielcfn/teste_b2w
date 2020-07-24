import React from "react";

const Filme = (props) => {
  return (
    <div>
      <h3>
        {props.filme.Title} - {props.filme.Year}
      </h3>
      <p>{props.filme.Genre}</p>
    </div>
  );
};

export default Filme;
