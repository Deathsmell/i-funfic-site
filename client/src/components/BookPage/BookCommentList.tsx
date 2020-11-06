import React from "react";
import {Container} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const BookCommentList: React.FC = () => {

    const src = "https://avatars.mds.yandex.net/get-pdb/1976636/ac1ce1a1-c9a4-4355-9a49-73627c1b9aab/s1200";

    return (
            <Card className="mt-4">
                <Card.Body>
                    <Row>
                        <Col lg={2} className="text-center">
                            <Image roundedCircle height="100px" width="100px" style={{objectFit: 'cover'}} src={src}/>
                            <br/>
                            <strong>
                                Deathsmell
                            </strong>
                        </Col>
                        <Col>
                            <Container>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae cum eum exercitationem
                                minima obcaecati qui recusandae repellat! Blanditiis dolores earum et hic illo iusto
                                natus, nesciunt numquam praesentium, qui sapiente.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet autem consequatur
                                consequuntur corporis culpa, cupiditate est iure omnis, ratione recusandae
                                reprehenderit, sequi vel? Labore, minima sed! Rerum, velit, voluptate.
                            </Container>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer className="text-muted text-center">2 days ago</Card.Footer>
            </Card>
    )
}

export default BookCommentList;