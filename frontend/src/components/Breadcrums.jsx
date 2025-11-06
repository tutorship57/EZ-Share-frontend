import React from 'react'
import { Link, useLocation } from "react-router-dom";
const BreadCrums = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav className="max-w-6xl mx-auto flex items-center px-4 sm:px-6 lg:px-8 pt-6  text-m text-violet-800 font-medium space-x-1 ">
        <Link to="/" className=" hover:underline hover:text-violet-600">
            Home
        </Link>
        {pathnames.map((value, index) => {
            
            const pathTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const pathBefore = `/${pathnames.slice(0, index).join("/")}`;
            const isLast = index === pathnames.length - 1;
            
            value = value.length > 15 ? `${value.slice(0, 20)}...` : value;

            return (
            <div key={pathTo} className="flex items-center space-x-1">
                <span className="text-violet-400">›</span>
                {isLast ? (
                <span className="text-violet-500 capitalize">{value}</span>
                ) : (
                <Link
                    to={index%2===0?pathBefore:pathTo}
                    className="hover:underline hover:text-violet-600 capitalize"
                >
                    {value}
                </Link>
                )}
            </div>
            );
        })}
        </nav>
    );
}

export default BreadCrums
