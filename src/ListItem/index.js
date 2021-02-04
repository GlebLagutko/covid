import React from "react";

function ListItem({country, count}) {

  return <li className='list-item'>{country}: <span>{count}</span></li>;
}

export default ListItem;