import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atom";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.titleColor};
`;
export const BtnBar = styled.div`
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const ModeBtn = styled.button`
    margin-left: 330px;
    font-size: 18px;
    color: ${(props) => props.theme.reverseText};
    background-color: ${(props) => props.theme.reverseBg};
    padding: 5px 10px;
    border-radius: 18px;
    &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.cardBgColor};
    }
`;
const CoinsList = styled.ul``;
const CoinCard = styled.li`
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 15px;
    border: 1px solid ${(props) => props.theme.bgColor};
    font-size: 18px;
    font-weight: 700;
    a {
        transition: color 0.3s ease-in;
        display: flex;
        align-items: center;
        padding: 20px;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;
const Rank = styled.div`
    text-align: center;
    line-height: 1.2;
    margin-right: 20px;
`;
const Loader = styled.span`
    text-align: center;
    font-size: 30px;
    display: block;
    margin-top: 30px;
`;
const CoinImg = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;
interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

function Home() {
    const [isDark, setIsDark] = useRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setIsDark((prev) => !prev);
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    return (
        <Container>
            <Helmet>
                <title>Coins</title>
            </Helmet>
            <BtnBar>
                <ModeBtn onClick={toggleDarkAtom}>{isDark ? <span>🌞 Light</span> : <span>🌙 Dark</span>}</ModeBtn>
            </BtnBar>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map((coin) => (
                        <CoinCard key={coin.id}>
                            <Link
                                to={{
                                    pathname: `/${coin.id}`,
                                    state: { name: coin.name },
                                }}
                            >
                                <Rank>
                                    Rank
                                    <br />
                                    {coin.rank}
                                </Rank>
                                <CoinImg src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                {coin.name}&nbsp;&nbsp;&rarr;
                            </Link>
                        </CoinCard>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
}
export default Home;
