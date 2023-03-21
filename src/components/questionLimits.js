/* 
    the api for category question limits by difficulty can only be accessed
    through fetching by specific category id. not very accessible so I opted
    to recreate that data here for the categories with less than 50 max questions
*/

const data = [
    {
        category: '13',
        max: 31
    },
    {
        category: '25',
        max: 29
    },
    {
        category: '30',
        max: 24
        
    }
]

export default data;