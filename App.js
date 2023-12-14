import { Button, Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'; 
import axios from 'axios'

import data from './data.js'
import Detail from './routes/Detail.js'
import Cart from './routes/Cart.js'

function App() {
  let [shoes,setShoes] = useState(data)
  let navigate = useNavigate();
  let [click,setClick] = useState(2);
  let [loading, setLoading] = useState(false);

  function Sort(){
    let copy = [...shoes];
    copy = copy.sort((a,b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1:1);
    setShoes(copy);
  }
  
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" className='title'><img id='icon' src = {process.env.PUBLIC_URL + '/imgs/raccoon.png'}></img> 너굴몰</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/'); }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail'); }}>Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  
      <Routes>
        <Route path='/' element={
          <Home shoes={shoes}/>
        }/>
        <Route path='/detail/:id' element={ <Detail shoes = { shoes } />} />
        <Route path='/cart' element={ <Cart/> } />
        <Route path='/event' element={ <About/> }> 
          <Route path='one' element={ <div>첫 주문시 양배추즙 서비스</div> }/>
          <Route path='two' element={ <div>생일기념 쿠폰받기</div> }/>
        </Route>
        <Route path='*' element={ <div>없는페이지</div> }/>
      </Routes>

      {
        loading === true ? <Loading/> : null
      }

      <br/><Button variant="outline-dark" onClick={(e) => {
        setLoading(true);
        setClick(click+1);

        if(click > 3) {
          alert("더이상 상품이 없습니다.");
          setLoading(false);
        }
        axios.get(`https://codingapple1.github.io/shop/data${click}.json`)
        
        .then((d)=>{ 
          let copy = [...shoes, ...d.data];
          setShoes(copy);
         })

        .catch(()=> setLoading(false))

        .finally(() => setLoading(false));
      } } >더보기</Button>
      <br/><br/><Button variant="outline-dark" onClick={ Sort } >정렬</Button>
    </div>

    
  );
}

function Loading() {
  return(
    <div>
      <br/>
      <h3>Loading..</h3>
      <img src={process.env.PUBLIC_URL+'/imgs/loading3.gif'} alt='loading'/>
    </div>
  )
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
      <img className='main-bg' src={process.env.PUBLIC_URL + '/imgs/shoes.png'}/>
      <Container>
        <Row>
          {
            props.shoes.map((a,i)=>{
              return(
                <Content title={props.shoes[i].title} content={props.shoes[i].content} price={props.shoes[i].price} id={props.shoes[i].id} />
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
    <Col md={4}>
      <img className='img' src={process.env.PUBLIC_URL + './imgs/'+'img'+props.id+'.png'} width="80%" height="65%" />
      <h4>{props.title}</h4>
      <p>{props.content}</p>
      <p>{props.price}원</p>
    </Col>
  )
}

export default App;
