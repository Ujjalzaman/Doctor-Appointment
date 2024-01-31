import img2 from '../../../images/features/feature-02.jpg';
import img3 from '../../../images/features/feature-01.jpg';
import img4 from '../../../images/features/feature-05.jpg';
import img5 from '../../../images/features/feature-06.jpg';
import img from '../../../images/features/feature.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

const AvailableServiceContent = () => {
    const availabeServiceArray = [
        { title: 'ICU', img: img },
        { title: 'Chamber', img: img5 },
        { title: 'Patient Ward', img: img2 },
        { title: 'Test Room', img: img3 },
        { title: 'Laboratory', img: img4 },
    ]
    return (
        <div className="d-flex justify-content-center align-items-center gap-4">

            <Swiper
                spaceBetween={2}
                slidesPerView={4}
                modules={[Navigation, Autoplay]}
                loop={true}
                centeredSlides={true}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
            >
                {
                    availabeServiceArray.map((item) => (
                        <SwiperSlide key={item.title} className='my-2'>
                            <div className="feature-item text-center">
                                <img src={item.img} className="img-fluid" alt="" />
                                <p>{item.title}</p>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default AvailableServiceContent