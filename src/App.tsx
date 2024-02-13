import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [GitData, setGitData] = useState<User | null>(null);
  const [RepoList, setRepoList] = useState<Repository[]>([]);
  const [VercelResponseData,setVercelResponseData] = useState<VercelResponse | null>(null)
  const BaseFetch = () => {
    const request = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `token  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`,
      },
      responseType: 'json',
    });
    request.get('/users/Tiamat-KIT').then((res) => {
      setGitData(res.data);
    });
    request.get('/users/Tiamat-KIT/repos').then((res) => {
      setRepoList(res.data as Repository[]);
    });
    const VercelRequest = axios.create({
      baseURL: "https://api.vercel.com",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer KhczGTSGjXsYW06x3xxLA9J6`,
        },
        responseType: "json"
    })
    VercelRequest.get("/v4/aliases")
      .then(res => {
        setVercelResponseData(res.data)

      })
      if(typeof window !== "undefined"){
        const segmenter = new Intl.Segmenter("en", { granularity: "word" });
        const RepoNames = RepoList.map((data) => data.name)
        RepoNames.forEach((data) => console.log([...segmenter.segment(data)]))
      }
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
                  <div key={idx} className='card basis-1/2 bg-base-300'>
                    <div className='card-body'>
                      <h2 className='card-title'><a href={data.url}>{data.name}</a></h2>
                      <p>{data.description}</p>
                      <p>{data.fork && "フォークしたリポジトリです"}</p>
                      {data.topics.map((tag,badgeIdx) => {
                        return (<p key={badgeIdx} className='badge'>{tag}</p>)
                      })}
                    </div>
                  </div>
              );
            })}
        </div>
        
        {VercelResponseData !== null && <a className='hero text-3xl font-extrabold'>Tiamat-KIT Vercel Projects</a>}
        <div className='grid grid-cols-2 gap-4'>
          {VercelResponseData !== null &&
            VercelResponseData.aliases.map((data, idx) => {
              return (
                <div key={idx} className='basis-1/2 bg-base-300'>
                  <div className='card'>
                    <div className='card-body'>
                      <h2 className='card-title'><a href={data.deployment.url}>{data.alias}</a></h2>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
}

export default App;
