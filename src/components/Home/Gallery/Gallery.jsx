import React from 'react';
import img from '../../../images/features/feature-04.jpg';
import img10 from '../../../images/features/feature-04.jpg';
import img2 from '../../../images/baby.png';
import img3 from '../../../images/doc/doc4.jpg';
import img4 from '../../../images/doc/doctor 5.jpg';
import img5 from '../../../images/doc/doctor 3.jpg';
import img6 from '../../../images/doc/doctor chair 2.jpg';
import img7 from '../../../images/features/feature-03.jpg';
import './index.css';
import { Image } from 'antd';

const Gallery = () => {
    const imageArray = [img,img2,img3,img4,img5,img6,img7,img10]
    return (
        <section class="gallery container">
            <div class="text-center mb-5">
                <div class="section-title mb-3">
                    <h2>Gallery</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>

            <div class="container-fluid">
                <div class="row g-0">
                    <Image.PreviewGroup>
                        {
                            imageArray.map((item, index) => (
                                <div class="col-lg-3 col-md-4 col-sm-12" key={index + 55}>
                                    <div class="gallery-item">
                                        <div class="galelry-lightbox d-flex justify-content-center align-items-center">
                                            <Image src={item} alt="" class="h-100 w-100" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Image.PreviewGroup>
                </div>

            </div>
        </section>
    )
}

export default Gallery