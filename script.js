let time = null

const gitFind = () => {

    clearTimeout(time)

    time = setTimeout(() => {
        const baseURL = "https://api.github.com";
        var value = document.querySelector(".form-control").value;
        var pageUsers = document.querySelector(".card");
        var pageRepos = document.querySelector(".repos");
        var pageError = document.querySelector(".error");

        fetch(`${baseURL}/users/${value}`)
        .then(response => response.json())
        .then(data => {

            if(data.message){
                pageError.innerHTML = ""

                pageError.innerHTML = '<h1 class="badge badge-pill badge-dark">Perfil não encontrado</h1>'
            }else{
                let { 
                    avatar_url, 
                    name, 
                    login, 
                    followers, 
                    following,
                    html_url } = data

                if(name === null){
                    name = "Nome de usúario não especificado"
                }

                const setpageUser = `<img src="${avatar_url}" class="card-img-top"/>
                                    <div class="card-body">
                                        <h1 class="card-title">${name}</h1>
                                        <h2 class="card-text">${login}</h2>
    
                                        <span class="badge badge-dark">Seguidores: ${followers}</span>
                                        <span class="badge badge-dark">Seguindo: ${following}</span>
                                        <a href="${html_url}" class="btn btn-secondary" target="_blank">Ir Para o Perfil</a>
                                    </div>`
    
                pageUsers.innerHTML = setpageUser     
            }
        });

        fetch(`${baseURL}/users/${value}/repos`)
        .then(response => response.json())
        .then(data => {

            pageRepos.innerHTML = ""

            data.forEach((v) => {
                let { 
                    language, 
                    name,
                    description,
                    html_url } = v

                if(description === null){
                    description = "Esse repositório não possui descrição"
                }
                
                if(language === null){
                    language = "LInguagem utilizado não especificada"
                }

                const setPageRepos = `  <div class="repo">
                                            <h3 class="mt-0">${name}</h3>
                                            <h4 class="mt-0">${language}</h4>
                                            <p>${description}</p>             
                                            <a class="btn btn-outline-dark" href="${html_url}" target="_blank">Ir Para o Repositório</a>
                                        </div>`
                                        
                pageRepos.innerHTML += setPageRepos
                
            })
        })

    }, 1000);
}