import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

export interface ChartProps {
    coinId: string;
}
export interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

function Chart({ coinId }: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    return (
        <div>
            {isLoading ? (
                "Loading chart..."
            ) : (
                <ReactApexChart
                    type="candlestick"
                    series={[
                        {
                            data:
                                data?.map((price) => {
                                    return {
                                        x: price.time_close * 1000,
                                        y: [price.open, price.high, price.low, price.close],
                                    };
                                }) ?? [],
                        },
                    ]}
                    options={{
                        theme: {
                            mode: isDark ? "dark" : "light",
                        },
                        chart: {
                            background: "none",
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                        },
                        yaxis: {
                            labels: {
                                show: false,
                            },
                        },
                        xaxis: {
                            type: "datetime",
                            labels: {
                                format: "dd'MMM",
                            },
                        },
                        grid: {
                            show: false,
                        },
                        tooltip: {
                            x: {
                                format: "dd MMM",
                            },
                        },
                        plotOptions: {
                            candlestick: {
                                colors: {
                                    upward: "#FC427B",
                                    downward: "#1B9CFC",
                                },
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}
export default Chart;
