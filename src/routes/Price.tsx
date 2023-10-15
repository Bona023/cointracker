import { useQuery } from "react-query";
import { ChartProps, IHistorical } from "./Chart";
import { fetchCoinHistory } from "../api";
import styled from "styled-components";

const PriceTable = styled.table`
    margin: 0 auto;
`;
const TableTitle = styled.th`
    padding: 10px 20px;
    text-align: center;
    font-size: 16px;
    &:nth-child(odd) {
        background-color: ${(props) => props.theme.tableThOdd};
    }
    &:nth-child(even) {
        background-color: ${(props) => props.theme.tableThEven};
    }
`;
const TableTd = styled.td`
    padding: 10px 20px;
    text-align: center;
    font-size: 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    &:nth-child(odd) {
        background-color: ${(props) => props.theme.tableTdOdd};
    }
    &:nth-child(even) {
        background-color: ${(props) => props.theme.tableTdEven};
    }
`;

const makeDate = (times: number) => {
    const date = new Date(times * 1000);
    const getMon = date.getMonth() + 1;
    const mon = getMon < 10 ? "0" + getMon.toString() : getMon.toString();
    const d = date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate().toString();
    const dateStr = mon + " / " + d;
    return dateStr;
};

function Price({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    return (
        <div>
            {isLoading ? (
                "Loading Price..."
            ) : (
                <PriceTable>
                    <tr>
                        <TableTitle>날 짜</TableTitle>
                        <TableTitle>시 가</TableTitle>
                        <TableTitle>최저가</TableTitle>
                        <TableTitle>최고가</TableTitle>
                        <TableTitle>종 가</TableTitle>
                    </tr>
                    {data
                        ?.map((price) => (
                            <tr>
                                <TableTd>{makeDate(price.time_close)}</TableTd>
                                <TableTd>{price.open}</TableTd>
                                <TableTd>{price.low}</TableTd>
                                <TableTd>{price.high}</TableTd>
                                <TableTd>{price.close}</TableTd>
                            </tr>
                        ))
                        .reverse()}
                </PriceTable>
            )}
        </div>
    );
}
export default Price;
