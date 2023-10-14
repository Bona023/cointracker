import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface ChartProps {
    coinId: string;
}
interface IHistorical {
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
                    type="line"
                    series={[
                        {
                            name: "sales",
                            data: data?.map((price) => parseFloat(price.close)) ?? [],
                        },
                    ]}
                    options={{
                        theme: { mode: isDark ? "dark" : "light" },
                        chart: {
                            height: 500,
                            width: 500,
                            toolbar: { show: false },
                            background: "f000",
                        },
                        yaxis: { labels: { show: false }, axisBorder: { show: false } },
                        xaxis: {
                            type: "datetime",
                            axisTicks: { show: false },
                            labels: { show: false },
                            categories: data?.map((price) => new Date(price.time_close * 1000).toISOString()),
                        },
                        grid: { show: false },
                        stroke: { curve: "smooth", width: 3 },
                        fill: { type: "gradient", gradient: { gradientToColors: ["#7d5fff"], stops: [0, 100] } },
                        colors: ["#ff4d4d"],
                        tooltip: {
                            y: {
                                formatter: (value) => `$ ${value.toFixed(2)}`,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}
export default Chart;
