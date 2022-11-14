import config from '../config.json'
import styled from 'styled-components'
import StyledMenu from '../src/components/Menu/StyledMenu'
import { StyledTimeline } from '../src/components/StyledTimeline'
import { useEffect, useState } from 'react'
import videoService from '../src/Services/videoService'

function HomePage() {

    const service = videoService()

    const [valorDoFiltro, setvalorDoFiltro] = useState("")

    const [playlists, setPlaylists] = useState({})

    useEffect(() => {
        service.getAllvideos().then((dados) => {
            console.log(dados.data)
            const novaPlaylist = { ...playlists }
            dados.data.map((video) => {
                if (!novaPlaylist[video.playlist]) novaPlaylist[video.playlist] = []
                novaPlaylist[video.playlist]?.push(video)
            })
            setPlaylists(novaPlaylist)
        })
    }, [])

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <StyledMenu valorDoFiltro={valorDoFiltro} setvalorDoFiltro={setvalorDoFiltro} />
                <Header />
                <TimeLine searchValue={valorDoFiltro} playlists={playlists} />
            </div>
        </>
    )
}

export default HomePage


function Header() {

    const StyledBanner = styled.div`
        height: 230px;
        background-image: url(${({ banner }) => banner});
        /* background-image: url(${config.banner}) */
    `

    const StyledHeader = styled.div`

        background-color: ${({ theme }) => theme.backgroundLevel1};

        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
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
            <StyledBanner banner={config.banner} />
            <section className='user-info'>
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>{config.nome}</h2>
                    <p>{config.job}</p>
                </div>
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
                        <section key={playListName}>
                            <h2>{playListName}</h2>
                            <div>
                                {
                                    videos.filter(
                                        (video) => {
                                            const titleNormalize = video.title.toLowerCase() //colocar todas as letras minusculas
                                            return titleNormalize.includes(props.searchValue) //retorna so os videos que possui no titulo as letras especificas
                                        }
                                    ).map((video) => {
                                        return (
                                            <a key={video.url} href={video.url}>
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