import Video from '../Video/Video';
import React from "react";
import { KEYS } from '../keys';
import { ratesArr } from "../rates";
import moment from "moment";

type IState = {
    isLoading: boolean;
    currentRate: string | null;
    rateTo: string | null;
}

class Layout extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            isLoading: false,
            currentRate: null,
            rateTo: null,
        }
    }

    componentDidMount(): void {
        // this.getData()
    }

    getData = () => {
        const { currentRate, rateTo } = this.state;
        if (!currentRate || !rateTo)
            return null;
        
        const headers = new Headers();
        let isActualDate: boolean = false;
        const lsRate = this.getLsData();
        const date = new Date();
        const currentDate = moment(date).format("YYYY-MM-DD");
        
        if (lsRate) {
            isActualDate = lsRate.date === currentDate;
        }
        if (isActualDate) {
            this.setState({ isLoading: true });
            return lsRate.rates;
        }
        
        headers.append("apikey", KEYS.exchange);
        const requestOptions = {
            method: 'GET',
            headers,
        };

        fetch(`https://api.apilayer.com/exchangerates_data/${currentDate}?symbols=&base=${currentRate}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                localStorage.setItem("rates", JSON.stringify(result));
                this.setState({ isLoading: true });
            })
            .catch(error => console.log('error', error));
    }

    getLsData = () => {
        const data = localStorage.getItem("rates");
        if (!data)
            return null;

        return JSON.parse(data);
    }

    renderSelectForm = () => {
        return ratesArr.map((e, key) => {
            return <option 
                key={key} 
                value={e.name}
                disabled={e.disabled}
                selected={e?.selected}
            >{e.name}</option>;
        })
    }

    selectCurrency = (e: any, currency: string): void => {
        const {value} = e.currentTarget;
        currency === 'currentRate' 
            ? this.setState({ currentRate: value }, () => {this.getData()})
            : this.setState({ rateTo: value }, this.getData);
    }

    render() {
        const { isLoading } = this.state;

        // if (!isLoading)
        //     return <h1>Loading...</h1>

        return (
            <>
                <form>
                    <div>
                        <label htmlFor="ratesFrom">Select your current rate:</label>
                        <select id="ratesFrom" name="rates" onChange={(e) => {this.selectCurrency(e, 'currentRate')}}>
                            {this.renderSelectForm()}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="ratesTo">Select rate you want to exchange:</label>
                        <select id="ratesTo" name="rates" onChange={(e) => {this.selectCurrency(e, 'rateTo')}}>
                            {this.renderSelectForm()}
                        </select>
                    </div>
                </form>
                {isLoading && <Video />}
            </>
        )
    }
}

export default Layout;