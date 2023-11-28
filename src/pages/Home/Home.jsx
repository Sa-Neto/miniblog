import { Link } from 'react-router-dom'
import styles from './Home.module.css'

import React, { useState } from 'react'

function Home() {
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState([])

  const handleSubmit = async() => {

  }
  return (
    <div>
      <h1>Veja os nosso posts mais recentes</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Ou busque por tags...'
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className='btn btn-dark'>Pesquisar</button>
      </form>
      <div>
        <h1>Posts...</h1>
        {posts && posts.length === 0 &&(
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className='btn'>Criar primeiro projeto</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home