import React from 'react'
import DoctorDashboardSidebar from '../../UI/DoctorDashboardSidebar'
import Navbar from '../../Shared/Navbar/Navbar';
import Footer from '../../Shared/Footer/Footer';
import BreadCrumb from '../../UI/BreadCrumb';
const DashboardLayout = ({children}) => {
	return (
		<>
			<Navbar />
			<BreadCrumb/>
			<div className="content" style={{marginBottom:150}}>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
							<DoctorDashboardSidebar />
						</div>

						<div className="col-md-7 col-lg-8 col-xl-9">
							{children}
						</div>
					</div>

				</div>

			</div>
			<Footer/>
		</>
	)
}

export default DashboardLayout