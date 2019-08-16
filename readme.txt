**************************************
DOCUMENTATION
**************************************

____________________________
----------------------------
MOODCAFE NODE.js Assignment
Yash Singhal NJ541
____________________________
----------------------------

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
IMPORTANT-> 
.env file consist:
    TOKEN_SECRET
    DB_CONNECT: Please sepicify your own DB url
-----------------------------------------

Api
****************************************************************
1) Register Api (POST)
    Route: /moodcafe/register
    User must register itself first, by sending folowing in body
    name
    email
    password

2) Login Api (POST)
    Route: /moodcafe/login
    User must Login if already registered first, by sending folowing in body
    email
    password

3) AddBook api (POST)
    Route: /moodcafe/user/addbook
    This api to add book into database, by sending folowing in body
    title
    description
    price
	quantity

4) PurchaseBook api (GET)
    Route: /moodcafe/user/purchase/:bookname

5) SellBook api (GET)
    Route: /moodcafe/user/sellbook/:bookname?quantity=<number>

________________________________________________
------------------------------------------------
Git repo: https://github.com/ysinghal22/moodcafe
