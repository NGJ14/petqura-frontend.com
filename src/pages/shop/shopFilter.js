import React from "react";

const ShopFilter = () => {
  return (
    <div className="widget">
      <h5 className="widget-title line-bottom">Categories</h5>
      <div className="categories">
        <ul className="list list-border angle-double-right">
          <li>
            <a href="#">
              Creative<span>(19)</span>
            </a>
          </li>
          <li>
            <a href="#">
              Portfolio<span>(21)</span>
            </a>
          </li>
          <li>
            <a href="#">
              Fitness<span>(15)</span>
            </a>
          </li>
          <li>
            <a href="#">
              Gym<span>(35)</span>
            </a>
          </li>
          <li>
            <a href="#">
              Personal<span>(16)</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShopFilter;
