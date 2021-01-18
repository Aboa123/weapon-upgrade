import './App.css';
import { useState } from 'react';
import {Data} from './data';

const App = () => {
    const [weapon,setWeapon] = useState(0);
    const [money,setMoney] = useState(1000000); 
    const [upgradeCheck,setUpgrageCheck] = useState("");

    const up = () => {
        try {
            if(weapon < 20)
            {
                if(money < Data[weapon].upPrice)
                {
                    alert("강화비용이 부족합니다.")
                }
                else
                {
                    setMoney(money-Data[weapon].upPrice)
                    if(Math.floor(Math.random()*100)<=Data[weapon].upPercent)
                    {
                        setWeapon(weapon+1)
                        setUpgrageCheck("성공!")
                    }
                    else
                    {
                        if(Math.floor(Math.random()*100)<=Data[weapon].downPercent)
                        {
                            if(Math.floor(Math.random()*100)<=Data[weapon].desPercent)
                            {
                                setWeapon(0)
                                setUpgrageCheck("실패! 장비가 파괴되었습니다.")
                            }
                            else
                            {
                                setWeapon(weapon-1)
                                setUpgrageCheck("실패! 장비등급이 하락되었습니다.")
                            }
                        }
                        else
                        {
                            setUpgrageCheck("실패!")
                        }
                    }
                }
            }
            else
            {
                alert("최종강화단계입니다.")
            }
        } catch(e) {
            alert("오류가 발생했어요! 천천히 눌러주세요!")
        }
    }

    const sell = () => {
        setWeapon(0)
        setMoney(money+Data[weapon].price)
    }

    const clear = () => {
        if(money >= 50000000 && weapon >= 20)
        {
            alert("클리어를 축하드립니다.")
        }
        else
        {
            alert("골드가 부족합니다.")
        }
    }

    return (
        <div className="App">
            <div>
                <p style={{color:"red"}}>새로고침 시 초기화</p>
                <p><b>- 클리어 조건 -</b></p>
                <p><b>50,000,000골드와 20강무기</b></p>
                <input type="button" onClick={()=>clear()} value="클리어"/>
                <input type="button" onClick={()=>up()} value="업그레이드"/>
                <input type="button" onClick={()=>sell()} value="판매"/>
                <p>소지 골드 : {money.toLocaleString("ko-KR")}골드</p>
                <p>{upgradeCheck}</p>
                <p><b>{weapon+"강"}</b></p>
                <img style={{maxWidth:"400px",maxHeight:"400px",objectFit:"contain"}} src={Data[weapon].url}/><br/>
                <p>판매가격 : {Data[weapon].price.toLocaleString("ko-KR")}원</p>
                <p>강화비용 : {Data[weapon].upPrice.toLocaleString("ko-KR")}원</p>
                <p>강화성공확률 : {Data[weapon].upPercent}%</p>
                <p>강화실패시 등급하락 확률 : {Data[weapon].downPercent}%</p>
                <p>강화실패시 파괴확률 : {Data[weapon].desPercent}%</p>
            </div>
            <div>
                <h1><b>- 강화 확률표 -</b></h1>
                {Data.map((item)=>
                    <div style={{textAlign:"left",border:"1px solid black"}}>
                        <p><b>강화단계 : {item.value}강</b></p>
                        <p>강화비용 : <b>{item.upPrice.toLocaleString("ko-KR")}</b>골드</p>
                        <p>판매가격 : <b>{item.price.toLocaleString("ko-KR")}</b>골드</p>
                        <p>강화성공확률 : <b>{item.upPercent}%</b></p>
                        <p>강화실패시 등급하락 확률 : <b>{item.downPercent}%</b></p>
                        <p>강화실패시 파괴확률 : <b>{item.desPercent}%</b></p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;