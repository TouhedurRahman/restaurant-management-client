import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <>
            <SectionTitle
                subHeding={"From 11:00 AM to 10:00 PM"}
                heading={"Oredr Online"}
            ></SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                // pagination={{
                //     clickable: true,
                // }}
                // modules={[Pagination]}
                className="mySwiper mx-auto mb-24 w-3/4"
            >
                <SwiperSlide>
                    <img src='../../../../src/assets/home/slide1.jpg' alt='slide-images' />
                    <h3 className='text-3xl uppercase text-center -mt-16 text-white font-bold italic bg-gray-800 p-2 rounded-md font-serif'>Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='../../../../src/assets/home/slide2.jpg' alt='slide-images' />
                    <h3 className='text-3xl uppercase text-center -mt-16 text-white font-bold italic bg-gray-800 p-2 rounded-md font-serif'>Pizza</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='../../../../src/assets/home/slide3.jpg' alt='slide-images' />
                    <h3 className='text-3xl uppercase text-center -mt-16 text-white font-bold italic bg-gray-800 p-2 rounded-md font-serif'>Soap</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='../../../../src/assets/home/slide4.jpg' alt='slide-images' />
                    <h3 className='text-3xl uppercase text-center -mt-16 text-white font-bold italic bg-gray-800 p-2 rounded-md font-serif'>Cake</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src='../../../../src/assets/home/slide5.jpg' alt='slide-images' />
                    <h3 className='text-3xl uppercase text-center -mt-16 text-white font-bold italic bg-gray-800 p-2 rounded-md font-serif'>Salads</h3>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Category;