import React from "react";
import Video from '../Video/Video';
import { KEYS } from '../keys';
import { ratesArr } from "../rates";

type IState = {
    isLoading: boolean;
    currentRate: string | null;
}

class Layout extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            isLoading: false,
            currentRate: null,
        }
    }

    componentDidMount(): void {
        this.getData()
    }

    getData = () => {
        const headers = new Headers();
        headers.append("apikey", KEYS.exchange);

        const requestOptions = {
            method: 'GET',
            headers,
        };
        const { currentRate } = this.state;

        // fetch("https://api.apilayer.com/exchangerates_data/2022-11-17?symbols=&base=currentRate", requestOptions)
        //     .then(response => response.json())
        //     .then(result => {
        //         localStorage.setItem("rates", JSON.stringify(result))
        //     })
        //     .catch(error => console.log('error', error));
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

    selectRateFrom = (e: any): void => {
        const {value} = e.currentTarget;
        this.setState({ currentRate: value })
    }
    selectRateTo = (e: any): void => {

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
                        <select id="ratesFrom" name="rates" onChange={this.selectRateFrom}>
                            {this.renderSelectForm()}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="ratesTo">Select rate you want to exchange:</label>
                        <select id="ratesTo" name="rates" onChange={this.selectRateTo}>
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