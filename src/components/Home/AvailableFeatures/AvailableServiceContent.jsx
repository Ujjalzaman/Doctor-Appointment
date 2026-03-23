import React from 'react';
import img2 from '../../../images/features/feature-02.jpg';
import img3 from '../../../images/features/feature-01.jpg';
import img4 from '../../../images/features/feature-05.jpg';
import img5 from '../../../images/features/feature-06.jpg';
import img from '../../../images/features/feature.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const availableServiceArray = [
	{ title: 'ICU', img: img },
	{ title: 'Chamber', img: img5 },
	{ title: 'Patient Ward', img: img2 },
	{ title: 'Test Room', img: img3 },
	{ title: 'Laboratory', img: img4 },
];

const AvailableServiceContent = () => {
	return (
		<div className="available-services-swiper-wrap">
			<Swiper
				spaceBetween={16}
				slidesPerView={2}
				modules={[Navigation, Autoplay]}
				loop
				autoplay={{ delay: 3000, disableOnInteraction: false }}
				navigation
				breakpoints={{
					576: { slidesPerView: 3 },
					768: { slidesPerView: 4 },
					992: { slidesPerView: 5 },
				}}
				className="available-services-swiper"
			>
				{availableServiceArray.map((item) => (
					<SwiperSlide key={item.title}>
						<div className="available-service-card">
							<div className="available-service-card__img-wrap">
								<img src={item.img} className="img-fluid" alt={item.title} />
							</div>
							<p className="available-service-card__title">{item.title}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default AvailableServiceContent;
