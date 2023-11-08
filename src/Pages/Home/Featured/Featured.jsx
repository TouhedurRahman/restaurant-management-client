import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImage from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white my-20 opacity-90">
            <div className=" bg-slate-800 bg-opacity-80 pt-10">
                <SectionTitle
                    subHeding={"Check it out"}
                    heading={"Featured Item"}
                ></SectionTitle>
                <div className="md:flex justify-center items-center pb-20 pt-12 px-36">
                    <div>
                        <img src={featuredImage} alt="Loading..." />
                    </div>
                    <div className="md:ml-10">
                        <p>Aug 20, 2029</p>
                        <p className="uppercase">Where I get some?</p>
                        <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, velit! Adipisci cupiditate accusamus mollitia cumque facilis culpa consequuntur, natus alias voluptas dolor numquam quis eligendi corporis a iste, quibusdam impedit amet obcaecati atque, officia distinctio quos. In, sequi temporibus ex quaerat reiciendis modi incidunt tempore voluptatibus quibusdam, dolorum, recusandae iste.</p>
                        <button className="btn btn-outline border-0 border-b-4 mt-4 text-white">Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;