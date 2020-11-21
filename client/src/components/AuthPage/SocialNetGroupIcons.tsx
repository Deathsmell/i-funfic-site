import React from "react";
import {Image, Row} from "react-bootstrap";
import facebookLogo from "../../logo/facebook-svgrepo-com.svg";
import twitterLogo from "../../logo/twitter.svg";
import googleLogo from "../../logo/search.svg";
import vkLogo from "../../logo/vk.svg";


const SocialNetGroupIcons: React.FC = () => {


    const logos = [
        {
            src: facebookLogo,
            alt: "Facebook logo"
        },
        {
            src: googleLogo,
            alt: "Google logo"
        },
        {
            src: twitterLogo,
            alt: "Twitter logo"
        },
        {
            src: vkLogo,
            alt: "VK logo"
        },
    ]

    return (
        <Row className="my-4 justify-content-center">
            {
                logos.map((logo, index) =>
                    <Image key={logo.src + index}
                           {...logo}
                           width="40"
                           height="40"
                           className="d-inline-block align-top mx-1"
                           style={{cursor: "pointer"}}
                    />
                )
            }
        </Row>
    )
}

export default SocialNetGroupIcons;