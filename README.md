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
 
