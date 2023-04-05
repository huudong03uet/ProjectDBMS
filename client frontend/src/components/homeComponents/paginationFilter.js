import React from "react";
import { Link } from "react-router-dom";

const PaginationFilter = (props) => {
  const { page, pages, keyword = "" } = props;
  return (
    pages > 1 && (
      <nav>
        {/* <ul className="pagination justify-content-center">
          {[...Array(pages).keys()].map((x) => (
            <li
              className={`page-item ${x + 1 === page ? "active" : ""}`}
              key={x + 1}
            >
              <Link
                className="page-link"
                to={
                  keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}`
                }
              >
                {x + 1}
              </Link>
            </li>
          ))}
        </ul> */}
        {/* only render 10 pagination */}
        <ul className="pagination justify-content-center">
          {[...Array(pages).keys()].map((x) => {
            if (x + 1 === page) { 
              return (
                <li className="page-item active" key={x + 1}>
                  <Link className="page-link" to="#">
                    {x + 1}
                  </Link>
                </li>
              );
            } else if (
              x + 1 === page - 1 ||
              x + 1 === page - 2 ||
              x + 1 === page - 3 ||
              x + 1 === page + 1 ||
              x + 1 === page + 2 ||
              x + 1 === page + 3 ||
              x + 1 === page - 4 ||
              x + 1 === page + 4 
            ) {
              return (
                // one box render previous and next
                <li className="page-item" key={x + 1}>
                  <Link
                    className="page-link"
                    to={
                        keyword? `/search/full/name/${keyword.name}/price_min/${keyword.price_min}/price_max/${keyword.price_max}/brand/${keyword.brand}/shop/${keyword.shop}/color/${keyword.color}/gender/${keyword.gender}/order_by/${keyword.order_by}/page/${x + 1 === page - 4 ? 1 : x + 1 === page + 4 ? x + 1 : x + 1}`
                        : `/search/full/name/${keyword.name}/price_min/${keyword.price_min}/price_max/${keyword.price_max}/brand/${keyword.brand}/shop/${keyword.shop}/color/${keyword.color}/gender/${keyword.gender}/order_by/${keyword.order_by}`
                    }
                  >
                    {/* {x + 1} */}
                    {/* {x + 1 === page - 1 ? "Previous" : "Next"} */}
                    { x + 1 === page - 4 ? "..." : x + 1 === page + 4 ? "..." : x + 1}
                  </Link>
                </li>
              );
            }
          })}
        </ul>        
      </nav>
    )
  );
};

export default PaginationFilter;
