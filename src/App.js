import './App.css';
import { useState,useEffect } from 'react';
import {Data} from './data';

const App = () => {
    const [weapon,setWeapon] = useState(0);
    const [money,setMoney] = useState(1000000); 
    const [useMoney,setUseMoney] = useState(0); 
    const [upgradeCheck,setUpgrageCheck] = useState("");
    const [seconds,setSeconds] = useState(0);
    const [minutes,setMinutes] = useState(0);

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
                    setUseMoney(useMoney+Data[weapon].upPrice)
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
            alert("조건에 충족되지 않았습니다.")
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(seconds+1)
            if(seconds >= 59)
            {
                setMinutes(minutes+1)
                setSeconds(0)
            }
        }, 1000);
        return () => clearInterval(timer);
      }, [minutes, seconds]);

    return (
        <div className="App">
            <div className="upgrade-table">
                <h1><b>- 강화 확률표 -</b></h1>
                <div className="upgrade-table-box">
                    {Data.map((item)=>
                        <div className="upgrade-table-box-info">
                            <b>강화단계 : {item.value}강</b><br/>
                            강화비용 : <b>{item.upPrice.toLocaleString("ko-KR")}</b>골드<br/>
                            판매가격 : <b>{item.price.toLocaleString("ko-KR")}</b>골드<br/>
                            강화성공확률 : <b>{item.upPercent}%</b><br/>
                            강화실패시 등급하락 확률 : <b>{item.downPercent}%</b><br/>
                            강화실패시 파괴확률 : <b>{item.desPercent}%</b><br/>
                        </div>
                    )}
                </div>
            </div>
            <div className="upgrade-panel">
                <p style={{color:"red"}}><b>새로고침 시 초기화</b></p>
                <p><b>- 클리어 조건 -</b></p>
                <p><b>50,000,000골드와 20강무기</b></p>
                <div>
                    <input className="clear-btn btn" type="button" onClick={()=>clear()} value="클리어"/>
                    <input className="upgrade-btn btn" type="button" onClick={()=>up()} value="업그레이드"/>
                    <input className="sell-btn btn" type="button" onClick={()=>sell()} value="판매"/>
                </div>
                <div>
                    소지 골드 : {money.toLocaleString("ko-KR")}골드<br/>
                    총 사용 골드 : {useMoney.toLocaleString("ko-KR")}골드<br/>
                    {minutes}분 {seconds}초 경과<br/>
                    {upgradeCheck}<br/>
                    <b>{weapon+"강"}</b><br/>
                    <img style={{maxWidth:"400px",maxHeight:"400px",objectFit:"contain"}} src={Data[weapon].url}/><br/>
                    판매가격 : {Data[weapon].price.toLocaleString("ko-KR")}원<br/>
                    강화비용 : {Data[weapon].upPrice.toLocaleString("ko-KR")}원<br/>
                    강화성공확률 : {Data[weapon].upPercent}%<br/>
                    강화실패시 등급하락 확률 : {Data[weapon].downPercent}%<br/>
                    강화실패시 파괴확률 : {Data[weapon].desPercent}%<br/>
                </div>
            </div>
        </div>
    );
}

export default App;