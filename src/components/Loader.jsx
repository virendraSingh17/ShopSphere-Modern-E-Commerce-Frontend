import React from "react";
export default function Loader() {
  return <div className="loader-grid">{[1,2,3,4,5,6,7,8].map(i => <div className="skeleton" key={i}/>)}</div>;
}
