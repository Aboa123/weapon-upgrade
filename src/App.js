import './App.css';
import { useState,useEffect } from 'react';
import {Data} from './data';
import {LangSet, Translate} from './lang';

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
                    alert(`${Translate('insufficient')}`)
                }
                else
                {
                    setMoney(money-Data[weapon].upPrice)
                    setUseMoney(useMoney+Data[weapon].upPrice)
                    if(Math.floor(Math.random()*100)<=Data[weapon].upPercent)
                    {
                        setWeapon(weapon+1)
                        setUpgrageCheck(`${Translate('success')}`)
                    }
                    else
                    {
                        if(Math.floor(Math.random()*100)<=Data[weapon].downPercent)
                        {
                            if(Math.floor(Math.random()*100)<=Data[weapon].desPercent)
                            {
                                setWeapon(0)
                                setUpgrageCheck(`${Translate('fail')} ${Translate('des_message')}`)
                            }
                            else
                            {
                                setWeapon(weapon-1)
                                setUpgrageCheck(`${Translate('fail')} ${Translate('down_message')}`)
                            }
                        }
                        else
                        {
                            setUpgrageCheck(`${Translate('fail')}`)
                        }
                    }
                }
            }
            else
            {
                alert(`${Translate('final_upgrade')}`)
            }
        } catch(e) {
            alert(`${Translate('error')}`)
        }
    }

    const sell = () => {
        setWeapon(0)
        setMoney(money+Data[weapon].price)
    }

    const clear = () => {
        if(money >= 50000000 && weapon >= 20)
        {
            alert(`${Translate('clear_message')}`)
        }
        else
        {
            alert(`${Translate('clear_fail_message')}`)
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
    });

    return (
        <div className="App">
            <div className="upgrade-panel">
                <div className="my-info">
                    <a className="git-info" href="https://github.com/Aboa123/weapon-upgrade" target="blank">GitHub</a><br/>
                    <span className="discord-info">Discord : Aboa#9076</span><br/>
                    <span className="lang-info" onClick={()=>{LangSet('kr')}}>KR</span>
                    <span className="lang-info" onClick={()=>{LangSet('en')}}>EN</span>
                    <span className="lang-info" onClick={()=>{LangSet('jp')}}>JP</span>
                </div>
                <p style={{color:"red"}}><b>{Translate("refresh_warning")}</b></p>
                <p><b>- {Translate("clear_terms")} -</b></p>
                <p><b>{Translate("clear_terms_detail")}</b></p>
                <div>
                    <input className="clear-btn btn" type="button" onClick={()=>clear()} value={`${Translate('clear')}`}/>
                    <input className="upgrade-btn btn" type="button" onClick={()=>up()} value={`${Translate('upgrade')}`}/>
                    <input className="sell-btn btn" type="button" onClick={()=>sell()} value={`${Translate('sell')}`}/>
                </div>
                <div>
                    {Translate("my_gold")} : {money.toLocaleString("ko-KR")} {Translate("gold")}<br/>
                    {Translate("total_use_gold")} : {useMoney.toLocaleString("ko-KR")} {Translate("gold")}<br/>
                    {minutes} {Translate("minute")} {seconds} {Translate("second")}<br/>
                    {upgradeCheck}<br/>
                    <b>{weapon}{Translate("upgrade_count")}</b><br/>
                    <img style={{maxWidth:"400px",height:"400px",objectFit:"contain"}} src={Data[weapon].url}/><br/>
                    {Translate("sell_price")} : {Data[weapon].price.toLocaleString("ko-KR")} {Translate("gold")}<br/>
                    {Translate("up_price")} : {Data[weapon].upPrice.toLocaleString("ko-KR")} {Translate("gold")}<br/>
                    {Translate("up_percent")} : {Data[weapon].upPercent}%<br/>
                    {Translate("down_percent")} : {Data[weapon].downPercent}%<br/>
                    {Translate("des_percent")} : {Data[weapon].desPercent}%<br/>
                </div>
            </div>
            <div className="upgrade-table">
                <h1><b>- {Translate("percent_table")} -</b></h1>
                <div className="upgrade-table-box">
                    {Data.map((item)=>
                        <div className="upgrade-table-box-info">
                            <b>{Translate("upgrade_value")} : {item.value}{Translate("upgrade_count")}</b><br/>
                            {Translate("sell_price")} : <b>{item.price.toLocaleString("ko-KR")}</b> {Translate("gold")}<br/>
                            {Translate("up_price")} : <b>{item.upPrice.toLocaleString("ko-KR")}</b> {Translate("gold")}<br/>
                            {Translate("up_percent")} : <b>{item.upPercent}%</b><br/>
                            {Translate("down_percent")} : <b>{item.downPercent}%</b><br/>
                            {Translate("des_percent")} : <b>{item.desPercent}%</b><br/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;