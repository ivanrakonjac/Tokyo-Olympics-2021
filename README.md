# Tokyo-Olympics-2021

Application for organizing and monitoring competitions and competitors for the summer 2021 Tokyo Olympic Games. The app is developed in MEAN stack. Realization includes implementation of both frontend and backend. The app has three roles and details about all requirements you could find in the Project text document.

-----------
Index


![index1](https://user-images.githubusercontent.com/49063097/140609888-9f26124a-f636-43ff-b512-16ba0b777129.jpg)

![index2](https://user-images.githubusercontent.com/49063097/140609911-97cf64a6-8422-457e-b6d9-b725841fdc4c.jpg)

-----------
Admin page


![admin1](https://user-images.githubusercontent.com/49063097/140609932-53d801e1-3e7c-4dd8-9196-6eac858bf89c.jpg)

-----------
Delegate


![delegat1](https://user-images.githubusercontent.com/49063097/140609950-f48e3eed-f147-4d86-81dc-4767a3a86fe8.jpg)

![delega2](https://user-images.githubusercontent.com/49063097/140609969-33958a99-8dcd-4519-ba1f-85a08537493e.jpg)

-----------
Team leader 


![Vodja](https://user-images.githubusercontent.com/49063097/140609981-1b29ac87-74d3-4522-ae68-1fd16a3560d6.jpg)

-----------
Instructions


1. Instalirati node.js

2. FRONTEND
 - instalacija angulara
	npm install @angular/cli
 - kreiranje projekta
	ng new imeProjekta
	
	routing YES
	CSS

 - pokretanje projekta
	ng serve --open

3. BACKEND

 - uvek ce biti dostupan prazan backend projekat koji je vec povezan sa potrebnim modulima
   ali ukoliko neko zeli da sam kod kuce sve poveze, potrebno je dovuci izvrsiti sledece komande
	npm install express
	npm install body-parser
	npm install cors
	npm install mongoose ili npm install mongodb (native driver)
	npm install typescript

 - pokretanje
	npm install typescript (ovo uraditi samo jednom, ako u prazan backend projekat nije dovucen typescript module)
	tsc (typescript compiler) //UVEK
	npm run serve		  //UVEK

4. BAZA
 - instalirati MongoDB
 - instalirati Robo3T


 5. Korisne instrukcije

		 ng gc imeKomponente - generisanje komponente

		 ng generate @angular/material:material-nav --name=main-nav - generisanje main-nava
		 
		 ng g s UserService - generisanje servisa
		 
		 ng generate @angular/material:material-table data-table(ovo je ime) - generisanje tabele
		 
		 npm i multer - instalira multer (za upload fajlova)



