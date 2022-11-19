var accounts = [
    {
		_id:1,
		webSite: "Epic Games",
		email: "rigiowarframe@outlook.es",
		user: "---",
		password: "^eJRkFR.$2&!94F",
		url: "https://www.epicgames.com/site/es-MX/home",
		category: "Gaming",
		favorite: false,
		note: "",
		date: "7/5/2022",
	},
    {
		_id:2,
		webSite: "Steam",
		email: "miguelvalle605@gmail.com",
		user: "D4rK4nG3L000",
		password: "miguelvalle",
		url: "https://store.steampowered.com/?l=spanish",
		category: "Gaming",
		favorite: true,
		note: "",
		date: "7/5/2022",
	},
    {
		_id:3,
		webSite: "Outlook",
		email: "MiGu3L_4nG3L@outlook.com",
		user: "---",
		password: "jryj@W%@xAYG",
		url: "https://outlook.live.com/owa/",
		category: "Email",
		favorite: false,
		note: "",
		date: "7/5/2022",
	},
    {
		_id:4,
		webSite: "Google",
		email: "miguelvalle605@gmail.com",
		user: "---",
		password: "U%IVk3%FZXDguU&wEf&#",
		url: "https://www.google.com/intl/es/gmail/about/",
		category: "Email",
		favorite: true,
		note: "",
		date: "7/5/2022",
	},
    {
		_id:5,
		webSite: "Github",
		email: "MiGu3L_4nG3L@outlook.com",
		user: "---",
		password: "7Z9e9kiAiHfvBRL",
		url: "https://www.github.com",
		category: "Programing",
		favorite: false,
		note: "Pass SSH: 4nG3L000",
		date: "7/5/2022",
	},
    {
		_id:6,
		webSite: "Campus Virtual UNAH",
		email: "miguel.valle@unah.hn",
		user: "---",
		password: "Pt@Hj{shb8",
		url: "https://campusvirtual.unah.edu.hn/login/index.php",
		category: "Study",
		favorite: true,
		note: "",
		date: "7/5/2022",
	},
    {
		_id:7,
		webSite: "Outlook",
		email: "rigiowarframe@outlook.es",
		user: "---",
		password: "CrspMS3ykhB3i8XlJ6Zt",
		url: "https://outlook.live.com/owa/",
		category: "Email",
		favorite: false,
		note: "",
		date: "7/5/2022",
	},
]


function accountDetails(accountId){
	let filtered = accounts.filter(account => account._id==accountId)

	document.querySelector('.account-info').innerHTML = ""
	document.querySelector('.account-info').insertAdjacentHTML('afterbegin',`	
	<div class="info-header">
        <div class="header-title">
          <img src="./assets/images/steam-icono.png" width="100" height="100">
          <h1>${ filtered[0].webSite }</h1>
        </div>
        <span class="category">${ filtered[0].category }</span>
      </div>
      <div class="info-body">
		<div>
			<label>Sitio Web:</label>
			<span class="right-data">
			<span>${ filtered[0].webSite }</span>
			<span class="material-icons">content_copy</span>
			</span>
		</div>
		<div>
			<label>Correo:</label>
			<span class="right-data">
			<span>${ filtered[0].email }</span>
			<span class="material-icons">content_copy</span>
			</span>
		</div>
		<div>
			<label>Usuario:</label>
			<span class="right-data">
			<span>${ filtered[0].user }</span>
			<span class="material-icons">content_copy</span>
			</span>
		</div>
		<div>
			<label>Contraseña:</label>
			<span class="right-data">
			<span>${ filtered[0].password }</span>
			<span class="material-icons">content_copy</span>
			</span>
		</div>
		<div>
			<label>Url:</label>
			<span class="right-data">
			<span>${ filtered[0].url }</span>
			<span class="material-icons">open_in_new</span>
			</span>
		</div>
		<div>
			<label>Nota Adicional:</label>
			<span class="right-data">
			<span>${ filtered[0].note }</span>
			<span class="material-icons">expand_more</span>
			</span>
		</div>
		</div>
      <div class="info-footer">
        <span>Agregada en: </span>
        <span>Actualizada en: </span>
      </div>
	`)
	navigateTo('information')
}

function listView(){
	document.querySelector('#accountsList').classList.remove('fadeIn')
	document.querySelector('#accountsList').classList.add('fadeOut')

	document.querySelector('#accountsList').innerHTML = ""
	document.querySelector('#accountsList').classList.remove('grid-view')
    accounts.forEach(account => {
        document.querySelector('#accountsList').insertAdjacentHTML('afterbegin',`
					<div class="list-card isotope-item ${ account.category } ">
						<div class="list-card-img">
							<img src="./assets/images/epic games-icono.png" alt="">
						</div>
						<div class="list-card-content">
							<div class="clickable-area" onclick="accountDetails('${ account._id }')">
								<div class="card-title text-truncate">${ account.webSite }</div>
								<div class="list-card-text">${ account.email }</div>
								<span class="list-card-code">${ account.date }</span>
								<span class="list-card-category">${ account.category }</span>
							</div>
							<div class="list-card-fav">
								<span class="material-icons list-card-star add-fav ${account.favorite?'favorite':''}">star</span>
							</div> 	
						</div>
					</div>
        `)
    });
    reloadIsotope()
	document.querySelector('#accountsList').classList.remove('fadeOut')
	document.querySelector('#accountsList').classList.add('fadeIn')
}

function gridView(){
	document.querySelector('#accountsList').classList.remove('fadeIn')
	document.querySelector('#accountsList').classList.add('fadeOut')
	
	document.querySelector('#accountsList').innerHTML = ""
	document.querySelector('#accountsList').classList.add('grid-view')
	
	accounts.forEach(account => {
		let email = account.email.split('@')
		document.querySelector('#accountsList').insertAdjacentHTML('afterbegin',`
				<div class="grid-card-container isotope-item ${ account.category } ${account.favorite?'Favorites':''}">
					<div class="grid-card">
						<span class="grid-card-fav">
							<span class="material-icons">edit_note</span>
							<span class="material-icons">delete</span>
							<span class="material-icons card-star add-fav ${account.favorite?'favorite':''}">star</span>
						</span>
						<div class="clickable-area" onclick="accountDetails('${ account._id }')">
							<div class="thumbnail">
								<a><img alt="" src="./assets/images/cover.jpg"></a>
							</div>
							<div class="title">
								<img class="logo" src="./assets/images/steam-icono.png">
								<h5 class="card-title text-truncate">${ account.webSite }</h5>
							</div>
							<div class="email">
								<p>${ email[0] }</p>
								<h4>@${ email[1] }</h4>
							</div>
							<div class="date">
								<span><span class="material-icons">
									calendar_month
									</span>${ account.date }</span>
								<span class="category">${ account.category }</span>
							</div>
							<div class="by">
								<span>Owner: Miguel Valle</span>
							</div>
						</div>
					</div>
				</div>
    	`)
	})
	reloadIsotope()
	document.querySelector('#accountsList').classList.remove('fadeOut')
	document.querySelector('#accountsList').classList.add('fadeIn')
}


gridView()