import { useEffect, useState } from 'react';
import axios from 'axios';
import "./globals.css"

function App() {
  const [GitData, setGitData] = useState<User | null>(null);
  const [RepoList, setRepoList] = useState<Repository[]>([]);
  const BaseFetch = () => {
    const request = axios.create({
      baseURL: 'https://api.github.com',
    });
    request.get('/users/Tiamat-KIT').then((res) => {
      setGitData(res.data);
    });
    request.get('/users/Tiamat-KIT/repos').then((res) => {
      setRepoList(res.data as Repository[]);
    });
  };
  useEffect(() => {
    BaseFetch();
  }, []);
  return (
    <main>
      {GitData !== null && <a className='hero text-3xl font-extrabold' href={GitData!.html_url}>{GitData!.login} Repository</a>}
      <div className=' container mx-auto p-5'>
        <div className='grid grid-cols-2 gap-4'>
          {RepoList !== null &&
            RepoList.map((data, idx) => {
              return (
                <div key={idx} className='basis-1/2 bg-base-300'>
                  <div className='card'>
                    <div className='card-body'>
                      <h2 className='card-title'><a href={data.url}>{data.name}</a></h2>
                      <p>{data.description}</p>
                      <p>{data.fork && <div>フォークしたリポジトリです</div>}</p>
                      {data.topics.map((tag) => {
                        return (<p className='badge'>{tag}</p>)
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <button
          type="button"
          onClick={() => {
            /* BaseFetch(); */
            setTimeout(() => {
              console.log(GitData, RepoList);
            }, 750);
          }}
        >
          クリックで取得
        </button>
      </div>
    </main>
  );
}

export default App;
