import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
 //html파일에선 import부터 하고 img파일을 사용할 수 있다.
import { useState } from 'react';
import data from './data.js';

function App() {

  let [shoes] = useState(data)
  let [imgs] = useState([])
  
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" className='title'><img id='icon' src = {process.env.PUBLIC_URL + './imgs/raccoon.png'}></img> 너굴몰</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className='main-bg'></div>
      <div>
        <Container>
          <Row>
            {
              shoes.map((a,i)=>{
                return(
                  <Content title={shoes[i].title} content={shoes[i].content} price={shoes[i].price} />
                )
              })
            }
          </Row>
        </Container>
      </div>
      <br/><Button variant="outline-dark">Dark</Button>
      <Button variant="outline-secondary">Secondary</Button>
    </div>
  );
}

function Content(props){
  return (
    <Col>
      <img src={process.env.PUBLIC_URL + '/imgs/raccoon.png'} width="80%"/>
      <h4>{props.title}</h4>
      <p>{props.content}</p>
      <p>{props.price}원</p>
    </Col>
  )
}

export default App;
