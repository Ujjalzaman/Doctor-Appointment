import React from 'react';
import img2 from '../../../images/features/baby.png';
import img3 from '../../../images/doc/doc4.jpg';
import img4 from '../../../images/doc/doctor 5.jpg';
import img5 from '../../../images/doc/doc1.jpg';
import img6 from '../../../images/doc/doctor chair 2.jpg';
import img7 from '../../../images/features/feature-03.jpg';
import img8 from '../../../images/doc/doctor 5.jpg';
import img9 from '../../../images/doc/doctor chair 2.jpg';
import './index.css';
import { Image } from 'antd';

const imageArray = [img2, img3, img4, img5, img6, img7, img8, img9];

const Gallery = () => {
	return (
		<section className="gallery-section">
			<div className="container">
				<div className="gallery-section__header text-center">
					<span className="gallery-section__label">Our space</span>
					<h2>Gallery</h2>
					<span className="gallery-section__line" aria-hidden="true" />
					<p className="gallery-section__lead">A look at our clinic and facilities</p>
				</div>
				<div className="gallery-grid">
					<Image.PreviewGroup>
						{imageArray.map((item, index) => (
							<div className="gallery-grid__item" key={index}>
								<div className="gallery-item">
									<Image
										src={item}
										alt=""
										className="gallery-item__img"
									/>
								</div>
							</div>
						))}
					</Image.PreviewGroup>
				</div>
			</div>
		</section>
	);
};

export default Gallery;
