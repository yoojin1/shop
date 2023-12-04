import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import imgs1 from "../image/black_white.png";

function Detail(props){

    useEffect(()=>{ //html로딩 먼저하고 나서 실행. (어려운 연산/서버에서 데이터 가져옴 / 타이머 등에 사용)
        setTimeout(()=>{ setTf(false) }, 2000)

        return ()=>{
            
        }
    }, []) //mount할때만(1회만) 실행

    let[count, setCount]=useState(0)
    let[tf, setTf] = useState(true);
    let {id} = useParams();
    let findId = props.shoes.findIndex((v)=> v.id == id)

    return(
        <div className="container">
        {
            tf === true ?
            (<div className="alert alert-warning">
            2초이내 구매시 할인
            </div>) 
            :null
        }
            {count}
        <div className="row">
            <div className="col-md-6">
            <img src={imgs1} width="100%" />
            </div>
            <div className="col-md-6">
            <h4 className="pt-5">{props.shoes[findId].title}</h4>
            <p>{props.shoes[findId].content}</p>
            <p>{ props.shoes[findId].price }원</p>
            <button className="btn btn-danger" onClick={()=> {setCount(count+1)} } >주문하기</button> 
            </div>
        </div>
        </div> 
    )
}

export default Detail;