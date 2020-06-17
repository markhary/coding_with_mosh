import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

// No state, make this a Stateless Functional Component (sfc)
const Like = (props) => {
  let icon;
  if (props.liked) icon = faHeartSolid;
  else icon = faHeartRegular;

  return (
    <label type="button" onClick={() => props.onClick()} aria-hidden="true">
      <FontAwesomeIcon icon={icon} />
    </label>
  );
};

export default Like;
