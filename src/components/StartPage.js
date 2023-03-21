import React from 'react';

export default function StartPage(props) {
    const [categories, setCategories] = React.useState([{
        id: 99,
        name: 'Any Category',
    }]);
    
    React.useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
        .then(res => res.json())
        .then(data => data.trivia_categories)
        .then(data => setCategories(() => {
            // api does not have an any category id so made a custom one
            return(
                [{id: 99, name: 'Any Category'}, ...data]
            )
        }))
    }, [])

    const options = categories.map(category => {
        return(
            <option
                key={category.id}
                value={category.id}
            >
                {category.name.includes(':') ? category.name.split(':')[1].trim() : category.name}
            </option>
        )
    })

    return(
        <div className='start-page'>
            <div>
                <h1>Quizzical</h1>
            </div>
            
            <form onSubmit={props.onSubmit}>
                <div>
                    <input type='number' required min='1' max={props.maxQuestions} value={props.api.numQuestions} name='numQuestions' onChange={props.onChange} className='number'></input>
                    <select name='category' value={props.api.category} onChange={props.onChange}>
                        {options}
                    </select>
                </div>
                <button>Start quiz</button>
            </form>
        </div>
    )
}