import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { Box, Button } from '@chakra-ui/react';
import { Products } from './Products';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Prev = (props) => {
    // console.log(props);
    const { className, onClick } = props;
    return (
        <>
            <Box borderRadius={"3px"} bg={"white"} p={"30px 8px"} zIndex={"10"} position={"absolute"} top={"20%"} left={"0px"} onClick={onClick} boxShadow={"rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"}>
                <GrPrevious fontSize={"20px"} color={"#3f4246"} />
            </Box>
        </>
    );
};

const Next = (props) => {
    // console.log(props);
    const { className, onClick } = props;
    return (
        <>
            <Box borderRadius={"3px"} bg={"white"} p={"30px 8px"} zIndex={"10"} position={"absolute"} top={"20%"} right={"0px"} onClick={onClick} boxShadow={"rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"}>
                <GrNext fontSize={"20px"} color={"#3f4246"} />
            </Box>
        </>
    );
};


export const ProductCarousel = () => {

    const [data,setData] = useState([]);

    const getData = () => {
        axios.get("https://herebuy-database.vercel.app/restaurants").then((res)=>{
           //  console.log(res.data);
          setData(res.data)
   
        })
    }
   
    useEffect(()=>{
       getData();
    },[])
    
    // below is the amount of products want to show
    // data = data?.filter((e, i) => i<10)

    const settings = {
        dots: false,
        // below option is used for scroll inifite function set true to use.
        infinite: true,
        // space: 100,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1240,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 940,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    

    return (
        <Box w={"99%"} m={"auto auto 50px auto"}>
            <Box display={'flex'} gap="20px" alignItems={"center"}>
           <h1 style={{fontSize:'25px',fontWeight:'700'}}>New On Nearbuy!</h1>
           <img style={{width:'30px',height:'30px'}} src="./HomeImages/ProductCrousal/starEmoji.png" alt="Error" />
           <img style={{width:'30px',height:'30px'}} src="./HomeImages/ProductCrousal/celebImage.png" alt="Error" />
           </Box>
            <Slider {...settings} prevArrow={<Prev />} nextArrow={<Next />} >

                {
                    data?.map((item) => (
                        <Products key={item.id} props={item} />
                    ))
                }

            </Slider>
        </Box>
    );
};
