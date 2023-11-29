import React from 'react'
import { useQuery } from '../../hooks/ useQuery'
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { Link } from 'react-router-dom';
import PostDetail from '../../componets/PostDetail';
import styles from './Search.module.css'
const Search = () => {
    const query = useQuery();
    const search = query.get('q');
    
    const {documents: posts} = useFetchDocuments('posts',search);
    console.log(posts)
    return (
        <div className={styles.search_container}>
            <h2>Search</h2>
            <div>
                {posts && posts.length === 0 &&(
                    <div className={styles.nopost}>
                    <p>Não foram encontrados posts a partir da sua busca...</p>
                    <Link className='btn btn-dark' to="/">Voltar</Link>
                    </div>
                )}
                {posts && posts.map((post) => <PostDetail key={post.id} post={post}/>)}
            </div>
        </div>
    )
}

export default Search