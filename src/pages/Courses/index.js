import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {getCoursesByCategory} from 'src/Actions/courses'

export default function Courses() {
    const dispatch = useDispatch();
    const {category} = useParams();
    const {courses, isLoading, error}= useSelector((state) => state.courses);
    
    console.log(courses)


    // Được chạy mỗi khi params thay đổi, đê gọi lại API mới tương ứng với category mới
    useEffect(() => {
       // dispatch action gọi API lấy dskh
       dispatch(getCoursesByCategory(category))
    }, [category]);
    return (
        <div>
            <h1>Courses list by category</h1>
        </div>
    )
}
