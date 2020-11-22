import React from "react";
import {Image, Row} from "react-bootstrap";
import facebookLogo from "../../logo/facebook-svgrepo-com.svg";
import twitterLogo from "../../logo/twitter.svg";
import googleLogo from "../../logo/search.svg";
import vkLogo from "../../logo/vk.svg";
import {BASE_URL, FACEBOOK_LOGIN_URL} from "@api";


const activeStyle = {
    cursor: "pointer"
}

const disableStyle = {
    cursor: "inherit",
    filter: "grayscale(75%)"
}

const SocialNetGroupIcons: React.FC = () => {


    const logos = [
        {
            src: facebookLogo,
            alt: "Facebook logo",
            url: FACEBOOK_LOGIN_URL
        },
        {
            src: googleLogo,
            alt: "Google logo",
            url: null
        },
        {
            src: twitterLogo,
            alt: "Twitter logo",
            url: null
        },
        {
            src: vkLogo,
            alt: "VK logo",
            url: null
        },
    ]

    return (
        <Row className="my-4 justify-content-center">
            {
                logos.map((logo, index) => {
                        console.log(!!logo.url)
                        return <a href={logo.url ? BASE_URL + logo.url : "#"}
                                  style={!!logo.url ? activeStyle : disableStyle}
                        >
                            <Image key={logo.src + index}
                                   {...logo}
                                   width="40"
                                   height="40"
                                   className="d-inline-block align-top mx-1"
                            />
                        </a>;
                    }
                )
            }
        </Row>
    )
}

export default SocialNetGroupIcons;