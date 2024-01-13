import React from 'react'
import DashboardSidebar from '../../UI/DashboardSidebar';
import Header from '../../Shared/Header/Header';
const DashboardLayout = ({ children }) => {
	return (
		<>
			<Header />
			<div className="container-fluid" style={{marginTop:160, marginBottom:200}}>
				<div className="row">
					<div className="col-md-5 col-lg-4 col-xl-3">
						<DashboardSidebar />
					</div>
					<div className="col-md-7 col-lg-8 col-xl-9">
						{children}
					</div>
				</div>
			</div>
		</>
	)
}

export default DashboardLayout