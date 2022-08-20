import { useQuery } from '@tanstack/react-query';
import EmptyCard from "./EmptyCard";

const getUser = async (user) => {
    const response = await fetch(`https://api.github.com/users/${user}`)
    return await response.json();
}

export default function DetailCard({ user }) {
    const { isLoading, isError, isSuccess, data, error } = useQuery(
        ["GET_USER", user],
        () => getUser(user)
    );

    if (isLoading) {
        return <EmptyCard text="Loading..." />
    }

    if (isError) {
        return <EmptyCard text="Error. Try again, please" />
    }

    return (
        <div className='detail'>
            <div className='left'>
                <img className='avatar'
                    src={data.avatar_url}
                    alt=""
                />
            </div>
            <div className='right'>
                <div className='title'>
                    <h2>{data.name}</h2>
                    <a href='#'>@{data.login}</a>
                </div>
                <div className='stats'>
                    <div className='item'>
                        <small>Repos {data.public_repos}</small>
                    </div>
                    <div className='item'>
                        <small>Followers {data.followers}</small>
                    </div>
                    <div className='item'>
                        <small>Following {data.following}</small>
                    </div>
                </div>

                <ul>
                    <li>
                        <i className='fas fa-map-maker-alt'></i>
                        {" "}
                        {data.location ?? "Not available"}
                    </li>
                    <li>
                        <i className='fab fa-twitter'></i>
                        {" "}
                        {data.twitter_username ?? "Not available"}
                    </li>
                    <li>
                        <i className='fas fa-link'></i>
                        {" "}
                        {data.blog.split("//")[1] ?? "Not available"}
                    </li>
                    <li>
                        <i className='fas fa-building'></i>
                        {" "}
                        {data.company ?? "Not available"}
                    </li>
                </ul>
            </div>
        </div>
    );
}