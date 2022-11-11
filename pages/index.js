import config from '../config.json'
import styled from 'styled-components'
import StyledMenu from '../src/components/StyledMenu'
import { StyledTimeline } from '../src/components/StyledTimeline'
import { CSSReset } from '../src/components/CSSReset'

function HomePage() {

    // const estiloHomePage = { background: 'red' }

    return (
        <div>
            <StyledMenu />
            <Header />
            <TimeLine playlists={config.playlists} />
        </div>
    )
}

export default HomePage


function Header() {

    const StyledHeader = styled.div`
        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-top: 50px;
        }
        .user-info {
            display: flex;
            align-items: center;
            width: 16px;
            padding: 16px 32px;
            gap: 16px;
        }
    `;

    return (
        <StyledHeader>
            {/* <img src="banner" /> */}
            <section className='user-info'>
                <img src={`https://github.com/${config.github}.png`} />
                <h2>{config.nome}</h2>
                <p>{config.job}</p>
            </section>
        </StyledHeader>
    )
}

function TimeLine(props) {

    const playListNames = Object.keys(props.playlists)

    return (
        <StyledTimeline>
            {playListNames.map(
                (playListName) => {
                    const videos = props.playlists[playListName]
                    return (
                        <section>
                            <h2>{playListName}</h2>
                            <div>
                                {
                                    videos.map((video) => {
                                        return (
                                            <a href={video.url}>
                                                <img src={video.thumb}></img>
                                                <span>{video.title}</span>
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </section>
                    )
                }
            )}
        </StyledTimeline>
    )
}