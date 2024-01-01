import React from 'react'
import './BreadCrumb.css';
const BreadCrumb = () => {
    return (
        <div className="breadcrumb-bar">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-12 col-12">
                        <nav aria-label="breadcrumb" className="page-breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index-2.html">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Booking</li>
                            </ol>
                        </nav>
                        <h2 className="breadcrumb-title">Booking</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BreadCrumb;

// Billow Code will be add for Doctor Filtering
// <div class="container-fluid">
//     <div class="row align-items-center">
//         <div class="col-md-8 col-12">
//             <nav aria-label="breadcrumb" class="page-breadcrumb">
//                 <ol class="breadcrumb">
//                     <li class="breadcrumb-item"><a href="index-2.html">Home</a></li>
//                     <li class="breadcrumb-item active" aria-current="page">Search</li>
//                 </ol>
//             </nav>
//             <h2 class="breadcrumb-title">2245 matches found for : Dentist In Bangalore</h2>
//         </div>
//         <div class="col-md-4 col-12 d-md-block d-none">
//             <div class="sort-by">
//                 <span class="sort-title">Sort by</span>
//                 <span class="sortby-fliter">
//                     <select class="select">
//                         <option>Select</option>
//                         <option class="sorting">Rating</option>
//                         <option class="sorting">Popular</option>
//                         <option class="sorting">Latest</option>
//                         <option class="sorting">Free</option>
//                     </select>
//                 </span>
//             </div>
//         </div>
//     </div>