import React from 'react';
import questionLimitData from './components/questionLimits';
import StartPage from './components/StartPage';
import Quiz from './components/Quiz';

function App() {
  //using .useRef to prevent useEffect from triggering on first render
  const [ready, setReady] = React.useState(false);
  const [apiRequest, setApiRequest] = React.useState('https://opentdb.com/api.php?amount=10');
  const [api, setApi] = React.useState(
    {
      numQuestions: 10,
      category: '99',
    }
  );

  const [maxQuestions, setMaxQuestions] = React.useState(50);

  function handleChange(e) {
    const {name, value} = e.target;
    setApi(prevSettings => {
        return (
            {
                ...prevSettings,
                [name] : value
            }
        )
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    setApiRequest(buildApiRequest());
    setReady(true);
  }

  React.useEffect(() => {
    setMaxQuestions(() => {
      let max = '';
      for (let data of questionLimitData) {
        if (api.category === data.category) {
          max = data.max;
        }
      } 
      return !max ? 50 : max;
    });
  }, [api])

  function buildApiRequest() {
    if (apiRequest === '') {
      return 'https://opentdb.com/api.php?amount=10';
    }
    let category = api.category === '99' ? '' : `&category=${api.category}`;
    return `https://opentdb.com/api.php?amount=${api.numQuestions}${category}`;
  }

  function reset() {
    setReady(false);
  }

  return (
    <div className="App">
      {!ready && <StartPage onSubmit={handleSubmit} onChange={handleChange} api={api} maxQuestions={maxQuestions}/>}
      {!ready && api.numQuestions > maxQuestions && <p className='warning'>*Max questions for these settings is {maxQuestions}</p>}
      {ready && <Quiz apiRequest={apiRequest} reset={reset}/>}
    </div>
  );
}

export default App;
