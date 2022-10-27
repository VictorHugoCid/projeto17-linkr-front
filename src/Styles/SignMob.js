import styled from "styled-components";


export default function SignMob(){
    return(
        <MobLogo>
            <LogoBox>
                <h1>Linkr</h1>
                <p>save, share and discover the best links on the web</p>
            </LogoBox>
        </MobLogo>
    )
}

const MobLogo = styled.div`
    width: 100%;
    height: 175px;
    background-color: #151515;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const LogoBox = styled.div`
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1{
        font-family: 'Passion One';
        font-weight: 700;
        font-size: 76px;
        color: #FFFFFF;
    }
    p{
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 23px;
        text-align: center;
        color: #FFFFFF;
    }
`;