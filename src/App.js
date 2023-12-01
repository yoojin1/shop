import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'; 

import data from './data.js';
import Detail from './routes/detail.js';

function App() {

  let [shoes] = useState(data)
  let [imgs] = useState(['black_white.png', 'red.png', 'grey.png'])
  let navigate = useNavigate();
  
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" className='title'><img id='icon' src = {process.env.PUBLIC_URL + './imgs/raccoon.png'}></img> 너굴몰</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/'); }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail'); }}>Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      

      <Routes>
        <Route path='/' element={
          <Home shoes={shoes} imgs={imgs}/>
        }/>
        <Route path='/detail' element={ <Detail/ >} />
        <Route path='/event' element={ <About/> }> 
          <Route path='one' element={ <div>첫 주문시 양배추즙 서비스</div> }/>
          <Route path='two' element={ <div>생일기념 쿠폰받기</div> }/>
        </Route>
        <Route path='*' element={ <div>없는페이지</div> }/>
      </Routes>
      
      <br/><Button variant="outline-dark">Dark</Button>
      <Button variant="outline-secondary">Secondary</Button>
    </div>
  );
}

function About(){
  return(
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet>nested routes의 element 보여주는 곳</Outlet>
    </div>
  )
}

function Home(props){
  return(
    <div>
      <div><img className='main-bg' src={process.env.PUBLIC_URL + './imgs/shoes.png'}/></div>
      
      <Container>
        <Row>
          {
            props.shoes.map((a,i)=>{
              return(
                <Content title={props.shoes[i].title} content={props.shoes[i].content} price={props.shoes[i].price} imgs={props.imgs[i]}/>
              )
            })
          }
        </Row>
      </Container>
    </div>
  )
}

function Content(props){
  return (
    <Col>
      <img src={process.env.PUBLIC_URL + './imgs/' + props.imgs} width="80%"/>
      <h4>{props.title}</h4>
      <p>{props.content}</p>
      <p>{props.price}원</p>
    </Col>
  )
}

export default App;
