import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

function UpArrowIcon({display}) {
  return (
    <svg width="14" height="14" style={{
      color : "gray",
    }} className={display + ''} viewBox="0 0 14 9" xmlns="http://www.w3.org/2000/svg" fill="gray"><path d="M.19 1.272.81.653a.375.375 0 0 1 .53 0L7 6.3 12.66.653a.375.375 0 0 1 .53 0l.62.62a.375.375 0 0 1 0 .53L7.264 8.346a.375.375 0 0 1-.53 0L.19 1.802a.375.375 0 0 1 0-.53Z"></path></svg>
  );
}

export default UpArrowIcon;
