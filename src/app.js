const doc = {
    filterButton: null,
    operatorButton: null,
    titleInput: null,
    bodyInput: null,
    postdiv: null
};

const state = {
    url: [
        'https://jsonplaceholder.typicode.com/posts',
        'http://localhost:8000/posts'
    ][0],
    posts: [],
    filteredPosts: [],
    addOperation: true,
    editedPostId: null,
    filter: false,

};

window.addEventListener('load', () => {
    init();
});

function init() {
    doc.filterButton = document.querySelector('#filterButton'),
    doc.operatorButton = document.querySelector('#addButton'),
    doc.titleInput = document.querySelector('#title'),
    doc.bodyInput = document.querySelector('#body'),
    doc.postdiv = document.querySelector('#postdiv')

    getEmployees(state.url);
    doc.filterButton.addEventListener('click', () => {
        filterPost();
    });    
    doc.operatorButton.addEventListener('click', () => {
        if (state.addOperation) {
            addPost();
        }else {
            savePost();
        }        
    });    
}

function addPost() {
    const data = {
        title: doc.titleInput.value,
        body: doc.bodyInput.value
    };
    const result = addEmployee(state.url, data);
}

function savePost() {
    const data = {
        id: state.editedPostId,
        title: doc.titleInput.value,
        body: doc.bodyInput.value
    };
    const result = modifyEmployee(state.url, data);
}

function filterPost() {
    state.filteredPosts = state.posts.filter( post => {
        if (post.title.indexOf(doc.titleInput.value)>-1 &&
            post.body.indexOf(doc.bodyInput.value)>-1) {
            console.log('itt')
            return post;
        } 
    });
    setFilter();
    render();
}


function httpClient(method, url, data) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(JSON.stringify(data));
    return xhr;
}

function getEmployees(url) {
    let http = httpClient('get', url, null);
    http.addEventListener('load', () => {
        let posts = http.responseText;        
        state.posts = JSON.parse(posts);
        render();      
    })
}

function addEmployee(url, data) {
    let http = httpClient('post', url, data);
    http.addEventListener('load', () => {
        let result = http.responseText;        
        let resultJson = JSON.parse(result);
        console.log(resultJson);
        getEmployees(state.url);
        render();
        cleanInput();
    })
}

function deleteEmployee(id) {
    let exturl = state.url + '/' + id;
    let http = httpClient('delete', exturl)
    http.addEventListener('load', () => {
        let response = http.responseText;
        console.log(JSON.parse(response));
        getEmployees(state.url);
        render();
    });    
}

function modifyEmployee(url, data) {
    let exturl = state.url + '/' + data.id;
    let http = httpClient('put', exturl, data);
    http.addEventListener('load', () => {
        let response = http.responseText;
        console.log(JSON.parse(response));
        getEmployees(state.url);
        render();
        state.addOperation = true;
        state.editedPostId = null;
        doc.operatorButton.textContent = 'Add';
        cleanInput();
    });      
}

function startDeleteEmployee(event) {
    let id = event.getAttribute('data-id');
    console.log(id);
    deleteEmployee(id);
}

function startEditEmployee(event) {
    doc.titleInput.value = event.getAttribute('data-title');
    doc.bodyInput.value = event.getAttribute('data-body');
    state.addOperation = false;
    state.editedPostId = event.getAttribute('data-id');
    doc.operatorButton.textContent = 'Mentés'
}


function setFilter() {
    if (doc.titleInput.value == '' && doc.bodyInput.value == '') {
        console.log('nincs szűrés')
        state.filter = false;
    }else {
        console.log('szűrés van')
        state.filter = true;        
    }
}

function render() {
    doc.postdiv.innerHTML = '';
    let posts;
    if (state.filter) posts = state.filteredPosts;
    else posts = state.posts;

    var rows = '';
    posts.forEach(post => {
        rows += `
        <div class="row">
            <div class="col-2">${post.title}</div>
            <div class="col-6">${post.body}</div>
            <div class="col-4 buttonbox">
                <button data-id="${post.id}" 
                    onclick="startDeleteEmployee(this)" 
                    class="btn btn-primary mt-1">
                        Törlés
                </button>
                <button data-id="${post.id}" 
                    data-title="${post.title}" 
                    data-body="${post.body}"
                    onclick="startEditEmployee(this)" 
                    class="btn btn-primary mt-1">
                        Szerkesztés
                </button>
            </div>
        </div>
        `;
    
    });    
    doc.postdiv.innerHTML = rows;
}

function cleanInput() {
    doc.titleInput.value = '';
    doc.bodyInput.value = '';
}

