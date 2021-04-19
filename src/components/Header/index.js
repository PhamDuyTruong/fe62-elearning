import React from 'react';
import {Link} from "react-router-dom"

export default function Header() {
    return (
        <div>
            <h1>Đây là header</h1>
            <Link to="/">Home</Link>
            <Link to="/courses/bootcamp">Course List</Link>
            <Link to="/course/frontend">Course Detail</Link>
        </div>
    )
}
