import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Col,
  Badge,
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faVideo, faStar } from "@fortawesome/free-solid-svg-icons";

const Films = (props) => {
  const [open, setOpen] = useState(false);
  const [watch, setWatch] = useState(0);
  const [myVote, setMyVote] = useState(0);
  const [isVote, setIsVote] = useState(false);
  const [totalVote] = useState(props.globalCountRating);
  const [totalNote] = useState(props.globalRating);

  var clickHeart = (name, img) => {
    if (props.seen === true) {
      props.clickDeleteMovie(name);
    } else {
      props.clickAddMovie(name, img);
    }
  };
  var colorHeart;
  if (props.seen === true) {
    colorHeart = { color: "red" };
  }

  var clickWatch = () => {
    setWatch(watch + 1);
  };

  var clickRating = (vote) => {
    if (vote < 0) {
      vote = 0;
    }
    if (vote > 10) {
      vote = 10;
    }
    setMyVote(vote);
    setIsVote(true);
  };
  var colorCamera;
  if (watch) {
    colorCamera = { color: "red" };
  }
  var myRating = [];
  for (var i = 0; i < 10; i++) {
    var colorStar = {};
    if (i < myVote) {
      colorStar = { color: "yellow" };
    }
    let count = i + 1;
    myRating.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        style={colorStar}
        onClick={() => clickRating(count)}
      />
    );
  }

  var nbtotalnote = totalNote * totalVote;
  var nbVote = totalVote;

  if (isVote) {
    nbVote += 1;
    nbtotalnote += myVote;
  }
  var totalAverage = Math.round(nbtotalnote / nbVote);

  var globalRating = [];
  for (let i = 0; i < 10; i++) {
    var colorStarGlobal = {};
    if (i < totalAverage) {
      colorStarGlobal = { color: "yellow" };
    }
    globalRating.push(
      <FontAwesomeIcon icon={faStar} style={colorStarGlobal} key={i} />
    );
  }
  const clickModal = () => {
    setOpen(!open);
  };
  return (
    <Col xs="12" lg="6" xl="4" className="mb-4">
      <Modal isOpen={open}>
        <ModalHeader toggle={() => clickModal()}>{props.movieName}</ModalHeader>
        <ModalBody>{props.movieDesc}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => clickModal()}>
            fermer
          </Button>{" "}
        </ModalFooter>
      </Modal>
      <Card
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <CardBody>
          <CardTitle>
            <strong>{props.movieName}</strong>
          </CardTitle>
        </CardBody>

        <CardImg width="100%" src={props.movieImg} alt={props.movieImg} />
        <CardBody>
          <CardText>
            Like{" "}
            <FontAwesomeIcon
              icon={faHeart}
              style={colorHeart}
              onClick={() => clickHeart(props.movieName, props.movieImg)}
            />
          </CardText>
          <CardText>
            Nombre de vue :{" "}
            <FontAwesomeIcon
              icon={faVideo}
              onClick={() => clickWatch()}
              style={colorCamera}
            />
            <span> </span>
            <Badge color="secondary">{watch}</Badge>
          </CardText>
          <div>
            Mon avis : {myRating}
            <ButtonGroup size="sm" className="m-2">
              <Button color="secondary" onClick={() => clickRating(myVote - 1)}>
                -
              </Button>
              <Button color="secondary" onClick={() => clickRating(myVote + 1)}>
                +
              </Button>
            </ButtonGroup>
          </div>
          <CardText>
            Moyenne : {globalRating} ({nbVote})
          </CardText>

          <Button color="primary" outline onClick={() => clickModal()}>
            Synopsis
          </Button>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Films;
