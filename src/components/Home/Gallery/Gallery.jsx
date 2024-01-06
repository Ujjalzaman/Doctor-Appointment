import React from 'react';
import img from '../../../images/chairBg.png';
import img2 from '../../../images/baby.png';
import img3 from '../../../images/cavity.png';
import img4 from '../../../images/doctor.png';
import img5 from '../../../images/ema.png';
import img6 from '../../../images/flouride.png';
import img7 from '../../../images/features/feature-03.jpg';
import './index.css';

const Gallery = () => {
    return (
        <section id="gallery" class="gallery container">
            <div class="container">
                <div class="section-title mb-3">
                    <h2>Gallery</h2>
                    <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                </div>
            </div>

            <div class="container-fluid">
                <div class="row g-0">

                    <div class="col-lg-3 col-md-4">
                        <div class="gallery-item">
                            <a class="galelry-lightbox">
                                <img src={img} alt="" class="img-fluid"/>
                            </a>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-4">
                        <div class="gallery-item">
                            <a  class="galelry-lightbox">
                                <img src={img2} alt="" class="img-fluid"/>
                            </a>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-4">
                        <div class="gallery-item">
                            <a  class="galelry-lightbox">
                                <img src={img3} alt="" class="img-fluid"/>
                            </a>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-4">
                        <div class="gallery-item">
                            <a  class="galelry-lightbox">
                                <img src={img4} alt="" class="img-fluid"/>
                            </a>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-4">
                        <div class="gallery-item">
                            <a  class="galelry-lightbox">
                                <img src={img5} alt="" class="img-fluid"/>
                            </a>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-4">
                        <div class="gallery-item">
                            <a  class="galelry-lightbox">
                                <img src={img6} alt="" class="img-fluid"/>
                            </a>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-4">
                        <div class="gallery-item">
                            <a  class="galelry-lightbox">
                                <img src={img7} alt="" class="img-fluid"/>
                            </a>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-4">
                        <div class="gallery-item">
                            <a  class="galelry-lightbox">
                                <img src={img} alt="" class="img-fluid"/>
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default Gallery