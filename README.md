#  MINISWEEPER-API


Minesweeper API 


## Usage

**Start Game**
----
  Returns json with number of rows and col that matrix will have and start time, Using level (mid, pro). The default level is beginner.

* **URL**

  /start?level=mid

* **Method:**

  `GET`
  
*  **QUERY Params**
 
   `level=[string]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    id: "5bb6c94101af8b07163b246b",
    col: 10,
    row: 10,
    startTime: "2018-10-05T02:15:29.000Z"
  }`
 


**Open Cell**
----
  Returns json data about the position open.

* **URL**

  /open

* **Method:**

  `POST`
  
* **Data Params** `
  {
	col:1,
	row:2,
	id: '5bb6c94101af8b07163b246b'
  }
`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ value : 2, message: 'Keep going!' }`

  OR

  * **Code:** 200 <br />
    **Content:** `{
    value: 0,
    message: "Game Over ",
    game: {
        play: [
            [1,1,1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,0,1,1],
            [0,1,1,1,1,0,1,1,1,1],
            [1,1,1,1,1,1,1,1,0,1],
            [0,1,1,1,1,1,1,1,1,1],
            [1,1,0,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1]
        ],
        isOver: true,
        pause: false,
        _id  "5bb6e6f99cf2e61b7857596d",
        row: 10,
        col: 10,
        startTime: "2018-10-05T04:22:17.000Z",
        __v: 0,
        endTime: "2018-10-05T04:24:19.000Z"
    }

}`

 
* **Error Response:**

  * **Code:** 500 Error server <br />
    **Content:** `{ message: 'Should specify row and column where to play'}`





**Flag Cell**
----
  Returns json data about a cell flag with  (?) .

* **URL**

  /flag/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**
  `{ row : 12, col : 12}`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ row : 12, col : 12, value: '?'}`
