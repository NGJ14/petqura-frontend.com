import styled from "styled-components";

export const Tittle = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
  display: inline-block;

  h2 {
    font-size: 35px;
    color: #000;
    font-family: Montserrat;
    font-weight: normal;
    text-transform: capitalize;
    display: inline-block;
  }

  h3 {
    font-size: 24px;
    font-weight: normal;
  }

  .tittleBold {
    color: #00419d;
    font-weight: bold;
  }

  .borderLine {
    border-bottom: 2px solid #07b1f1;
    padding-bottom: 10px;
    padding-right: 15px;
    padding-left: 15px;
  }

  @media only screen and (max-width: 900px) {
    margin-bottom: 2rem;

    h2 {
      font-size: 30px;
    }

    h3 {
      font-size: 20px;
    }

    .tittleBold {
      margin-left: 10px;
    }
  }
`;

export const CustomImg = styled.div`
  width: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -20%;
  left: 2%;

  img {
    max-width: 100%;
  }

  @media only screen and (max-width: 900px) {
    width: 250px;
    bottom: -4%;
  }
`;

export const TernoryBtn = styled.a`
  background-color: #00419d;
  border-radius: 30px;
  font-family: Montserrat;
  font-weight: 500;
  color: #fff;
  font-size: 25px;
  padding: 1rem 3rem;
  position: absolute;
  bottom: -40px;
  z-index: 9;

  &:hover {
    color: #ffffff;
    text-decoration: none;
    background: linear-gradient(180deg, #00419d, #00419d80);
  }

  @media only screen and (max-width: 900px) {
    font-size: 16px;
    padding: 5px 20px;
    position: static;
  }
`;
