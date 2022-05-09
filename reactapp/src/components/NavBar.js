import React, { useState } from "react";
import "./NavBar.css";
import {
  Nav,
  NavItem,
  NavLink,
  Popover,
  Button,
  PopoverHeader,
  PopoverBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { XCircle } from "react-bootstrap-icons";
const NavBar = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  var nbMovieLiked = props.movieLike.length;

  var wishMovie = props.movieLike.map((movie, i) => {
    return (
      <ListGroupItem key={i}>
        <img
          src={movie.movieImg}
          className="imgPopup"
          width="40"
          height="40"
          onClick={() => props.clickDeleteMovie(movie.movieName)}
          alt={movie.movieImg}
        />
        <span> {movie.movieName}</span>
        <span onClick={() => props.clickDeleteMovie(movie.movieName)}>
          {" "}
          <XCircle />
        </span>
      </ListGroupItem>
    );
  });
  return (
    <Nav style={{ marginBottom: 30 }}>
      <NavItem>
        <NavLink>
          <img src="./logo.png" alt="img" />
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink style={{ color: "white" }}>Last release</NavLink>
      </NavItem>
      <NavItem>
        <Button id="Popover1" type="button" className="m-2">
          {nbMovieLiked} films
        </Button>
        <Popover
          placement="bottom"
          isOpen={popoverOpen}
          target="Popover1"
          toggle={toggle}
        >
          <PopoverHeader>wish list</PopoverHeader>
          <PopoverBody>
            <ListGroup>{wishMovie}</ListGroup>
          </PopoverBody>
        </Popover>
      </NavItem>
    </Nav>
  );
};

export default NavBar;
