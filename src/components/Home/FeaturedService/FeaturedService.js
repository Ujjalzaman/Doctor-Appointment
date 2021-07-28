import React from 'react';
// import baby from '../../../images/baby.png';
import baby from '../../../images/doc/doctor chair 2.jpg';


const FeaturedService = () => {
    return (
        <div className="feature-service pb-0 pb-md-5 pt-md-5">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-5 col-sm-6 col-12">
                        <img src={baby} className="img-fluid" alt="" />
                    </div>
                    <div className="col-md-7 col-sm-6 col-12 align-self-center">
                        <h1>Exceptional Dental Care, on your Term</h1>
                        <p className="text-primary my-5">Lorem ipsum dolor sit amet consectetur
                            adipisicing elit.  Tempore efacere amet aperiam non odio. Temporibus,
                            nemo quasi quisquam ipsa distinctio saepe sed veniam incidunt, tempora mollitia,
                            dignissimos repellendus expedita. Obcaecati minima, reiciendis optio aspernatur
                            autem pariatur soluta illum velit, eligendi dolorem consequuntur sapiente rerum
                            accusamus aut nulla praesentium! Neque autem animi, voluptatem magnam nesciunt
                            officia nemo nam, delectus minima velit beatae iste praesentium ad repudiandae,
                            similique excepturi sapiente.</p>
                        <button className="btn btn-primary">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedService;