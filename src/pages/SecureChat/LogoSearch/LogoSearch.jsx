import React from "react";
// import Logo from "../../img/logo.png";
import './LogoSearch.css'
// import { UilSearch } from '@iconscout/react-unicons'
import SearchIcon from '@mui/icons-material/Search';
const LogoSearch = () => {
  
  return (
    <div className="LogoSearch">
    👻
      <div className="Search">
          <input type="text" placeholder="#Explore"/>
          <div className="s-icon">
                <SearchIcon/>
          </div>
      </div>
    </div>
  );
};

export default LogoSearch;
